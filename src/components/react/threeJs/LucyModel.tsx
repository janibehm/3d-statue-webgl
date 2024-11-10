import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { globalAnimationState } from "./hooks/globalAnimationState";
import { easeOutCubic } from "./hooks/easeOutCubix";

// Constants outside component to prevent recreation
const POSITION = {
  start: { y: 5, z: 0 },
  end: { y: -0.5, z: 0 },
} as const;

const ANIMATION = {
  duration: 2,
  fadeInDuration: 0.5,
  delay: 100,
} as const;

const MODEL_SCALE = 0.0024;
const MATERIAL_SETTINGS = {
  metalness: 0.2,
  roughness: 0.5,
} as const;

// Preload model
useGLTF.preload("/models/Lucy-transformed.glb");

export function LucyModel() {
  const { scene: model } = useGLTF("/models/Lucy-transformed.glb", true);
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>();
  const animationState = useRef({
    startTime: 0,
    isAnimating: true,
    isReady: false,
    hasStarted: false,
  });

  useFrame(() => {
    const { current: model } = modelRef;
    if (!model || !animationState.current.isReady || !animationState.current.hasStarted) return;

    const elapsed = (performance.now() - animationState.current.startTime) / 1000;

    if (animationState.current.isAnimating) {
      const t = Math.min(elapsed / ANIMATION.duration, 1);
      const eased = easeOutCubic(t);

      // Update position
      model.position.y = THREE.MathUtils.lerp(POSITION.start.y, POSITION.end.y, eased);

      // Update opacity
      const fadeT = Math.min(elapsed / ANIMATION.fadeInDuration, 1);

      // Cache materials for better performance
      if (!model.userData.materials) {
        model.userData.materials = [];
        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            model.userData.materials.push(child.material);
          }
        });
      }

      // Update cached materials
      model.userData.materials.forEach((material: THREE.Material) => {
        material.opacity = fadeT;
        material.transparent = fadeT < 1;
      });

      if (t === 1) {
        animationState.current.isAnimating = false;
        globalAnimationState.isLucyInPosition = true;
      }
    }
  });

  useEffect(() => {
    if (!model || animationState.current.hasStarted) return;

    const modelInstance = model.clone();
    modelInstance.visible = false;
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.rotation.x = Math.PI / 2;
    modelInstance.position.set(0, POSITION.start.y, POSITION.start.z);

    // Optimize materials and geometry once
    modelInstance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Clone and optimize material
        child.material = child.material.clone();
        Object.assign(child.material, MATERIAL_SETTINGS, {
          transparent: true,
          opacity: 0,
        });
        child.frustumCulled = true;

        // Optimize geometry
        if (child.geometry && !child.geometry.boundingSphere) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();
        }
      }
    });

    // Pre-compile
    gl.compile(modelInstance, camera);

    modelRef.current = modelInstance;
    scene.add(modelInstance);

    // Start animation
    setTimeout(() => {
      if (modelRef.current) {
        modelRef.current.visible = true;
        animationState.current.hasStarted = true;
        animationState.current.startTime = performance.now();
        animationState.current.isReady = true;
      }
    }, ANIMATION.delay);

    // Cleanup
    return () => {
      scene.remove(modelInstance);
      modelInstance.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.dispose();
          child.geometry.dispose();
        }
      });
    };
  }, [model, scene, gl, camera]);

  return null;
}
