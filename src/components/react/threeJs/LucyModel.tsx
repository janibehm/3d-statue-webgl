import { useRef, useEffect, useMemo, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useProgress } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const MODEL_SCALE = 0.0024;

interface LucyModelProps {
  onLoad?: () => void;
}

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
dracoLoader.setDecoderConfig({ type: "js" });

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

export function LucyModel({ onLoad }: LucyModelProps) {
  const [model, setModel] = useState<THREE.Group>();
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>();
  const { progress } = useProgress();

  useEffect(() => {
    gltfLoader.load(
      "/models/Lucy.glb",
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
    modelInstance.visible = false;
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

    onLoad?.();

    // Fade in animation
    const duration = 2000;
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

  /*  useEffect(() => {
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
  }, [model]); */

  return null;
}
