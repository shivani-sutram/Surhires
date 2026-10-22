"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ROTATING_WORD_INTERVAL_MS } from "@/lib/motion";

const words = ["faster", "smarter", "better"] as const;

export function RotatingWord() {
  const [index, setIndex] = useState(0);
  const { ref, inView } = useInView<HTMLSpanElement>();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, ROTATING_WORD_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [inView, reducedMotion]);

  return (
    <span
      ref={ref}
      aria-live="off"
      className="rotating-word"
      style={{ "--word-index": index } as CSSProperties}
    >
      {words.map((word, wordIndex) => (
        <span
          key={word}
          aria-hidden="true"
          className={`rotating-word-item ${wordIndex === index ? "is-current" : ""}`}
        >
          {word}
        </span>
      ))}
      <span className="sr-only">{words[0]}</span>
    </span>
  );
}
