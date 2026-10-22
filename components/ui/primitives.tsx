import type { HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
export { Reveal } from "@/components/motion/reveal";

export function Container({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  tone = "warm",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "warm" | "white";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        tone === "white" ? "bg-white" : "bg-warm-white",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Card({
  children,
  className,
  interactive = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        "group/card transition-[transform,border-color,box-shadow] duration-base ease-brand-out hover:-translate-y-1 hover:border-teal/30 hover:shadow-md",
        interactive && "card-interactive",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-warm-white px-3 py-1 text-xs font-medium text-slate-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function IconChip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "card-icon-chip inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatPill({
  value,
  label,
}: {
  value: ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
        {value}
      </span>
      <span className="text-sm text-slate-600">{label}</span>
    </div>
  );
}

export function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-white bg-teal/10 font-display text-sm font-bold text-teal",
        className,
      )}
    >
      {initials}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl sm:mb-12",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className={cn("section-heading__eyebrow mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]", light ? "text-teal-bright" : "text-teal")}>
        <span aria-hidden="true" className={cn("eyebrow-dot size-1.5 rounded-full", light ? "bg-teal-bright" : "bg-teal")} />
        {eyebrow}
      </p>
      <h2 className={cn("section-heading__title font-display text-3xl font-bold tracking-tight sm:text-4xl", light ? "text-white" : "text-navy")}>
        {title}
      </h2>
      {description && (
        <p className={cn("section-heading__description mt-4 text-base leading-7 sm:text-lg", light ? "text-slate-300" : "text-slate-600")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function CompanyLogo({
  name,
  short,
  className,
}: {
  name: string;
  short: string;
  className?: string;
}) {
  return (
    <span
      aria-label={`${name} logo`}
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-warm-white font-display text-lg font-bold text-navy",
        className,
      )}
    >
      {short}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  note,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb: string;
  note?: string;
}) {
  return (
    <section className="dot-grid relative isolate overflow-hidden border-b border-slate-200 bg-warm-white py-14 sm:py-16 lg:py-20">
      <span aria-hidden="true" className="page-header-glow" />
      <Container className="relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <ol className="flex items-center gap-2 text-slate-600">
            <li>
              <Link className="rounded-sm hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-navy">
              {breadcrumb}
            </li>
          </ol>
        </nav>
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            <span aria-hidden="true" className="eyebrow-dot size-1.5 rounded-full bg-teal" />
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {description}
          </p>
          {note && (
            <p className="mt-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              {note}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
