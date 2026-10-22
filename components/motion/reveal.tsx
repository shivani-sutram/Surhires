import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${Math.min(delay, 420)}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
