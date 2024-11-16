import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useProgress } from "@react-three/drei";
import { globalAnimationState, sharedAnimation } from "./constants/animations";

const MODEL_SCALE = 0.0024;

// Preload with low priority and draco compression
useGLTF.preload("/models/Lucy.glb", true);

export function LucyModel() {
  const { scene: model } = useGLTF("/models/Lucy.glb", true);
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>();
  const { progress } = useProgress();

  const setupModel = useMemo(() => {
    if (!model) return null;

    const modelInstance = model.clone();
    modelInstance.visible = true;
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.rotation.x = Math.PI / 2;
    modelInstance.position.set(0, -0.5, 0);

    modelInstance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.frustumCulled = true;
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = 0;
        }
      }
    });

    return modelInstance;
  }, [model]);

  useEffect(() => {
    if (setupModel) {
      console.log("Lucy position:", setupModel.position);
      console.log("Lucy visible:", setupModel.visible);
    }
  }, [setupModel]);

  useEffect(() => {
    if (!setupModel || progress !== 100) return;

    gl.compile(setupModel, camera);
    modelRef.current = setupModel;
    scene.add(setupModel);
    globalAnimationState.isLucyMounted = true;

    // Fade in animation
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const fadeIn = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setupModel.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          child.material.opacity = progress;
        }
      });

      if (progress < 1) {
        requestAnimationFrame(fadeIn);
      }
    };

    requestAnimationFrame(fadeIn);

    return () => {
      globalAnimationState.isLucyMounted = false;
      scene.remove(setupModel);
      setupModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    };
  }, [setupModel, scene, gl, camera, progress]);

  return null;
}
