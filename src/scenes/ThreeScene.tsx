import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Html, Preload, useGLTF } from "@react-three/drei";
import { LucyModel } from "../components/react/threeJs/LucyModel";
import { SpotLightAnimation } from "../components/react/threeJs/SpotLightAnimation";
import { Sphere } from "../components/react/threeJs/Sphere";
import { Stars } from "../components/react/threeJs/Stars";
import { CameraControl } from "../components/react/threeJs/CameraControl";
import { ScrollIndicator } from "../components/react/ScrollIndicator";
import { isMobileDevice } from "../utils/deviceDetection";

// Preload all models at startup
useGLTF.preload("/models/Lucy.glb");
useGLTF.preload("/models/earth.glb");

// Loading canvas
function Loader({ onLoad }: { onLoad: () => void }) {
  useEffect(() => {
    return () => {
      onLoad();
    };
  }, [onLoad]);

  

  return (
    <Html center>
      <div
        style={{
          color: "white",
          fontSize: "1.2em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          background: "black",
        }}
      ></div>
    </Html>
  );
}

function ThreeScene() {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const isMobile = isMobileDevice;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 1,
        touchAction: isMobile ? "pan-y" : "none",
        userSelect: "none",
        pointerEvents: isMobile ? "none" : "auto",
      }}
    >
      <ScrollIndicator isSceneLoaded={isSceneLoaded} />
      <Canvas
        camera={{ position: [0, 2, 5], fov: 75 }}
        style={{
          pointerEvents: isMobile ? "none" : "auto",
          touchAction: "none",
        }}
      >
        <color attach="background" args={[0x000000]} />
       
        
        {/* Lucy and basic scene elements load first */}
        <Suspense fallback={<Loader onLoad={() => setIsSceneLoaded(true)} />}>
          <Stars />
          <ambientLight intensity={0.05} />
          <hemisphereLight intensity={0.1} groundColor="#080820" />
          <CameraControl />
          <LucyModel />
             {/*  <Sphere /> */}
               <SpotLightAnimation />
        </Suspense>
<Preload all/>
      </Canvas>
    </div>
  );
}

export default ThreeScene;
