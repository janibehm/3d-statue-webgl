import { useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import { SpotLight as ThreeSpotLight, Object3D, Vector3 } from "three";
import { useTexture } from "@react-three/drei";

export function SpotLightAnimation() {
  const texture = useTexture("/textures/painted-worn-asphalt_albedo.jpg");
  const spotLightRef = useRef<ThreeSpotLight>(null);
  const targetRef = useRef<Object3D>(null);

  // Memoize constant values
  const lightConfig = useMemo(
    () => ({
      angle: Math.PI / 6,
      penumbra: 1,
      decay: 2,
      distance: 100,
      shadowMapSize: [124, 124] as [number, number],
      shadowCameraNear: 5,
      shadowCameraFar: 100,
      shadowFocus: 1,
      intensity: 100,
      radius: 3, // Increase radius for wider orbit
      height: 8, // Height of the light
      speed: 1, // Rotation speed
      offsetZ: 2,
    }),
    [],
  );

  // Pre-create vector for position updates
  const position = useMemo(() => new Vector3(5, 10, 5), []);

  useEffect(() => {
    if (spotLightRef.current && targetRef.current) {
      spotLightRef.current.target = targetRef.current;
    }
  }, []);

  useFrame(({ clock }) => {
    if (!spotLightRef.current) return;
    const time = clock.getElapsedTime() / 3;

    position.set(Math.cos(time) * lightConfig.radius, 10, Math.sin(time) * lightConfig.radius);
    spotLightRef.current.position.copy(position);
  });

  return (
    <>
      <SpotLight
        ref={spotLightRef}
        position={position.toArray()}
        angle={lightConfig.angle}
        penumbra={lightConfig.penumbra}
        decay={lightConfig.decay}
        distance={lightConfig.distance}
        castShadow
        shadow-mapSize={lightConfig.shadowMapSize}
        shadow-camera-near={lightConfig.shadowCameraNear}
        shadow-camera-far={lightConfig.shadowCameraFar}
        shadow-focus={lightConfig.shadowFocus}
        intensity={lightConfig.intensity}
        map={texture}
      />
      <object3D ref={targetRef} position={[0, -0.5, 0]} />
    </>
  );
}
