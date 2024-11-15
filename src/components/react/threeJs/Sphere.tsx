import { useRef, useEffect } from "react";
import { useThree, useFrame, Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useSpring } from "@react-spring/three";
import * as THREE from "three";
import { sharedAnimation } from "./constants/animations";

const MODEL_PATH = "/models/earth.glb";
const MODEL_SCALE = 4;
const MATERIAL_SETTINGS = {
  metalness: 0.2,
  roughness: 0.5,
} as const;

// Preload the model
useGLTF.preload(MODEL_PATH);

export function Sphere() {
  const { scene: model } = useGLTF(MODEL_PATH);
  const { scene } = useThree();
  const modelRef = useRef<THREE.Group>();

  const [springs, api] = useSpring(() => ({
    position: [0, sharedAnimation.position.start.y, sharedAnimation.position.start.z],
    opacity: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 120,
    },
    delay: sharedAnimation.delay,
  }));

  useEffect(() => {
    if (!model) return;

    const modelInstance = model.clone();
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.position.set(
      0,
      sharedAnimation.position.start.y,
      sharedAnimation.position.start.z,
    );

    modelRef.current = modelInstance;
    scene.add(modelInstance);

    // Match Lucy's animation pattern
    api.start({
      position: [0, -4.8, sharedAnimation.position.end.z],
      opacity: 1,
      config: {
        duration: sharedAnimation.duration * 1000,
      },
    });

    return () => {
      scene.remove(modelInstance);
    };
  }, [model, scene, api]);

  useFrame(() => {
    if (!modelRef.current) return;
    const position = springs.position.get();
    modelRef.current.position.set(position[0], position[1], position[2]);
  });

  return null;
}
