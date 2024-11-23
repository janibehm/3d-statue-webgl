import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Html, Preload } from "@react-three/drei";
import { LucyAndEarth } from "../components/react/threeJs/LucyAndEarth";
import { SpotLightAnimation } from "../components/react/threeJs/SpotLightAnimation";
/* import { Sphere } from "../components/react/threeJs/Sphere"; */
import { Stars } from "../components/react/threeJs/Stars";
import { CameraControl } from "../components/react/threeJs/CameraControl";
import { ScrollIndicator } from "../components/react/ScrollIndicator";
import { isMobileDevice } from "../utils/deviceDetection";

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
  const [key] = useState(0);
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  /*   const [isLucyReady, setIsLucyReady] = useState(false); */
  const [isMobile] = useState(isMobileDevice);

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
        key={key}
        style={{
          pointerEvents: isMobile ? "none" : "auto",
          touchAction: "none",
        }}
      >
        <color attach="background" args={[0x000000]} />

        {/* First stage - Lucy */}
        <Suspense>
          <Stars />
          <ambientLight intensity={0.05} />
          <hemisphereLight intensity={0.3} groundColor="#080820" />
          <CameraControl />
          <LucyAndEarth onLoad={() => setIsSceneLoaded(true)} />
          {/*   <Sphere /> */}
          <SpotLightAnimation />
          <Preload all />
        </Suspense>

        {/* Second stage - Sphere and Spotlight */}

        <Suspense fallback={null}></Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeScene;
