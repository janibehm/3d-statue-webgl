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

export function LucyModel({ onLoad }: LucyModelProps) {
  const { scene: model } = useGLTF("/models/Lucy.glb");
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>(null);
  const { progress } = useProgress();

  const setupModel = useMemo(() => {
    if (!model) return null;

    const modelInstance = model.clone();
    modelInstance.visible = true;
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.rotation.x = Math.PI / 2;
    modelInstance.position.set(0, -0.15, 3);

    modelInstance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.frustumCulled = true;
        child.castShadow = true;
        if (child.material) {
          child.material.transparent = false;
          child.material.opacity = 1;
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
      {/*  <Sphere /> */}
      {/*      <Plane args={[30, 30]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <meshStandardMaterial
          color="#1a237e"
          emissive="#303f9f"
          roughness={0.5}
          metalness={0.3}
          transparent
          opacity={0.8}
        />
      </Plane> */}
      <mesh position={[0, -12, 0]}>
        <sphereGeometry args={[12, 32, 32]} />
        <meshStandardMaterial color="#1a237e" emissive="#303f9f" roughness={0.4} metalness={0.8} />
      </mesh>
    </>
  );
}
