import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { globalAnimationState } from "./hooks/globalAnimationState";
import { easeOutCubic } from "./hooks/easeOutCubix";

function useAnimationTime() {
  return useRef({ startTime: performance.now(), isAnimating: true });
}

useGLTF.preload("/models/Lucy-transformed.glb");

export function LucyModel() {
  const { scene: model } = useGLTF("/models/Lucy-transformed.glb", true);
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>();
  const timeRef = useAnimationTime();
  const [isModelReady, setIsModelReady] = useState(false);
  const hasStartedAnimation = useRef(false);

  // Position constants
  const startY = 5;
  const endY = -0.5;
  const startZ = -30;
  const endZ = 0;

  useFrame(() => {
    if (
      !modelRef.current ||
      !timeRef.current.isAnimating ||
      !isModelReady ||
      !hasStartedAnimation.current
    )
      return;

    const elapsed = (performance.now() - timeRef.current.startTime) / 1000;
    const duration = 2;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(t);

    modelRef.current.position.y = startY + (endY - startY) * eased;
    modelRef.current.position.z = startZ + (endZ - startZ) * eased;

    if (t === 1) {
      timeRef.current.isAnimating = false;
      globalAnimationState.isLucyInPosition = true;
    }
  });

  useEffect(() => {
    if (!model || hasStartedAnimation.current) return;

    const modelInstance = model.clone();
    modelInstance.visible = false;
    modelInstance.scale.set(0.0024, 0.0024, 0.0024);
    modelInstance.rotation.x = Math.PI / 2;
    modelInstance.position.set(0, startY, startZ);

    // Optimize material settings
    modelInstance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        /*  child.castShadow = true; */
        /*  child.receiveShadow = true; */
        child.material.metalness = 0.2;
        child.material.roughness = 0.5;
        // Optimize geometry if needed
        if (child.geometry) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();
        }
      }
    });

    // Pre-compile for better initial performance
    gl.compile(modelInstance, camera);

    modelRef.current = modelInstance;
    scene.add(modelInstance);

    // Add delay before starting Lucy's animation
    requestAnimationFrame(() => {
      if (modelRef.current) {
        modelRef.current.visible = true;
        hasStartedAnimation.current = true;
        timeRef.current.startTime = performance.now();
        setIsModelReady(true);
      }
    });

    return () => {
      scene.remove(modelInstance);
    };
  }, [model, scene, gl, camera]);

  return null;
}
