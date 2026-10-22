"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function GradientText({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const reducedMotion = useReducedMotion();

  return (
    <span
      ref={ref}
      className={`gradient-phrase ${reducedMotion ? "is-static" : ""}`}
    >
      <span>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 150 12"
        preserveAspectRatio="none"
        className="gradient-swoosh"
      >
        <path
          className={inView && !reducedMotion ? "is-drawn" : ""}
          d="M3 8C42 2 105 2 147 7"
          pathLength="1"
        />
      </svg>
    </span>
  );
}
