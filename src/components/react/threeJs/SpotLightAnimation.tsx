import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import { SpotLight as ThreeSpotLight, Object3D } from "three";
import { useTexture } from "@react-three/drei";

export function SpotLightAnimation() {
  const texture = useTexture("/textures/painted-worn-asphalt_albedo.jpg");
  const spotLightRef = useRef<ThreeSpotLight>(null);
  const targetRef = useRef<Object3D>(null);

  useEffect(() => {
    if (spotLightRef.current && targetRef.current) {
      spotLightRef.current.target = targetRef.current;
    }
  }, []);

  useFrame(({ clock }) => {
    if (!spotLightRef.current) return;
    const time = clock.getElapsedTime() / 3;
    const radius = 5;

    Object.assign(spotLightRef.current.position, {
      x: Math.cos(time) * radius,
      y: 10,
      z: Math.sin(time) * radius,
    });
  });

  return (
    <>
      <SpotLight
        ref={spotLightRef}
        position={[5, 10, 5]}
        angle={Math.PI / 6}
        penumbra={1}
        decay={2}
        distance={100}
        castShadow
        shadow-mapSize={[124, 124]}
        shadow-camera-near={2}
        shadow-camera-far={100}
        shadow-focus={1}
        intensity={100}
        map={texture}
      />
      <object3D ref={targetRef} position={[0, -0.5, 0]} />
    </>
  );
}
