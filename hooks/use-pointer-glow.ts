"use client";

import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function usePointerGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (
      reducedMotion ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };
    if (frame.current !== null) return;
    frame.current = window.requestAnimationFrame(() => {
      const element = ref.current;
      if (element) {
        element.style.setProperty("--mx", `${pointer.current.x}%`);
        element.style.setProperty("--my", `${pointer.current.y}%`);
      }
      frame.current = null;
    });
  }, [reducedMotion]);

  const onPointerLeave = useCallback(() => {
    if (frame.current !== null) {
      window.cancelAnimationFrame(frame.current);
      frame.current = null;
    }
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    },
    [],
  );

  return { ref, onPointerMove, onPointerLeave };
}
