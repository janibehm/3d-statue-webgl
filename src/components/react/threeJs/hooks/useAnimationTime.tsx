import { useRef } from "react";

export function useAnimationTime() {
  return useRef({ startTime: performance.now(), isAnimating: true });
}
