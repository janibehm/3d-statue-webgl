import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easeOutCubic } from "./hooks/easeOutCubix";
import * as THREE from "three";

// Move constants outside component
const ANIMATION = {
  duration: 3.5,
  fadeInDuration: 2.5,
  delay: 300,
  position: {
    start: { y: -10, z: 0 },
    end: { y: -3.8, z: 0 },
  },
} as const;

// Pre-create TextureLoader
const textureLoader = new THREE.TextureLoader();

export function Sphere() {
  const { gl } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const animationState = useRef({
    startTime: 0,
    isAnimating: true,
    isVisible: false,
    texturesLoaded: 0,
  });

  // Memoize material and geometry
  const [material, geometry] = useMemo(() => {
    const mat = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0,
    });

    const geo = new THREE.SphereGeometry(3, 25, 25);
    geo.computeBoundingSphere();
    geo.computeBoundingBox();

    return [mat, geo];
  }, []);

  // Combine texture loading into one effect
  useEffect(() => {
    const loadTexture = (url: string, callback: (texture: THREE.Texture) => void) => {
      textureLoader.load(url, (texture) => {
        callback(texture);
        animationState.current.texturesLoaded++;

        // Start animation when both textures are loaded
        if (animationState.current.texturesLoaded === 2 && meshRef.current) {
          meshRef.current.position.set(0, ANIMATION.position.start.y, ANIMATION.position.start.z);
          const dummyCamera = new THREE.PerspectiveCamera();
          gl.compile(meshRef.current, dummyCamera);

          setTimeout(() => {
            animationState.current.isVisible = true;
            animationState.current.startTime = performance.now();
          }, ANIMATION.delay);
        }
      });
    };

    loadTexture("/textures/painted-worn-asphalt_albedo.jpg", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      material.map = texture;
    });

    loadTexture("/textures/painted-worn-asphalt_normal-ogl.jpg", (texture) => {
      material.normalMap = texture;
    });

    return () => {
      material.map?.dispose();
      material.normalMap?.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [material, geometry, gl]);

  // Optimized animation frame
  useFrame(() => {
    if (
      !meshRef.current ||
      !animationState.current.isVisible ||
      !animationState.current.isAnimating
    )
      return;

    const elapsed = (performance.now() - animationState.current.startTime) / 1000;
    const positionT = Math.min(elapsed / ANIMATION.duration, 1);
    const eased = easeOutCubic(positionT);

    // Update position (ascending from bottom)
    meshRef.current.position.y = THREE.MathUtils.lerp(
      ANIMATION.position.start.y,
      ANIMATION.position.end.y,
      eased,
    );

    // Slower, smoother fade in
    const fadeT = Math.min(elapsed / ANIMATION.fadeInDuration, 1);
    material.opacity = fadeT * fadeT * fadeT; // Cubic easing for even smoother fade

    if (positionT === 1) {
      animationState.current.isAnimating = false;
      material.transparent = false;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, ANIMATION.position.start.y, ANIMATION.position.start.z]}
      visible={animationState.current.isVisible}
      frustumCulled={true}
    />
  );
}
