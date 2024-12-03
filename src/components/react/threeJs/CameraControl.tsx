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
    const minRadius = 8;
    const minHeight = 5;

    // Set initial camera position
    camera.position.set(0, minHeight, minRadius);
    camera.lookAt(0.2, 2.5, 0);
  }, [camera]);

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
    const scrollEasing = 0.05;
    scrollY.current += (targetScrollY.current - scrollY.current) * scrollEasing;

    const closeRadius = 4; // Radius for first 180°
    const farRadius = 8; // Maximum radius for second 180°

    // Calculate rotation and radius
    const rotationProgress = scrollY.current * Math.PI * 2; // 0 to 2π
    const isFirstHalf = rotationProgress < Math.PI;

    // Use close radius for first 180°, then gradually move out
    const currentRadius = isFirstHalf
      ? closeRadius
      : closeRadius + ((rotationProgress - Math.PI) / Math.PI) * (farRadius - closeRadius);

    const targetAngle = -rotationProgress;
    const rotationEasing = 0.1;
    currentAngle.current += (targetAngle - currentAngle.current) * rotationEasing;

    // Calculate camera position
    camera.position.x = Math.sin(currentAngle.current) * currentRadius;
    camera.position.z = Math.cos(currentAngle.current) * currentRadius;

    // Steady upward movement
    const minHeight = 5;
    const maxHeight = 8;
    const heightProgress = scrollY.current;
    const targetY = minHeight + (maxHeight - minHeight) * heightProgress;
    camera.position.y += (targetY - camera.position.y) * 0.05;

    // Rest of the code remains the same...
    const lookAtY = 2.5;
    const manualRotation = camera.position.clone();
    const scrollBasedX = Math.sin(currentAngle.current) * currentRadius;
    const scrollBasedZ = Math.cos(currentAngle.current) * currentRadius;

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
