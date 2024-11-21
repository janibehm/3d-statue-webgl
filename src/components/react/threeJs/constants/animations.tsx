// In a shared constants file
import { useRef } from "react";

export const sharedAnimation = {
  duration: 0.7,
  fadeInDuration: 10000,
  delay: 1500,
  position: {
    start: { y: -10, z: 0 },
    end: { y: -3.8, z: 0 },
  },
} as const;

export function useAnimationTime() {
  return useRef({ startTime: performance.now(), isAnimating: true });
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export const globalAnimationState = {
  isLucyInPosition: false,
  isLucyReady: false,
  isLucyMounted: false,
  subscribers: new Set<Function>(),
  setIsLucyInPosition: function (value: boolean) {
    this.isLucyInPosition = value;
    this.subscribers.forEach((callback) => callback());
  },
  subscribe: function (callback: Function) {
    this.subscribers.add(callback);
  },
  unsubscribe: function (callback: Function) {
    this.subscribers.delete(callback);
  },
};
