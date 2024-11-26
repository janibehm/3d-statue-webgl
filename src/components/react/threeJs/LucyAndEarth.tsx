import { useEffect, useMemo, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useProgress, Points, GradientTexture } from "@react-three/drei";
import gsap from "gsap";

const MODEL_SCALE = 0.0035;
const CIRCLE_RADIUS = 15;
const CIRCLE_SEGMENTS = 64;
const GALAXY_POINTS = 3000;
const GALAXY_RADIUS = 20;
const GALAXY_BRANCHES = 3;
const SPIN = 1.5;

const LIGHT_CONFIG = {
  upper: {
    intensity: 0.2,
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

const generateGalaxyPoints = (count: number) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Radius
    const radius = Math.random() * GALAXY_RADIUS;
    const branchAngle = ((i % GALAXY_BRANCHES) / GALAXY_BRANCHES) * Math.PI * 2;
    const spinAngle = radius * SPIN;

    // Calculate position with some randomness
    const randomOffset = Math.random() * 0.5;
    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomOffset;
    positions[i3 + 1] = 3 + (Math.random() - 0.5) * 2; // Height variation around y=3
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomOffset;

    // Add colors
    const mixedColor = new THREE.Color();
    mixedColor.setHSL(0.6 + Math.random() * 0.2, 0.7, 0.4 + Math.random() * 0.3); // Blue-ish colors

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  return { positions, colors };
};

const circleGeometry = new THREE.CircleGeometry(CIRCLE_RADIUS, CIRCLE_SEGMENTS);

// Add interface for props
interface LucyAndEarthProps {
  onLoad?: () => void;
  startAnimation?: boolean;
}

export function LucyAndEarth({ onLoad, startAnimation = false }: LucyAndEarthProps) {
  const { scene: model } = useGLTF("/models/Lucy.glb");
  const { scene, gl, camera } = useThree();
  const { progress } = useProgress();

  const { positions, colors } = useMemo(() => generateGalaxyPoints(3000), []);

  const setupModel = useCallback(() => {
    if (!model) return null;

    const modelInstance = model.clone();
    modelInstance.visible = true;
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.rotation.x = Math.PI / 2;
    modelInstance.rotation.z = Math.PI * -0.1;
    modelInstance.position.set(0, -0.15, 3);

    modelInstance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.frustumCulled = true;
        child.castShadow = true;
        if (child.material) {
          child.material.transparent = false;
          child.material.opacity = 1;
        }
      }
    });

    return modelInstance;
  }, [model]);

  useEffect(() => {
    if (!model || progress !== 100) return;

    const modelInstance = setupModel();
    if (!modelInstance) return;

    // Compile and wait for next frame to ensure everything is ready
    gl.compile(modelInstance, camera);

    requestAnimationFrame(() => {
      scene.add(modelInstance);
      onLoad?.();
    });

    return () => {
      scene.remove(modelInstance);
      modelInstance.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    };
  }, [model, scene, gl, camera, progress, onLoad, setupModel]);

  useEffect(() => {
    if (!model || !startAnimation) return;

    // Animate model appearance
    gsap.from(model.position, {
      y: -1,
      duration: 2,
      ease: "power2.out",
      delay: 0.5,
    });

    gsap.from(model.rotation, {
      z: Math.PI * -0.2,
      duration: 2,
      ease: "power2.out",
      delay: 0.5,
    });
  }, [model, startAnimation]);

  return (
    <>
      <hemisphereLight {...LIGHT_CONFIG.upper} />
      <hemisphereLight {...LIGHT_CONFIG.lower} />

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

      <Points positions={positions} renderOrder={999}>
        <pointsMaterial
          size={0.15}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.6}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </>
  );
}
