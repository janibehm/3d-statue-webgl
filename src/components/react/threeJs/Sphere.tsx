import * as THREE from "three";
import { useRef, useEffect, useMemo, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Mesh, Material } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { sharedAnimation } from "./constants/animations";

const MODEL_PATH = "/models/earth_extra_comp.glb";
const MODEL_SCALE = 4;
const SPAWN_POSITION = [0, -4.8, 0] as const;
const FADE_DURATION = 2000;

// Configure Draco
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

// Configure GLTF to use Draco
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// Preload with the configured loader
useGLTF.preload(MODEL_PATH);

export function Sphere() {
  const [model, setModel] = useState<THREE.Group>();
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>();

  useEffect(() => {
    gltfLoader.load(
      MODEL_PATH,
      (gltf) => {
        setModel(gltf.scene);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      },
    );
  }, []);

  const setupModel = useMemo(() => {
    if (!model) return null;

    const modelInstance = model.clone();
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.position.set(...SPAWN_POSITION);
    modelInstance.visible = false;

    modelInstance.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        const material = child.material as Material;
        material.transparent = true;
        material.opacity = 0;
      }
    });

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
    }, sharedAnimation.delay);

    return () => {
      scene.remove(setupModel);
      setupModel.traverse((child: any) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    };
  }, [setupModel, scene]);

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

  return null;
}
