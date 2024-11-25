import { useRef, useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useProgress, Points, GradientTexture } from "@react-three/drei";

const generatePoints = (count: number) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 30; // x: -15 to 15
    positions[i + 1] = Math.random() - 0.5; // y: -0.5 to 0.5
    positions[i + 2] = (Math.random() - 0.5) * 30; // z: -15 to 15
  }
  return positions;
};

const MODEL_SCALE = 0.0035;

export function LucyAndEarth({ onLoad }: { onLoad?: () => void }) {
  const { scene: model } = useGLTF("/models/Lucy.glb");
  const { scene, gl, camera } = useThree();
  const { progress } = useProgress();

  const points = useMemo(() => generatePoints(1000), []);

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

  const circleGeometry = useMemo(() => new THREE.CircleGeometry(15, 64), []);

  return (
    <>
      <hemisphereLight
        intensity={0.2}
        groundColor="#7c4dff"
        color="#4fc3f7"
        position={[0, 20, 0]}
      />
      <hemisphereLight
        intensity={0.1}
        groundColor="#e040fb"
        color="#2196f3"
        position={[0, -20, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]} geometry={circleGeometry}>
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
      </mesh>
      <Points positions={points}>
        <pointsMaterial
          size={0.05}
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
          color="#00bcd4"
        />
      </Points>
    </>
  );
}
