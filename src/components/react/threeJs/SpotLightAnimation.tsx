import { useEffect, useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import {
  SpotLight as ThreeSpotLight,
  Object3D,
  Vector3,
  Mesh,
  PlaneGeometry,
  ShadowMaterial,
} from "three";

import { getKTX2Loader, disposeKTX2Loader } from "../../../utils/ktx2Loader";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

// Move constants outside component
const PLANE_SIZE = 200;
const SHADOW_MATERIAL = new ShadowMaterial({ opacity: 0.5 });
const PLANE_GEOMETRY = new PlaneGeometry(PLANE_SIZE, PLANE_SIZE);

// Pre-define configuration
const CONFIG = {
  light: {
    angle: Math.PI / 100,
    penumbra: 0.5,
    decay: 1,
    distance: 300,
    intensity: 40,
    shadowMapSize: [4096, 4096] as [number, number],
    shadowBias: -0.0001,
    shadowNear: 1,
    shadowFov: 90,
    shadowRadius: 1,
  },
  animation: {
    radius: 30,
    height: 40,
    speed: 1 / 16,
  },
  target: [0, 0, 0] as const,
} as const;

interface SpotLightAnimationProps {
  waitForTexture?: boolean;
  startAnimation?: boolean;
}

export function SpotLightAnimation({
  waitForTexture = false,
  startAnimation = false,
}: SpotLightAnimationProps) {
  const spotLightRef = useRef<ThreeSpotLight>(null);
  const targetRef = useRef<Object3D>(null);
  const initialRender = useRef(true);
  const positionVector = useRef(new Vector3());
  const lastTime = useRef(0);
  const { gl } = useThree();
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Replace the texture useMemo with useEffect
  useEffect(() => {
    const loader = getKTX2Loader(gl);

    loader.load("/textures/painted-worn-asphalt_albedo.ktx2", (loadedTexture) => {
      loadedTexture.flipY = false;
      loadedTexture.needsUpdate = true;
      setTexture(loadedTexture);
    });

    return () => {
      if (texture) texture.dispose();
      disposeKTX2Loader();
    };
  }, [gl]);

  // Memoize shadow plane creation
  const shadowPlane = useMemo(() => {
    const plane = new Mesh(PLANE_GEOMETRY, SHADOW_MATERIAL);
    plane.rotateX(-Math.PI / 2);
    plane.position.y = 0;
    plane.receiveShadow = true;
    return plane;
  }, []);

  useEffect(() => {
    if (!spotLightRef.current || !targetRef.current) return;

    const spotlight = spotLightRef.current;
    const target = targetRef.current;

    spotlight.target = target;
    spotlight.intensity = CONFIG.light.intensity;

    positionVector.current.set(
      Math.cos(0) * CONFIG.animation.radius,
      CONFIG.animation.height,
      Math.sin(0) * CONFIG.animation.radius,
    );
    spotlight.position.copy(positionVector.current);

    // Add shadow plane
    target.parent?.add(shadowPlane);

    return () => {
      target.parent?.remove(shadowPlane);
    };
  }, [shadowPlane]);

  useFrame(({ clock }) => {
    if (!spotLightRef.current) return;

    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - lastTime.current;
    lastTime.current = elapsedTime;

    // Skip frame if delta is too small
    if (deltaTime < 0.016) return; // ~60fps

    const time = elapsedTime * CONFIG.animation.speed;

    if (initialRender.current) {
      if (elapsedTime < 4) {
        spotLightRef.current.intensity = CONFIG.light.intensity * Math.min(elapsedTime / 4, 1);
        spotLightRef.current.angle =
          Math.PI / 100 + (Math.PI / 10 - Math.PI / 100) * Math.min(elapsedTime / 4, 1);
      } else {
        initialRender.current = false;
        spotLightRef.current.intensity = CONFIG.light.intensity;
        spotLightRef.current.angle = Math.PI / 10;
      }
    }

    positionVector.current.set(
      Math.cos(time) * CONFIG.animation.radius,
      CONFIG.animation.height,
      Math.sin(time) * CONFIG.animation.radius,
    );

    spotLightRef.current.position.copy(positionVector.current);
  });

  useEffect(() => {
    if (!spotLightRef.current) return;

    // Initial small angle
    spotLightRef.current.angle = Math.PI / 100;

    if (!startAnimation) return;

    // Animate to larger angle when ready to start
    gsap
      .timeline()
      .to(spotLightRef.current, {
        angle: Math.PI / 10,
        duration: 1,
        ease: "power2.inOut",
        delay: 0.1,
      })
      .to(
        spotLightRef.current,
        {
          intensity: CONFIG.light.intensity,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=1.5",
      ); // Overlap with angle animation
  }, [startAnimation]);

  return (
    <>
      <SpotLight
        ref={spotLightRef}
        position={positionVector.current.toArray()}
        angle={CONFIG.light.angle}
        penumbra={CONFIG.light.penumbra}
        decay={CONFIG.light.decay}
        distance={CONFIG.light.distance}
        intensity={CONFIG.light.intensity}
        map={texture}
        target-position={CONFIG.target}
        power={10}
        volumetric={true}
        opacity={0}
        castShadow
        shadow-mapSize={CONFIG.light.shadowMapSize}
        shadow-bias={CONFIG.light.shadowBias}
        shadow-camera-near={CONFIG.light.shadowNear}
        shadow-camera-far={CONFIG.light.distance}
        shadow-camera-fov={CONFIG.light.shadowFov}
        shadow-radius={CONFIG.light.shadowRadius}
      />
      <object3D ref={targetRef} position={CONFIG.target} />
    </>
  );
}
