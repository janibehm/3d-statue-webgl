import { useRef, useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

const ANIMATION = {
  duration: 3,
  fadeInDuration: 1.5,
  delay: 1500,
  position: {
    start: { y: -5, z: 0 },
    end: { y: -3.8, z: 0 },
  },
} as const;

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
    position: [0, ANIMATION.position.start.y, ANIMATION.position.start.z],
    opacity: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 120,
    },
    delay: ANIMATION.delay,
  }));

  // Start animation after textures are loaded
  useEffect(() => {
    api.start({
      position: [0, ANIMATION.position.end.y, ANIMATION.position.start.z],
      opacity: 1,
      config: {
        duration: ANIMATION.duration * 1000,
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
