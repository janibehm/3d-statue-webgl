import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function CameraControl() {
  const { camera } = useThree();
  const scrollY = useRef(0);
  const targetScrollY = useRef(0);
  const currentAngle = useRef(0);
  const touchStart = useRef(0);

  useEffect(() => {
    let isPointerDown = false;
    let lastPointerY = 0;

    // Mouse wheel handler
    const handleWheel = (event: WheelEvent) => {
      targetScrollY.current += event.deltaY * 0.0007;
      targetScrollY.current = Math.max(0, Math.min(1, targetScrollY.current));
    };

    // Touch handlers
    const handleTouchStart = (event: TouchEvent) => {
      touchStart.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const deltaY = touchStart.current - event.touches[0].clientY;
      targetScrollY.current += deltaY * 0.005; // Adjust sensitivity here
      targetScrollY.current = Math.max(0, Math.min(1, targetScrollY.current));
      touchStart.current = event.touches[0].clientY;
    };

    // Add pointer event handlers
    const handlePointerDown = (event: PointerEvent) => {
      isPointerDown = true;
      lastPointerY = event.clientY;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isPointerDown) return;

      const deltaY = lastPointerY - event.clientY;
      targetScrollY.current += deltaY * 0.005; // Same sensitivity as touch
      targetScrollY.current = Math.max(0, Math.min(1, targetScrollY.current));
      lastPointerY = event.clientY;
    };

    const handlePointerUp = () => {
      isPointerDown = false;
    };

    // Add all event listeners
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointerleave", handlePointerUp);

    // Cleanup
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerleave", handlePointerUp);
    };
  }, []);

  useFrame(() => {
    // Smooth scroll interpolation
    const scrollEasing = 0.05; // Adjust this value to change scroll smoothness (0.01 to 0.1)
    scrollY.current += (targetScrollY.current - scrollY.current) * scrollEasing;

    const minRadius = 8; // Starting (closest) distance
    const maxRadius = 14; // Ending (farthest) distance
    const currentRadius = minRadius + scrollY.current * (maxRadius - minRadius);

    const targetAngle = -scrollY.current * Math.PI * 2;

    // Smooth camera rotation
    const rotationEasing = 0.1; // Adjust this value to change rotation smoothness (0.01 to 0.1)
    currentAngle.current += (targetAngle - currentAngle.current) * rotationEasing;

    // Calculate camera position with dynamic radius
    camera.position.x = Math.sin(currentAngle.current) * currentRadius;
    camera.position.z = Math.cos(currentAngle.current) * currentRadius;

    // Adjust camera height
    const minHeight = 5; // Starting height
    const maxHeight = 8; // Ending height
    const targetY = minHeight + scrollY.current * (maxHeight - minHeight);
    camera.position.y += (targetY - camera.position.y) * 0.05;

    // Adjust look-at point height
    const lookAtY = 2.5; // Slightly increased from 2

    // Allow manual rotation to override the scroll-based position
    // but keep updating the base position from scroll
    const manualRotation = camera.position.clone();
    const scrollBasedX = Math.sin(currentAngle.current) * currentRadius;
    const scrollBasedZ = Math.cos(currentAngle.current) * currentRadius;

    // Only update if the position significantly differs from the scroll-based position
    if (Math.abs(manualRotation.x - scrollBasedX) < 0.1) {
      camera.position.x = scrollBasedX;
    }
    if (Math.abs(manualRotation.z - scrollBasedZ) < 0.1) {
      camera.position.z = scrollBasedZ;
    }

    camera.lookAt(0.2, lookAtY, 0);
  });

  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableRotate={false}
      enableDamping={false}
      makeDefault
    />
  );
}
