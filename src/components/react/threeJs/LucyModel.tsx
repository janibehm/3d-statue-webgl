import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { globalAnimationState } from "./hooks/globalAnimationState";
import { easeOutCubic } from "./hooks/easeOutCubix";

// Preload model with draco compression
useGLTF.preload("/models/Lucy-transformed.glb");

export function LucyModel() {
  const { scene: model } = useGLTF("/models/Lucy-transformed.glb", true);
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>();
  const animationRef = useRef({
    startTime: 0,
    isAnimating: true,
    opacity: 0,
  });
  const [isModelReady, setIsModelReady] = useState(false);
  const hasStartedAnimation = useRef(false);

  // Position and animation constants
  const POSITION = {
    start: { y: 5, z: -30 },
    end: { y: -0.5, z: 0 },
  };
  const ANIMATION = {
    duration: 2,
    fadeInDuration: 0.5,
    delay: 100, // ms delay before animation starts
  };

  useFrame((state, delta) => {
    if (!modelRef.current || !isModelReady || !hasStartedAnimation.current) return;

    const elapsed = (performance.now() - animationRef.current.startTime) / 1000;

    // Handle position animation
    if (animationRef.current.isAnimating) {
      const t = Math.min(elapsed / ANIMATION.duration, 1);
      const eased = easeOutCubic(t);

      // Smooth position interpolation
      modelRef.current.position.y = THREE.MathUtils.lerp(POSITION.start.y, POSITION.end.y, eased);
      modelRef.current.position.z = THREE.MathUtils.lerp(POSITION.start.z, POSITION.end.z, eased);

      // Handle fade in
      const fadeT = Math.min(elapsed / ANIMATION.fadeInDuration, 1);
      animationRef.current.opacity = fadeT;

      // Update materials opacity
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          child.material.opacity = fadeT;
          child.material.transparent = fadeT < 1;
        }
      });

      if (t === 1) {
        animationRef.current.isAnimating = false;
        globalAnimationState.isLucyInPosition = true;
      }
    }
  });

  useEffect(() => {
    if (!model || hasStartedAnimation.current) return;

    const modelInstance = model.clone();
    modelInstance.visible = false;
    modelInstance.scale.set(0.0024, 0.0024, 0.0024);
    modelInstance.rotation.x = Math.PI / 2;
    modelInstance.position.set(0, POSITION.start.y, POSITION.start.z);

    // Optimize material settings
    modelInstance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); // Clone material to avoid sharing
        child.material.transparent = true;
        child.material.opacity = 0;
        child.material.metalness = 0.2;
        child.material.roughness = 0.5;
        // Enable frustum culling
        child.frustumCulled = true;

        if (child.geometry) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();
        }
      }
    });

    // Pre-compile for better initial performance
    gl.compile(modelInstance, camera);

    modelRef.current = modelInstance;
    scene.add(modelInstance);

    // Start animation with a slight delay
    setTimeout(() => {
      if (modelRef.current) {
        modelRef.current.visible = true;
        hasStartedAnimation.current = true;
        animationRef.current.startTime = performance.now();
        setIsModelReady(true);
      }
    }, ANIMATION.delay);

    return () => {
      scene.remove(modelInstance);
      // Clean up materials
      modelInstance.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.dispose();
        }
      });
    };
  }, [model, scene, gl, camera]);

  return null;
}
