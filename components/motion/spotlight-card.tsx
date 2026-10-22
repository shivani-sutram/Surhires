"use client";

import type { ReactNode } from "react";
import { usePointerGlow } from "@/hooks/use-pointer-glow";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, onPointerMove, onPointerLeave } = usePointerGlow();
  return (
    <div
      ref={ref}
      className={cn("spotlight-card", className)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </div>
  );
}
