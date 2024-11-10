import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { globalAnimationState } from "./hooks/globalAnimationState";
import { easeOutCubic } from "./hooks/easeOutCubix";
import { useSpring } from "@react-spring/three";

// Constants outside component to prevent recreation
const POSITION = {
  start: { y: 5, z: 0 },
  end: { y: -0.5, z: 0 },
} as const;

const ANIMATION = {
  duration: 1.5,
  fadeInDuration: 1.2,
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

  // Replace animation state with spring
  const [springs] = useSpring(() => ({
    from: {
      position: [0, POSITION.start.y, POSITION.start.z],
      opacity: 0,
    },
    to: {
      position: [0, POSITION.end.y, POSITION.end.z],
      opacity: 1,
    },
    config: { duration: ANIMATION.duration * 1000 },
    delay: ANIMATION.delay,
    onChange: () => {
      if (springs.position.get()[1] === POSITION.end.y) {
        globalAnimationState.isLucyInPosition = true;
      }
    },
  }));

  useEffect(() => {
    if (!model) return;

    const modelInstance = model.clone();
    modelInstance.visible = true;
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.rotation.x = Math.PI / 2;

    // Optimize materials and geometry once
    modelInstance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = child.material.clone();
        Object.assign(child.material, MATERIAL_SETTINGS, {
          transparent: true,
        });
        child.frustumCulled = true;

        if (child.geometry && !child.geometry.boundingSphere) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();
        }
      }
    });

    gl.compile(modelInstance, camera);
    modelRef.current = modelInstance;
    scene.add(modelInstance);

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

  // Update position and opacity using springs
  useFrame(() => {
    if (!modelRef.current) return;

    const position = springs.position.get();
    modelRef.current.position.set(position[0], position[1], position[2]);

    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.opacity = springs.opacity.get();
        child.material.transparent = child.material.opacity < 1;
      }
    });
  });

  return null;
}
