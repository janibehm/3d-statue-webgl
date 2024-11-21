import { useRef, useEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useProgress } from "@react-three/drei";
import { useSpring } from "@react-spring/three";

const MODEL_SCALE = 0.0028;

// Preload with low priority and draco compression
useGLTF.preload("/models/Lucy.glb", true);

interface LucyModelProps {
  onLoad?: () => void;
}

export function LucyModel({ onLoad }: LucyModelProps) {
  const { scene: model } = useGLTF("/models/Lucy.glb", true);
  const { scene, gl, camera } = useThree();
  const modelRef = useRef<THREE.Group>(null);
  const { progress } = useProgress();

  const [springs] = useSpring(() => ({
    from: { position: [0, 6, 0], opacity: 0 },
    to: { position: [0, -0.6, 0], opacity: 1 },
    config: { duration: 1000 },
    delay: 500
  }));

  const setupModel = useMemo(() => {
    if (!model) return null;

    const modelInstance = model.clone();
    modelInstance.visible = false;
    modelInstance.scale.setScalar(MODEL_SCALE);
    modelInstance.rotation.x = Math.PI / 2;

    modelInstance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.frustumCulled = true;
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = 0;
        }
      }
    });

    return modelInstance;
  }, [model]);

  // Add hover animation parameters
  const hoverSpeed = 0.01;
  const hoverAmplitude = 0.1;
  const timeRef = useRef(0);

  useFrame((state) => {
    if (!setupModel) return;
    const position = springs.position.get();
    
    // Add hovering motion
    timeRef.current += hoverSpeed;
    const hoverOffset = Math.sin(timeRef.current) * hoverAmplitude;
    
    setupModel.position.set(
      position[0],
      position[1] + hoverOffset,
      position[2]
    );
    
    setupModel.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material.opacity = springs.opacity.get();
        child.material.transparent = true;
      }
    });
  });

  useEffect(() => {
    if (!setupModel || progress !== 100) return;

    gl.compile(setupModel, camera);
    scene.add(setupModel);
    
    onLoad?.();

    // Fade in animation
    const duration = 5000;
    const startTime = performance.now();

    const fadeIn = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setupModel.visible = true;
      setupModel.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          child.material.opacity = progress;
        }
      });

      if (progress < 1) {
        requestAnimationFrame(fadeIn);
      } 
    };

    requestAnimationFrame(fadeIn);

    return () => {
      scene.remove(setupModel);
      setupModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    };
  }, [setupModel, scene, gl, camera, progress, onLoad]);

  return null;
}
