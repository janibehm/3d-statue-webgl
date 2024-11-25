import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Mesh, Material } from "three";

const MODEL_PATH = "/models/earth_extra_comp.glb";
const MODEL_SCALE = 6;
const SPAWN_POSITION = [0, -6.8, 0] as const;
const FADE_DURATION = 2000;
const ANIMATION_DELAY = 0;

export function Sphere() {
  const { scene: gltfScene } = useGLTF(MODEL_PATH);
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>();

  const setupModel = useMemo(() => {
    if (!gltfScene) return null;

    const modelInstance = gltfScene.clone();
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.position.set(...SPAWN_POSITION);
    modelInstance.visible = false;

    modelInstance.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        const material = child.material as Material;
        material.transparent = true;
        material.opacity = 0;
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });

    gl.compile(modelInstance, camera);

    return modelInstance;
  }, [gltfScene, gl, camera]);

  useEffect(() => {
    if (!setupModel) return;

    modelRef.current = setupModel;
    scene.add(setupModel);

    setTimeout(() => {
      setupModel.visible = true;

      const startTime = performance.now();

      const fadeIn = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / FADE_DURATION, 1);

        setupModel.traverse((child) => {
          if (child instanceof Mesh && child.material) {
            child.material.opacity = progress;
          }
        });

        if (progress < 1) {
          requestAnimationFrame(fadeIn);
        }
      };

      requestAnimationFrame(fadeIn);
    }, ANIMATION_DELAY);

    return () => {
      scene.remove(setupModel);
      setupModel.traverse((child: any) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    };
  }, [setupModel, scene]);

  useEffect(() => {
    if (!gltfScene) return;

    gltfScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Remove duplicate color attribute if it exists
        if (child.geometry.attributes.color && child.geometry.attributes.color_1) {
          console.log("Found duplicate color attributes, removing color_1");
          delete child.geometry.attributes.color_1;
        }

        console.log("Geometry attributes:", child.geometry.attributes);
      }
    });
  }, [gltfScene]);

  return null;
}
