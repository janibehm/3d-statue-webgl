import { useRef, useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useProgress } from "@react-three/drei";
import gsap from "gsap";

const MODEL_SCALE = 2.05;

// Preload with low priority and draco compression
useGLTF.preload("/models/earth_angel.glb", true);

interface LucyModelProps {
  onLoad?: () => void;
}

export function LucyAndEarth({ onLoad }: LucyModelProps) {
  const { scene: model } = useGLTF("/models/earth_angel.glb", true);
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>();
  const { progress } = useProgress();

  const setupModel = useMemo(() => {
    if (!model) return null;

    const modelInstance = model.clone();
    modelInstance.visible = false;
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.position.set(1.5, 1, 0);
    /*    modelInstance.rotation.x = Math.PI / 2; */

    modelInstance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.frustumCulled = true;
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = 0;
          child.material.depthWrite = true;
          child.material.needsUpdate = true;
        }
      }
    });

    return modelInstance;
  }, [model]);

  useEffect(() => {
    if (!setupModel || progress !== 100) return;

    gl.compile(setupModel, camera);
    modelRef.current = setupModel;
    scene.add(setupModel);

    onLoad?.();

    // Optimized fade in using GSAP or simple opacity setting
    setupModel.visible = true;
    const materials: THREE.Material[] = [];

    // Collect materials once
    setupModel.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        materials.push(child.material);
        child.material.opacity = 0;
      }
    });

    // Single animation for all materials
    const duration = 2;
    gsap.to(materials, {
      opacity: 1,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        materials.forEach((material) => (material.needsUpdate = true));
      },
    });

    return () => {
      scene.remove(setupModel);
      setupModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    };
  }, [setupModel, scene, gl, camera, progress, onLoad]);

  return null;
}
