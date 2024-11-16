import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useProgress } from "@react-three/drei";
import { globalAnimationState, sharedAnimation } from "./constants/animations";
import { useSpring } from "@react-spring/three";

const MODEL_SCALE = 0.0024;

// Preload with low priority and draco compression
useGLTF.preload("/models/Lucy.glb", true);

export function LucyModel() {
  const { scene: model } = useGLTF("/models/Lucy.glb", true);
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>();
  const { progress } = useProgress();

  // Memoize initial spring position
  const initialPosition = useMemo(
    () => [0, sharedAnimation.position.start.y + 3.8, sharedAnimation.position.start.z],
    [],
  );

  // Setup renderer once
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.shadowMap.enabled = false;
  }, [gl]);

  const [springs, api] = useSpring(() => ({
    position: initialPosition,
    config: {
      mass: 1,
      tension: 280,
      friction: 120,
    },
    delay: sharedAnimation.delay,
    onChange: () => {
      const currentY = springs.position.get()[1];
      if (Math.abs(currentY - -0.5) < 0.01) {
        globalAnimationState.setIsLucyInPosition(true);
      }
    },
  }));

  // Optimize model setup
  const setupModel = useMemo(() => {
    if (!model) return null;

    const modelInstance = model.clone();
    modelInstance.visible = true;
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.rotation.x = Math.PI / 2;
    modelInstance.position.set(
      0,
      sharedAnimation.position.start.y,
      sharedAnimation.position.start.z,
    );

    // Only essential traversal
    modelInstance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.frustumCulled = true;
      }
    });

    return modelInstance;
  }, [model]);

  useEffect(() => {
    if (progress === 100 && model) {
      globalAnimationState.isLucyReady = true;
    }
  }, [progress, model]);

  useEffect(() => {
    if (!setupModel) return;

    // Compile scene before adding
    gl.compile(setupModel, camera);
    modelRef.current = setupModel;
    scene.add(setupModel);
    globalAnimationState.isLucyMounted = true;

    return () => {
      globalAnimationState.isLucyMounted = false;
      scene.remove(setupModel);
      // Clean up geometries and materials
      setupModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    };
  }, [setupModel, scene, gl, camera]);

  // Optimized animation frame
  useFrame(() => {
    if (!modelRef.current) return;
    const [x, y, z] = springs.position.get();
    modelRef.current.position.set(x, y, z);
  });

  useEffect(() => {
    api.start({
      position: [0, -0.5, sharedAnimation.position.end.z],
      config: { duration: sharedAnimation.duration * 1000 },
    });
  }, [api]);

  return null;
}
