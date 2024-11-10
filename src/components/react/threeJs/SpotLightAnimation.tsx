import { useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import { SpotLight as ThreeSpotLight, Object3D, Vector3 } from "three";
import { useTexture } from "@react-three/drei";

export function SpotLightAnimation() {
  const texture = useTexture("/textures/painted-worn-asphalt_albedo.jpg");
  const spotLightRef = useRef<ThreeSpotLight>(null);
  const targetRef = useRef<Object3D>(null);

  // Combine all static values into a single memoized object
  const config = useMemo(
    () => ({
      light: {
        angle: Math.PI / 6,
        penumbra: 1,
        decay: 2,
        distance: 100,
        intensity: 100,
        shadow: {
          mapSize: [124, 124] as [number, number],
          cameraNear: 5,
          cameraFar: 100,
          focus: 1,
        },
      },
      animation: {
        radius: 3,
        height: 10, // Moved from position.y in useFrame
        speed: 1 / 3, // Incorporated the division by 3 from useFrame
      },
      target: [0, -0.5, 0] as const,
    }),
    [],
  );

  const position = useMemo(
    () => new Vector3(5, config.animation.height, 5),
    [config.animation.height],
  );

  useEffect(() => {
    if (spotLightRef.current && targetRef.current) {
      spotLightRef.current.target = targetRef.current;
    }
  }, []);

  useFrame(({ clock }) => {
    if (!spotLightRef.current) return;
    const time = clock.getElapsedTime() * config.animation.speed;

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
        castShadow
        shadow-mapSize={config.light.shadow.mapSize}
        shadow-camera-near={config.light.shadow.cameraNear}
        shadow-camera-far={config.light.shadow.cameraFar}
        shadow-focus={config.light.shadow.focus}
        intensity={config.light.intensity}
        map={texture}
      />
      <object3D ref={targetRef} position={config.target} />
    </>
  );
}
