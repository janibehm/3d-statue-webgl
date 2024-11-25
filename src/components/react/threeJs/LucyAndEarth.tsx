import { useRef, useEffect, useMemo, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useProgress, Plane } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Sphere } from "./Sphere";

const MODEL_SCALE = 0.0027;

interface LucyModelProps {
  onLoad?: () => void;
}

const gltfLoader = new GLTFLoader();

export function LucyAndEarth({ onLoad }: LucyModelProps) {
  const { scene: model } = useGLTF("/models/Lucy.glb");
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>(null);
  const { progress } = useProgress();

  const setupModel = useMemo(() => {
    if (!model) return null;

    const modelInstance = model.clone();
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.position.set(1.5, 1, 0);

    modelInstance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.frustumCulled = true;
        child.castShadow = true;
        if (child.material) {
          child.material.transparent = false;
          child.material.depthWrite = true;
          child.material.needsUpdate = true;
          child.material.color = new THREE.Color("#c0c0c0");
          child.material.roughness = 0.3;
          child.material.metalness = 0.1;
        }
      }
    });

    return modelInstance;
  }, [model]);

  useEffect(() => {
    if (!setupModel || progress !== 100) return;

    gl.compile(setupModel, camera);
    scene.add(setupModel);

    onLoad?.();

    // Fade in animation
    const duration = 5000;
    const startTime = performance.now();

    const fadeIn = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setupModel.visible = true;
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
      scene.remove(setupModel);
      setupModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    };
  }, [setupModel, scene, gl, camera, progress, onLoad]);

  useEffect(() => {
    if (!model) return;

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Remove duplicate color attribute if it exists
        if (child.geometry.attributes.color && child.geometry.attributes.color_1) {
          console.log("Found duplicate color attributes, removing color_1");
          delete child.geometry.attributes.color_1;
        }

        console.log("Geometry attributes:", child.geometry.attributes);
      }
    });
  }, [model]);

  return (
    <>
      <Sphere />
      {/*   <Plane receiveShadow args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <meshStandardMaterial color="#808080" />
      </Plane> */}
    </>
  );
}
