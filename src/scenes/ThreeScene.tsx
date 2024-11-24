import { useEffect, useState, lazy, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Preload } from "@react-three/drei";
import { CameraControl } from "../components/react/threeJs/CameraControl";
import { ScrollIndicator } from "../components/react/ScrollIndicator";
import { isMobileDevice } from "../utils/deviceDetection";
import gsap from "gsap";

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

  const Stars = lazy(() =>
    import("../components/react/threeJs/Stars").then((module) => ({ default: module.Stars })),
  );
  const SpotLightAnimation = lazy(() =>
    import("../components/react/threeJs/SpotLightAnimation").then((module) => ({
      default: module.SpotLightAnimation,
    })),
  );
  const LucyAndEarth = lazy(() =>
    import("../components/react/threeJs/LucyAndEarth").then((module) => ({
      default: module.LucyAndEarth,
    })),
  );

  useEffect(() => {
    if (isSceneLoaded) {
      // Animate curtain away when scene is loaded
      gsap.to("#scene-curtain", {
        yPercent: -100,
        duration: 1.2,
        ease: "power3.inOut",
        onComplete: () => {
          // Optional: remove curtain from DOM after animation
          document.getElementById("scene-curtain")?.remove();
        },
      });
    }
  }, [isSceneLoaded]);

  return (
    <>
      <div
        id="scene-curtain"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "black",
          zIndex: 2,
        }}
      />
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
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          camera={{ position: [0, 2, 5], fov: 75 }}
          key={key}
          style={{
            pointerEvents: isMobile ? "none" : "auto",
            touchAction: "none",
          }}
        >
          <Suspense fallback={<Loader onLoad={() => {}} />}>
            <Stars />
            <ambientLight intensity={0.2} />
            <hemisphereLight intensity={0.5} color="#b380ff" groundColor="#080820" />
            <CameraControl />
            <Suspense fallback={null}>
              <LucyAndEarth onLoad={() => setIsSceneLoaded(true)} />
            </Suspense>
            <Suspense fallback={null}>
              <SpotLightAnimation />
            </Suspense>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

export default ThreeScene;
