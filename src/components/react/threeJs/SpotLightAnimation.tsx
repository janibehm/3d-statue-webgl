import { useEffect, useRef, Suspense, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import { TextureLoader, SpotLight as ThreeSpotLight, Object3D, Texture } from "three";

export function SpotLightAnimation() {
  return (
    <Suspense fallback={null}>
      <SpotLightContent />
    </Suspense>
  );
}

function SpotLightContent() {
  const [texture, setTexture] = useState<Texture | null>(null);
  const [isTextureLoaded, setIsTextureLoaded] = useState(false);

  const spotLightRef = useRef<ThreeSpotLight>(null);
  const targetRef = useRef<Object3D>(null);

  useEffect(() => {
    const textureLoader = new TextureLoader();
    textureLoader.load("/textures/painted-worn-asphalt_albedo.png", (loadedTexture) => {
      setTexture(loadedTexture);
      setIsTextureLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (spotLightRef.current && targetRef.current) {
      spotLightRef.current.target = targetRef.current;
    }
  }, []);

  useFrame(({ clock }) => {
    if (!spotLightRef.current || !isTextureLoaded) return;
    const time = clock.getElapsedTime() / 3;
    spotLightRef.current.position.x = Math.cos(time) * 5;
    spotLightRef.current.position.z = Math.sin(time) * 5;
    spotLightRef.current.position.y = 10;
  });

  if (!texture) return null;

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
        shadow-mapSize-width={5024}
        shadow-mapSize-height={5024}
        shadow-camera-near={2}
        shadow-camera-far={100}
        shadow-focus={1}
        intensity={150}
        map={texture}
      />
      <object3D ref={targetRef} position={[0, -0.5, 0]} />
    </>
  );
}
