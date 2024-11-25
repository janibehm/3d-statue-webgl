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
      // Fade out curtain instead of sliding it
      gsap.to("#scene-curtain", {
        opacity: 0,
        duration: 2.2,
        ease: "power2.inOut",
        onComplete: () => {
          document.getElementById("scene-curtain")?.remove();
        },
      });
    }
  }, [isSceneLoaded]);

  return (
    <>
      <div
        id="scene-curtain"
        className="fixed inset-0 bg-black z-[2]"
        style={{
          animation: isSceneLoaded ? "fadeOutThrough 2.2s ease-in-out forwards" : "none",
          pointerEvents: isSceneLoaded ? "none" : "auto",
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
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Suspense fallback={<Loader onLoad={() => {}} />}>
            <Stars />
            <ambientLight intensity={2.5} color="#404040" />
            <hemisphereLight intensity={0.3} color="#9370DB" groundColor="#080820" />
            <spotLight position={[5, 5, 5]} intensity={3} angle={0.4} penumbra={0.3} castShadow />
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
