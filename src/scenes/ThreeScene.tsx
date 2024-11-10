import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Html } from "@react-three/drei";
import { LucyModel } from "../components/react/threeJs/LucyModel";
import { SpotLightAnimation } from "../components/react/threeJs/SpotLightAnimation";
import { globalAnimationState } from "../components/react/threeJs/hooks/globalAnimationState";
import { Sphere } from "../components/react/threeJs/Sphere";
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
  const [isLucyReady, setIsLucyReady] = useState(false);
  const [isMobile] = useState(isMobileDevice);

  useEffect(() => {
    const checkLucyPosition = () => {
      if (globalAnimationState.isLucyInPosition) {
        setIsLucyReady(true);
      }
    };

    const interval = setInterval(checkLucyPosition, 100);
    return () => clearInterval(interval);
  }, []);

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
      <ScrollIndicator isSceneLoaded={isSceneLoaded && isLucyReady} />
      <Canvas
        key={key}
        camera={{ position: [0, 2, 5], fov: 75 }}
        style={{
          pointerEvents: isMobile ? "none" : "auto",
        }}
      >
        <color attach="background" args={[0x000000]} />
        <Suspense fallback={<Loader onLoad={() => setIsSceneLoaded(true)} />}>
          <ambientLight intensity={0.1} />
          <SpotLightAnimation />
          <Sphere />
          <LucyModel />
          <Stars />
          <CameraControl />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeScene;
