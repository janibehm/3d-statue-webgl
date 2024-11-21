import { useRef, useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Mesh, Material } from "three";

const MODEL_PATH = "/models/earth.glb";
const MODEL_SCALE = 4;
const SPAWN_POSITION = [0, -4.8, 0] as const;
const FADE_DURATION = 5000;

useGLTF.preload(MODEL_PATH);

export function Sphere() {
  const { scene: model } = useGLTF(MODEL_PATH, true);
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<Group>(new Group());
  const materialsRef = useRef<Material[]>([]);

  const setupModel = useMemo(() => {
    if (!model) return null;

    const modelInstance = model.clone();
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.position.set(...SPAWN_POSITION);
    modelInstance.visible = false;

    const materials: Material[] = [];
    modelInstance.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        const material = child.material as Material;
        material.transparent = true;
        material.opacity = 0;
        materials.push(material);
      }
    });
    materialsRef.current = materials;

    gl.compile(modelInstance, camera);
    return modelInstance;
  }, [model, gl, camera]);

  useEffect(() => {
    if (!setupModel) return;

    modelRef.current = setupModel;
    scene.add(setupModel);

    setTimeout(() => {
      setupModel.visible = true;
      const startTime = performance.now();
      const materials = materialsRef.current;

      const fadeIn = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / FADE_DURATION, 1);

        materials.forEach(material => {
          material.opacity = progress;
        });

        if (progress < 1) {
          requestAnimationFrame(fadeIn);
        }
      };

      requestAnimationFrame(fadeIn);
    }, FADE_DURATION);

    return () => {
      scene.remove(setupModel);
      materialsRef.current.forEach(material => material.dispose());
      setupModel.traverse((child: any) => {
        if (child.geometry) child.geometry.dispose();
      });
    };
  }, [setupModel, scene]);

  return null;
}
