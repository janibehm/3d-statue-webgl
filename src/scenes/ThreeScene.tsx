import { useEffect, useState, lazy, Suspense, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, Preload } from "@react-three/drei";
import { isMobileDevice } from "../utils/deviceDetection";
import { ScrollIndicator } from "../components/react/ScrollIndicator";
import gsap from "gsap";
import { getKTX2Loader, disposeKTX2Loader } from "../utils/ktx2Loader";
/* import { MemoryMonitor } from "../components/react/threeJs/MemoryMonitor";
 */
// Lazy load components
const Stars = lazy(() =>
  import("../components/react/threeJs/Stars").then((module) => ({
    default: module.Stars,
  })),
);
const CameraControl = lazy(() =>
  import("../components/react/threeJs/CameraControl").then((module) => ({
    default: module.CameraControl,
  })),
);
const LucyAndEarth = lazy(() =>
  import("../components/react/threeJs/LucyAndEarth").then((module) => ({
    default: module.LucyAndEarth,
  })),
);
const SpotLightAnimation = lazy(() =>
  import("../components/react/threeJs/SpotLightAnimation").then((module) => ({
    default: module.SpotLightAnimation,
  })),
);

// Loading component
function LoadingScreen() {
  return (
    <Html center>
      <div
        style={{
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          background: "black",
        }}
      >
        <div className="orbital-loader">
          <div className="orbital"></div>
          <div className="orbital"></div>
          <div className="orbital"></div>
        </div>
        <style>{`
          .orbital-loader {
            position: relative;
            width: 80px;
            height: 80px;
          }
          .orbital {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid transparent;
            border-top-color: #4fc3f7;
            border-radius: 50%;
            animation: spin 1.5s linear infinite;
          }
          .orbital:nth-child(2) {
            width: 70%;
            height: 70%;
            top: 15%;
            left: 15%;
            border-top-color: #7c4dff;
            animation-duration: 2s;
          }
          .orbital:nth-child(3) {
            width: 40%;
            height: 40%;
            top: 30%;
            left: 30%;
            border-top-color: #e040fb;
            animation-duration: 2.5s;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </Html>
  );
}

// Pre-define styles to prevent object recreation
const CONTAINER_STYLE = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 1,
  userSelect: "none",
} as const;

const FADE_OVERLAY_STYLE = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "black",
  pointerEvents: "none" as const,
  zIndex: 2,
} as const;

const CANVAS_SETTINGS = {
  shadows: true,
  camera: { position: [0, 2, 5], fov: 75 },
} as const;

// Add TextureLoader component
function TextureLoader({ onLoad }: { onLoad: () => void }) {
  const { gl } = useThree();

  useEffect(() => {
    const loader = getKTX2Loader(gl);

    loader.load("/textures/painted-worn-asphalt_albedo.ktx2", () => {
      onLoad();
    });

    return () => {
      disposeKTX2Loader();
    };
  }, [gl, onLoad]);

  return null;
}

function ThreeScene() {
  const [key] = useState(0);
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const fadeOverlayRef = useRef<HTMLDivElement>(null);
  const [isMobile] = useState(isMobileDevice);
  const [assetsReady, setAssetsReady] = useState(false);

  // Memoize dynamic styles
  const containerStyle = useMemo(
    () => ({
      ...CONTAINER_STYLE,
      touchAction: isMobile ? "pan-y" : "none",
      pointerEvents: isMobile ? ("none" as const) : ("auto" as const),
    }),
    [isMobile],
  );

  // Combine loading states with a delay
  useEffect(() => {
    if (modelLoaded && texturesLoaded) {
      // First let the texture and model settle
      setTimeout(() => {
        setAssetsReady(true);
        // Then start the fade after assets are ready
        setTimeout(() => {
          setIsSceneLoaded(true);
        }, 500);
      }, 300);
    }
  }, [modelLoaded, texturesLoaded]);

  // Use GSAP for smoother fade
  useEffect(() => {
    if (fadeOverlayRef.current && assetsReady) {
      gsap.to(fadeOverlayRef.current, {
        opacity: 0,
        duration: 2.5,
        ease: "power2.inOut",
        delay: 0.2,
      });
    }
  }, [assetsReady]);

  const canvasStyle = useMemo(
    () => ({
      pointerEvents: isMobile ? ("none" as const) : ("auto" as const),
      touchAction: "none",
    }),
    [isMobile],
  );

  return (
    <div style={containerStyle}>
      <div
        ref={fadeOverlayRef}
        style={{
          ...FADE_OVERLAY_STYLE,
          opacity: 1, // Initial state, GSAP will handle the animation
        }}
      />
      <ScrollIndicator isSceneLoaded={isSceneLoaded} />
      <Canvas {...CANVAS_SETTINGS} key={key} style={canvasStyle}>
        <color attach="background" args={[0x000000]} />
        <Suspense fallback={<LoadingScreen />}>
          <TextureLoader onLoad={() => setTexturesLoaded(true)} />
          <SpotLightAnimation waitForTexture={!texturesLoaded} startAnimation={assetsReady} />
          <Stars />
          <CameraControl />
          <LucyAndEarth onLoad={() => setModelLoaded(true)} startAnimation={assetsReady} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeScene;
