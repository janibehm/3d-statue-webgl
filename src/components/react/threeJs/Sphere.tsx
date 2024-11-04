import { useRef, useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { easeOutCubic } from "./hooks/easeOutCubix";
import { useAnimationTime } from "./hooks/useAnimationTime";
import { Mesh } from "three";
import { TextureLoader } from "three";

// Preload texture
const textureLoader = new TextureLoader();
textureLoader.load("/textures/painted-worn-asphalt_albedo.png");

export function Sphere() {
  const meshRef = useRef<Mesh>(null);
  const timeRef = useAnimationTime();
  const [isModelReady, setIsModelReady] = useState(false);
  const hasStartedAnimation = useRef(false);

  // Match Lucy's position constants
  const startY = -20;
  const endY = -3.8;
  const startZ = -30;
  const endZ = 0;

  const [albedoTexture, normalTexture, heightTexture] = useLoader(TextureLoader, [
    "/textures/painted-worn-asphalt_albedo.png",
    // '/textures/rough-igneous-rock-normal-ogl.png',
    // '/textures/rough-igneous-rock-height.png'
  ]);

  useFrame(() => {
    if (
      !meshRef.current ||
      !timeRef.current.isAnimating ||
      !isModelReady ||
      !hasStartedAnimation.current
    )
      return;

    const elapsed = (performance.now() - timeRef.current.startTime) / 1000;
    const duration = 2;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(t);

    meshRef.current.position.y = startY + (endY - startY) * eased;
    meshRef.current.position.z = startZ + (endZ - startZ) * eased;

    if (t === 1) {
      timeRef.current.isAnimating = false;
    }
  });

  useEffect(() => {
    if (hasStartedAnimation.current) return;

    if (meshRef.current) {
      meshRef.current.position.set(0, startY, startZ);
      hasStartedAnimation.current = true;
      timeRef.current.startTime = performance.now();
      setIsModelReady(true);
    }
  }, []);

  return (
    <mesh ref={meshRef} position={[0, startY, startZ]} castShadow>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial
        map={albedoTexture}
        normalMap={normalTexture}
        displacementMap={heightTexture}
        displacementScale={0}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}
