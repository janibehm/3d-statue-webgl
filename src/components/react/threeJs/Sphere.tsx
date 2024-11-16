import { useRef, useEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useSpring } from "@react-spring/three";
import { Group } from "three";
import { sharedAnimation } from "./constants/animations";

const MODEL_PATH = "/models/earth.glb";
const MODEL_SCALE = 4;

// Preload with low priority
useGLTF.preload(MODEL_PATH, true);

export function Sphere() {
  const { scene: model } = useGLTF(MODEL_PATH, true); // Add true for low priority loading
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<Group>(new Group()); // Initialize ref directly

  // Memoize initial position
  const initialPosition = useMemo(
    () => [0, sharedAnimation.position.start.y, sharedAnimation.position.start.z] as const,
    [],
  );

  const [springs, api] = useSpring(() => ({
    position: initialPosition,
    config: { mass: 1, tension: 280, friction: 120 },
    delay: sharedAnimation.delay,
  })) as any;

  // Optimize model setup
  const setupModel = useMemo(() => {
    if (!model) return null;

    const modelInstance = model.clone();
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.position.set(...initialPosition);

    // Pre-compile the model
    gl.compile(modelInstance, camera);

    return modelInstance;
  }, [model, gl, camera, initialPosition]);

  useEffect(() => {
    if (!setupModel) return;

    modelRef.current = setupModel;
    scene.add(setupModel);

    api.start({
      position: [0, -4.8, sharedAnimation.position.end.z] as const,
      config: { duration: sharedAnimation.duration * 1000 },
    });

    return () => {
      scene.remove(setupModel);
      // Clean up resources
      setupModel.traverse((child: any) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    };
  }, [setupModel, scene, api]);

  // Optimized frame update
  useFrame(() => {
    const [x, y, z] = springs.position.get();
    modelRef.current.position.set(x, y, z);
  });

  return null;
}
