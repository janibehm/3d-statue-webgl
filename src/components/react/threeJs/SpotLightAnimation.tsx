import { useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import { SpotLight as ThreeSpotLight, Object3D, Vector3 } from "three";
import { useTexture } from "@react-three/drei";

export function SpotLightAnimation() {
  const texture = useTexture("/textures/painted-worn-asphalt_albedo.jpg", (t) => {
    t.flipY = false;
    t.needsUpdate = true;
  });

  const spotLightRef = useRef<ThreeSpotLight>(null);
  const targetRef = useRef<Object3D>(null);
  const initialRender = useRef(true);

  const config = useMemo(
    () => ({
      light: {
        angle: Math.PI / 30,
        penumbra: 0.5,
        decay: 1,
        distance: 200,
        intensity: 80,
      },
      animation: {
        radius: 60,
        height: 20,
        speed: 1 / 3,
      },
      target: [0, 0, 0] as const,
    }),
    [],
  );

  const position = useMemo(
    () =>
      new Vector3(
        Math.cos(-Math.PI / 2) * config.animation.radius,
        config.animation.height,
        Math.sin(-Math.PI / 2) * config.animation.radius,
      ),
    [config.animation.radius, config.animation.height],
  );

  useEffect(() => {
    if (spotLightRef.current && targetRef.current) {
      spotLightRef.current.target = targetRef.current;
      spotLightRef.current.intensity = config.light.intensity;
      spotLightRef.current.position.copy(position);
    }
  }, [position]);

  useFrame(({ clock }) => {
    if (!spotLightRef.current) return;

    const time = clock.getElapsedTime() * config.animation.speed - Math.PI / 2;

    if (initialRender.current && clock.getElapsedTime() < 1) {
      const transitionAlpha = Math.min(clock.getElapsedTime(), 1);
      spotLightRef.current.intensity = config.light.intensity * transitionAlpha;
    } else {
      initialRender.current = false;
      spotLightRef.current.intensity = config.light.intensity;
    }

    position.set(
      Math.cos(time) * config.animation.radius,
      config.animation.height,
      Math.sin(time) * config.animation.radius,
    );

    spotLightRef.current.position.copy(position);
  });

  return (
    <>
      <SpotLight
        ref={spotLightRef}
        position={position.toArray()}
        angle={config.light.angle}
        penumbra={config.light.penumbra}
        decay={config.light.decay}
        distance={config.light.distance}
        intensity={config.light.intensity}
        map={texture}
        target-position={config.target}
        power={20}
        volumetric={true}
        opacity={0}
      />
      <object3D ref={targetRef} position={config.target} />
    </>
  );
}
