import { useRef, useEffect, useMemo, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useProgress, Plane, Points, GradientTexture } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Sphere } from "./Sphere";

function generateRandomPoints(
  count: number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  zMin: number,
  zMax: number,
): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = Math.random() * (xMax - xMin) + xMin; // x
    positions[i * 3 + 1] = Math.random() * (yMax - yMin) + yMin; // y
    positions[i * 3 + 2] = Math.random() * (zMax - zMin) + zMin; // z
  }
  return positions;
}

const MODEL_SCALE = 0.0027;

interface LucyModelProps {
  onLoad?: () => void;
}

export function LucyAndEarth({ onLoad }: LucyModelProps) {
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
      <Plane args={[30, 30]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <meshStandardMaterial
          transparent
          opacity={0.8}
          roughness={0.3}
          metalness={0.4}
          emissiveIntensity={1}
        >
          <GradientTexture
            attach="map"
            stops={[0, 0.3, 0.7, 1]}
            colors={["#4fc3f7", "#7c4dff", "#e040fb", "#2196f3"]}
          />
        </meshStandardMaterial>
      </Plane>
      <Points positions={generateRandomPoints(2000, -15, 15, -0.5, 0.5, -15, 15)}>
        <pointsMaterial
          size={0.03}
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
          color="#00bcd4"
        />
      </Points>
      {/*   <mesh position={[0, -12, 0]} receiveShadow>
        <sphereGeometry args={[12, 32, 32]} />
        <meshStandardMaterial color="#1a237e" emissive="#303f9f" roughness={0.4} metalness={0.8} />
      </mesh> */}
    </>
  );
}
