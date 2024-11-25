import { useEffect, useRef, useMemo, useCallback } from "react";
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
import { useTexture } from "@react-three/drei";

export function SpotLightAnimation() {
  const spotLightRef = useRef<ThreeSpotLight>(null);
  const targetRef = useRef<Object3D>(null);
  const initialRender = useRef(true);
  const positionVector = useRef(new Vector3());

  const texture = useTexture("/textures/painted-worn-asphalt_albedo.webp", (t) => {
    t.flipY = false;
    t.needsUpdate = true;
  });

  const config = {
    light: {
      angle: Math.PI / 3,
      penumbra: 1,
      decay: 1.5,
      distance: 50,
      intensity: 200,
    },
    animation: {
      radius: 10,
      height: 15,
      speed: 1 / 8,
    },
    target: [0, 0, 0] as const,
  };

  const calculatePosition = useCallback(
    (time: number) => {
      return new Vector3(
        Math.cos(time) * config.animation.radius,
        config.animation.height,
        Math.sin(time) * config.animation.radius,
      );
    },
    [config.animation.radius, config.animation.height],
  );

  useEffect(() => {
    if (spotLightRef.current && targetRef.current) {
      spotLightRef.current.target = targetRef.current;
      spotLightRef.current.intensity = config.light.intensity;

      positionVector.current.set(
        Math.cos(-Math.PI / 2) * config.animation.radius,
        config.animation.height,
        Math.sin(-Math.PI / 2) * config.animation.radius,
      );
      spotLightRef.current.position.copy(positionVector.current);

      // Create a shadow-receiving plane
      const planeSize = 200; // Adjust based on your scene scale
      const shadowPlane = new Mesh(
        new PlaneGeometry(planeSize, planeSize),
        new ShadowMaterial({ opacity: 0.5 }),
      );
      shadowPlane.rotateX(-Math.PI / 2); // Rotate to be horizontal
      shadowPlane.position.y = 0; // Adjust based on your scene
      shadowPlane.receiveShadow = true;

      // Get the scene from the target's parent
      targetRef.current.parent?.add(shadowPlane);
    }
  }, []);

  useFrame(({ clock }) => {
    if (!spotLightRef.current) return;

    const time = clock.getElapsedTime() * config.animation.speed;

    positionVector.current.set(
      Math.cos(time) * config.animation.radius,
      config.animation.height,
      Math.sin(time) * config.animation.radius,
    );

    spotLightRef.current.position.copy(positionVector.current);
  });

  return (
    <>
      <SpotLight
        ref={spotLightRef}
        position={positionVector.current.toArray()}
        angle={config.light.angle}
        penumbra={config.light.penumbra}
        decay={config.light.decay}
        distance={config.light.distance}
        intensity={config.light.intensity}
        map={texture}
        target-position={config.target}
        power={100}
        volumetric={false}
        opacity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.001}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-fov={30}
        shadow-focus={1}
      />
      <object3D ref={targetRef} position={config.target} />
    </>
  );
}
