import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { globalAnimationState, sharedAnimation } from "./constants/animations";
import { useSpring } from "@react-spring/three";

const MODEL_SCALE = 0.0024;
const MATERIAL_SETTINGS = {
  metalness: 0.2,
  roughness: 0.5,
} as const;

useGLTF.preload("/models/Lucy.glb");

export function LucyModel() {
  const { scene: model } = useGLTF("/models/Lucy.glb", true);
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>();

  const [springs, api] = useSpring(() => ({
    position: [0, sharedAnimation.position.start.y + 3.8, sharedAnimation.position.start.z],
    opacity: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 120,
    },
    delay: sharedAnimation.delay,
    onChange: () => {
      if (springs.position.get()[1] === sharedAnimation.position.end.y + 3.8) {
        globalAnimationState.isLucyInPosition = true;
      }
    },
  }));

  useEffect(() => {
    if (!model) return;

    const modelInstance = model.clone();
    modelInstance.visible = true;
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.rotation.x = Math.PI / 2;
    modelInstance.position.set(
      0,
      sharedAnimation.position.start.y,
      sharedAnimation.position.start.z,
    );

    modelInstance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = child.material.clone();
        Object.assign(child.material, MATERIAL_SETTINGS);
        child.frustumCulled = true;

        if (child.geometry && !child.geometry.boundingSphere) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();
        }
      }
    });

    gl.compile(modelInstance, camera);
    modelRef.current = modelInstance;
    scene.add(modelInstance);

    return () => {
      scene.remove(modelInstance);
      modelInstance.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.dispose();
          child.geometry.dispose();
        }
      });
    };
  }, [model, scene, gl, camera]);

  useFrame(() => {
    if (!modelRef.current) return;
    const position = springs.position.get();
    modelRef.current.position.set(position[0], position[1], position[2]);
  });

  useEffect(() => {
    api.start({
      position: [0, sharedAnimation.position.end.y + 3.3, sharedAnimation.position.end.z],
      opacity: 1,
      config: {
        duration: sharedAnimation.duration * 1000,
      },
    });
  }, [api]);

  return null;
}
