import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Html } from "@react-three/drei";
import { LucyModel } from "../components/react/threeJs/LucyModel";
import { SpotLightAnimation } from "../components/react/threeJs/SpotLightAnimation";
import { globalAnimationState } from "../components/react/threeJs/constants/animations";
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
  const [isBaseSceneLoaded, setIsBaseSceneLoaded] = useState(false);

  useEffect(() => {
    const onLucyPositionChange = () => {
      if (globalAnimationState.isLucyInPosition) {
        setIsLucyReady(true);
      }
    };

    // Subscribe to position changes
    globalAnimationState.subscribe(onLucyPositionChange);

    // Check initial state
    onLucyPositionChange();

    // Cleanup subscription
    return () => globalAnimationState.unsubscribe(onLucyPositionChange);
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
        camera={{ position: [0, 2, 5], fov: 75 }}
        key={key}
        style={{
          pointerEvents: isMobile ? "none" : "auto",
          touchAction: "none",
        }}
      >
        <color attach="background" args={[0x000000]} />
        <Stars />
        <ambientLight intensity={0.05} />
        <hemisphereLight intensity={0.2} groundColor="#080820" />
        <CameraControl />
        
        {/* First stage - Lucy */}
        <Suspense fallback={<Loader onLoad={() => setIsSceneLoaded(true)} />}>
          <LucyModel onLoad={() => setIsBaseSceneLoaded(true)} />
        </Suspense>

        {/* Second stage - Sphere and Spotlight */}
        {isBaseSceneLoaded && (
          <Suspense fallback={null}>
            <Sphere />
            <SpotLightAnimation />
          </Suspense>
        )}
      </Canvas>
    </div>
  );
}

export default ThreeScene;
