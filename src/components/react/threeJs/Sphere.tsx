import { useRef, useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import { sharedAnimation } from "./constants/animations";

export function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Load textures using drei's useTexture hook
  const [albedoMap, normalMap] = useTexture([
    "/textures/painted-worn-asphalt_albedo.jpg",
    "/textures/painted-worn-asphalt_normal-ogl.jpg",
  ]);

  // Configure textures
  useEffect(() => {
    albedoMap.colorSpace = THREE.SRGBColorSpace;
    [albedoMap, normalMap].forEach((texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
    });
  }, [albedoMap, normalMap]);

  // Memoize geometry
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(3, 25, 25);
    geo.computeBoundingSphere();
    geo.computeBoundingBox();
    return geo;
  }, []);

  // Use spring for smooth animations
  const [springs, api] = useSpring(() => ({
    position: [0, sharedAnimation.position.start.y, sharedAnimation.position.start.z],
    opacity: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 120,
    },
    delay: sharedAnimation.delay + 500,
  }));

  // Start animation after textures are loaded
  useEffect(() => {
    api.start({
      position: [0, sharedAnimation.position.end.y, sharedAnimation.position.end.z],
      opacity: 1,
      config: {
        duration: sharedAnimation.duration * 1000,
      },
    });
  }, [api]);

  return (
    <animated.mesh
      ref={meshRef}
      geometry={geometry}
      position={springs.position as unknown as [number, number, number]}
      frustumCulled={true}
    >
      <animated.meshLambertMaterial
        transparent
        opacity={springs.opacity}
        map={albedoMap}
        normalMap={normalMap}
      />
    </animated.mesh>
  );
}
