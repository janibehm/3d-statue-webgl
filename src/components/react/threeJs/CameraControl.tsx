import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

export function CameraControl() {
  const { camera } = useThree();
  const scrollY = useRef(0);
  const targetScrollY = useRef(0);
  const currentAngle = useRef(0);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      targetScrollY.current += event.deltaY * 0.001;
      targetScrollY.current = Math.max(0, Math.min(1, targetScrollY.current));
    };

    // Use { passive: false } to allow preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useFrame(() => {
    // Smooth scroll interpolation
    const scrollEasing = 0.05; // Adjust this value to change scroll smoothness (0.01 to 0.1)
    scrollY.current += (targetScrollY.current - scrollY.current) * scrollEasing;

    const radius = 4; // Distance from center
    const targetAngle = -scrollY.current * Math.PI * 2; // Negative for opposite direction

    // Smooth camera rotation
    const rotationEasing = 0.05; // Adjust this value to change rotation smoothness (0.01 to 0.1)
    currentAngle.current += (targetAngle - currentAngle.current) * rotationEasing;

    // Calculate camera position
    camera.position.x = Math.sin(currentAngle.current) * radius;
    camera.position.z = Math.cos(currentAngle.current) * radius;

    /*   const targetY = 2 + scrollY.current * 3;
    camera.position.y += (targetY - camera.position.y) * 0.05; */

    // Create a look-at point that's slightly above the center
    const lookAtY = 2; // Adjust this value to change the tilt angle (higher = more tilt up)
    camera.lookAt(0, lookAtY, 0);
  });

  return null;
}
