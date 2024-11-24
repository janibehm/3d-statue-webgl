import { useEffect, useRef, useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import { SpotLight as ThreeSpotLight, Object3D, Vector3 } from "three";
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

  const config = useMemo(
    () => ({
      light: {
        angle: Math.PI / 40,
        penumbra: 0.1,
        decay: 1.5,
        distance: 300,
        intensity: 500,
      },
      animation: {
        radius: 40,
        height: 20,
        speed: 1 / 3,
      },
      target: [0, 0, 0] as const,
    }),
    [],
  );

  const calculatePosition = useCallback(
    (time: number) => {
      return new Vector3(
        Math.cos(time) * config.animation.radius,
        config.animation.height,
        Math.sin(time) * config.animation.radius,
      );
    },
    [config],
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
    }
  }, []);

  useFrame(({ clock }) => {
    if (!spotLightRef.current) return;

    const time = clock.getElapsedTime() * config.animation.speed - Math.PI / 2;
    const elapsedTime = clock.getElapsedTime();

    if (initialRender.current && elapsedTime < 1) {
      spotLightRef.current.intensity = config.light.intensity * Math.min(elapsedTime, 1);
    } else if (initialRender.current) {
      initialRender.current = false;
      spotLightRef.current.intensity = config.light.intensity;
    }

    positionVector.current = calculatePosition(time);
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
        power={20}
        volumetric={true}
        opacity={0.5}
      />
      <object3D ref={targetRef} position={config.target} />
    </>
  );
}
