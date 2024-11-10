import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easeOutCubic } from "./hooks/easeOutCubix";
import * as THREE from "three";

const ANIMATION = {
  duration: 3.5,
  fadeInDuration: 2.5,
  delay: 300,
  position: {
    start: { y: -10, z: 0 },
    end: { y: -3.8, z: 0 },
  },
} satisfies {
  duration: number;
  fadeInDuration: number;
  delay: number;
  position: {
    start: { y: number; z: number };
    end: { y: number; z: number };
  };
};

const TEXTURE_SETTINGS = {
  albedo: {
    path: "/textures/painted-worn-asphalt_albedo.jpg",
    colorSpace: THREE.SRGBColorSpace,
  },
  normal: {
    path: "/textures/painted-worn-asphalt_normal-ogl.jpg",
  },
} as const;

const textureLoader = new THREE.TextureLoader();
const dummyCamera = new THREE.PerspectiveCamera();

export function Sphere() {
  const { gl } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const frameState = useRef({
    startTime: 0,
    isAnimating: true,
    isVisible: false,
    texturesLoaded: 0,
    currentY: ANIMATION.position.start.y,
    currentOpacity: 0,
  });

  // Memoize material and geometry together
  const [material, geometry] = useMemo(
    () => [
      new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: 0,
      }),
      (() => {
        const geo = new THREE.SphereGeometry(3, 25, 25);
        geo.computeBoundingSphere();
        geo.computeBoundingBox();
        return geo;
      })(),
    ],
    [],
  );

  // Optimized texture loading
  useEffect(() => {
    const textures: THREE.Texture[] = [];

    const onTextureLoad = (texture: THREE.Texture) => {
      textures.push(texture);
      frameState.current.texturesLoaded++;

      if (frameState.current.texturesLoaded === 2 && meshRef.current) {
        gl.compile(meshRef.current, dummyCamera);

        setTimeout(() => {
          frameState.current.isVisible = true;
          frameState.current.startTime = performance.now();
        }, ANIMATION.delay);
      }
    };

    // Load albedo texture
    textureLoader.load(TEXTURE_SETTINGS.albedo.path, (texture) => {
      texture.colorSpace = TEXTURE_SETTINGS.albedo.colorSpace;
      material.map = texture;
      onTextureLoad(texture);
    });

    // Load normal texture
    textureLoader.load(TEXTURE_SETTINGS.normal.path, (texture) => {
      material.normalMap = texture;
      onTextureLoad(texture);
    });

    return () => {
      textures.forEach((texture) => texture.dispose());
      material.dispose();
      geometry.dispose();
    };
  }, [material, geometry, gl]);

  // Optimized animation frame with cached values
  useFrame(() => {
    const state = frameState.current;
    const mesh = meshRef.current;

    if (!mesh || !state.isVisible || !state.isAnimating) return;

    const elapsed = (performance.now() - state.startTime) / 1000;
    const positionT = Math.min(elapsed / ANIMATION.duration, 1);
    const eased = easeOutCubic(positionT);

    // Cache calculations
    state.currentY = THREE.MathUtils.lerp(
      ANIMATION.position.start.y,
      ANIMATION.position.end.y,
      eased,
    );

    state.currentOpacity = Math.min(Math.pow(elapsed / ANIMATION.fadeInDuration, 3), 1);

    // Apply cached values
    mesh.position.y = state.currentY;
    material.opacity = state.currentOpacity;

    if (positionT === 1) {
      state.isAnimating = false;
      material.transparent = false;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, frameState.current.currentY, ANIMATION.position.start.z]}
      visible={frameState.current.isVisible}
      frustumCulled={true}
    />
  );
}
