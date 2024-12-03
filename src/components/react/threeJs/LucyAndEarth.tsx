import { useEffect, useMemo, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useProgress, Points, GradientTexture } from "@react-three/drei";
import { isMobileDevice } from "../../../utils/deviceDetection";

const MODEL_SCALE = 0.0033;
const POINTS_COUNT = 300;
const FIELD_SIZE = 12;
const CIRCLE_RADIUS = 15;
const CIRCLE_SEGMENTS = 64;

const LIGHT_CONFIG = {
  upper: {
    intensity: 0.3,
    groundColor: "#7c4dff",
    color: "#4fc3f7",
    position: [0, 20, 0],
  },
  lower: {
    intensity: 0.1,
    groundColor: "#e040fb",
    color: "#2196f3",
    position: [0, -20, 0],
  },
} as const;

const generatePoints = () => {
  const positions = new Float32Array(POINTS_COUNT * 3);
  const stride = 3;
  const angleStep = (Math.PI * 2) / POINTS_COUNT;

  for (let i = 0; i < POINTS_COUNT; i++) {
    const i3 = i * stride;
    const angle = angleStep * i;

    const radius = Math.sqrt(Math.random()) * FIELD_SIZE;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    positions[i3] = cos * radius;
    positions[i3 + 1] = 0.2 + Math.random() * 2;
    positions[i3 + 2] = sin * radius;
  }

  return { positions };
};

interface LucyAndEarthProps {
  onLoad?: () => void;
}

export function LucyAndEarth({ onLoad }: LucyAndEarthProps) {
  const { scene: model } = useGLTF("/models/Lucy.glb");
  const { scene, gl, camera } = useThree();
  const { progress } = useProgress();

  const { positions } = useMemo(() => generatePoints(), []);
  const isMobile = useMemo(() => isMobileDevice, []);

  useEffect(() => {
    if (!model || progress !== 100) return;

    // Modify original model directly
    model.visible = true;
    model.scale.setScalar(MODEL_SCALE);
    model.rotation.x = Math.PI / 2;
    model.rotation.z = Math.PI * -0.1;
    model.position.set(0, -0.15, 1);

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.frustumCulled = true;
        child.castShadow = true;
        if (child.material) {
          child.material.transparent = false;
          child.material.opacity = 1;
        }
      }
    });

    // Compile and add to scene
    gl.compile(model, camera);

    requestAnimationFrame(() => {
      scene.add(model);
      onLoad?.();
    });

    return () => {
      scene.remove(model);
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    };
  }, [model, scene, gl, camera, progress, onLoad]);

  // Add back the circle geometry
  const circleGeometry = new THREE.CircleGeometry(CIRCLE_RADIUS, CIRCLE_SEGMENTS);

  return (
    <>
      <hemisphereLight {...LIGHT_CONFIG.upper} />
      <hemisphereLight {...LIGHT_CONFIG.lower} />

      {/* Add back the circle plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]} geometry={circleGeometry}>
        <meshStandardMaterial
          transparent
          opacity={0.8}
          roughness={0.3}
          metalness={0.4}
          emissiveIntensity={1}
        >
          <GradientTexture
            attach="map"
            stops={[0, 0.3, 0.7, 1]}
            colors={["#4fc3f7", "#7c4dff", "#e040fb", "#2196f3"]}
          />
        </meshStandardMaterial>
      </mesh>

      {/* Only render Points on non-mobile devices */}
      {!isMobile && (
        <Points positions={positions}>
          <pointsMaterial
            size={0.03}
            sizeAttenuation={true}
            color="#4fc3f7"
            transparent={true}
            opacity={0.5}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </Points>
      )}
    </>
  );
}
