import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
  showArrow?: boolean;
  "aria-label"?: string;
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  tabIndex?: number;
};

const variants = {
  primary:
    "btn-primary relative isolate overflow-hidden border border-accent bg-accent text-accent-on transition-[transform,background-color,border-color,box-shadow] hover:-translate-y-0.5 hover:bg-surface-raised hover:shadow-md active:scale-[0.97]",
  secondary:
    "btn-secondary relative isolate overflow-hidden border border-border-strong bg-surface text-text transition-[transform,border-color,box-shadow] hover:border-text active:scale-[0.97]",
  ghost:
    "border border-transparent bg-transparent text-text hover:bg-border/60 active:scale-[0.97]",
  onDark:
    "btn-on-dark border border-surface bg-surface text-text hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97]",
};

const sizes = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-sm sm:text-base",
  lg: "min-h-14 px-6 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  type = "button",
  disabled = false,
  onClick,
  onLinkClick,
  showArrow = variant === "primary",
  ...props
}: ButtonProps) {
  const classNames = cn(
    "group inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[transform,background-color,border-color,box-shadow,color] duration-base ease-brand-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-subtle disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowRight
          aria-hidden="true"
        className="btn-arrow relative z-10 size-4 shrink-0 transition-transform duration-fast group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        className={classNames}
        href={href}
        aria-disabled={disabled}
        onClick={onLinkClick}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
