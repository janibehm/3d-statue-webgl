import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { easeOutCubic } from "./hooks/easeOutCubix";
import { useAnimationTime } from "./hooks/useAnimationTime";
import { Mesh, Texture, CompressedTexture, TextureLoader, MeshStandardMaterial } from "three";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { useThree } from "@react-three/fiber";

export function Sphere() {
  const { gl } = useThree();
  const meshRef = useRef<Mesh>(null);
  const timeRef = useAnimationTime();
  const hasStartedAnimation = useRef(false);

  const [texture, setTexture] = useState<CompressedTexture | Texture | null>(null);
  const [normalMapLoaded, setNormalMapLoaded] = useState(false);
  const [albedoLoaded, setAlbedoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);

  // Match Lucy's position constants
  const startY = -20;
  const endY = -3.8;
  const startZ = -30;
  const endZ = 0;

  // Preload textures
  useEffect(() => {
    // Create loaders outside of load calls to reuse them
    const textureLoader = new TextureLoader();

    // Load regular PNG/JPEG instead of KTX2 for better initial performance
    textureLoader.load("/textures/painted-worn-asphalt_albedo.jpg", (jpegTexture) => {
      setTexture(jpegTexture);
      setAlbedoLoaded(true);
    });

    textureLoader.load("/textures/painted-worn-asphalt_normal-ogl.jpg", (jpegNormalTexture) => {
      if (meshRef.current && meshRef.current.material instanceof MeshStandardMaterial) {
        meshRef.current.material.normalMap = jpegNormalTexture;
        meshRef.current.material.needsUpdate = true;
        setNormalMapLoaded(true);
      }
    });
  }, [gl]);

  // Start animation only when everything is loaded
  useEffect(() => {
    if (hasStartedAnimation.current) return;
    if (!normalMapLoaded || !albedoLoaded) return;

    if (meshRef.current) {
      meshRef.current.position.set(0, startY, startZ);
      hasStartedAnimation.current = true;
      timeRef.current.startTime = performance.now();
      setIsModelReady(true);
      setIsVisible(true);
    }
  }, [normalMapLoaded, albedoLoaded]);

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

  return (
    <mesh ref={meshRef} position={[0, startY, startZ]} castShadow visible={isVisible}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial map={texture} displacementScale={0} roughness={0.8} metalness={0.2} />
    </mesh>
  );
}
