"use client";

import { useEffect, useMemo, useState } from "react";
import { COUNT_UP_DURATION_MS } from "@/lib/motion";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CountUp({
  value,
  accessibleText,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  accessibleText: string;
  suffix?: string;
  decimals?: number;
}) {
  const [current, setCurrent] = useState(value);
  const { ref, inView } = useInView<HTMLSpanElement>();
  const reducedMotion = useReducedMotion();
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals],
  );

  useEffect(() => {
    if (!inView || reducedMotion) return;

    let frame = 0;
    let startTime: number | undefined;
    const animate = (now: number) => {
      startTime ??= now;
      const progress = Math.min((now - startTime) / COUNT_UP_DURATION_MS, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(value * eased);
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(() => {
      setCurrent(0);
      frame = window.requestAnimationFrame(animate);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [inView, reducedMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{formatter.format(current)}{suffix}</span>
      <span className="sr-only">{accessibleText} ({formatter.format(value)}{suffix})</span>
    </span>
  );
}
