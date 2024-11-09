import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easeOutCubic } from "./hooks/easeOutCubix";
import * as THREE from "three";

const ANIMATION = {
  duration: 2,
  fadeInDuration: 0.5,
  delay: 100,
  position: {
    start: { y: -20, z: -30 },
    end: { y: -3.8, z: 0 },
  },
};

export function Sphere() {
  const { gl } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const animationRef = useRef({
    startTime: 0,
    isAnimating: true,
    opacity: 0,
  });

  const [texturesLoaded, setTexturesLoaded] = useState({
    albedo: false,
    normal: false,
  });
  const [isVisible, setIsVisible] = useState(false);

  // Create materials and textures once
  const { material, textures } = useMemo(() => {
    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0,
    });

    const textures = {
      albedo: textureLoader.load("/textures/painted-worn-asphalt_albedo.jpg", (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        setTexturesLoaded((prev) => ({ ...prev, albedo: true }));
      }),
      normal: textureLoader.load("/textures/painted-worn-asphalt_normal-ogl.jpg", (texture) => {
        setTexturesLoaded((prev) => ({ ...prev, normal: true }));
      }),
    };

    material.map = textures.albedo;
    material.normalMap = textures.normal;

    return { material, textures };
  }, []);

  // Start animation when textures are loaded
  useEffect(() => {
    if (!meshRef.current || !texturesLoaded.albedo || !texturesLoaded.normal) return;

    meshRef.current.position.set(0, ANIMATION.position.start.y, ANIMATION.position.start.z);

    // Pre-compile materials
    const dummyCamera = new THREE.PerspectiveCamera();
    gl.compile(meshRef.current, dummyCamera);

    setTimeout(() => {
      setIsVisible(true);
      animationRef.current.startTime = performance.now();
    }, ANIMATION.delay);

    return () => {
      material.dispose();
      textures.albedo.dispose();
      textures.normal.dispose();
    };
  }, [texturesLoaded, gl, material, textures]);

  useFrame(() => {
    if (!meshRef.current || !isVisible || !animationRef.current.isAnimating) return;

    const elapsed = (performance.now() - animationRef.current.startTime) / 1000;

    // Position animation
    const positionT = Math.min(elapsed / ANIMATION.duration, 1);
    const eased = easeOutCubic(positionT);

    meshRef.current.position.y = THREE.MathUtils.lerp(
      ANIMATION.position.start.y,
      ANIMATION.position.end.y,
      eased,
    );
    meshRef.current.position.z = THREE.MathUtils.lerp(
      ANIMATION.position.start.z,
      ANIMATION.position.end.z,
      eased,
    );

    // Fade in animation
    const fadeT = Math.min(elapsed / ANIMATION.fadeInDuration, 1);
    material.opacity = fadeT;

    if (positionT === 1) {
      animationRef.current.isAnimating = false;
      material.transparent = false;
    }
  });

  // Geometry with optimized settings
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(3, 20, 20);
    geo.computeBoundingSphere();
    geo.computeBoundingBox();
    return geo;
  }, []);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, ANIMATION.position.start.y, ANIMATION.position.start.z]}
      visible={isVisible}
      frustumCulled={true}
    />
  );
}
