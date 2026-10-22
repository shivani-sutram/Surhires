import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${light ? "text-white" : "text-navy"}`}
      aria-label="Surhires home"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="size-8 shrink-0"
        fill="none"
      >
        <rect x="1" y="1" width="30" height="30" rx="10" fill="currentColor" className="text-teal" />
        <path
          d="M9 18.5 14 23l9-13"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-xl font-extrabold tracking-tight">
        Surhires<span className={light ? "text-teal-bright" : "text-teal"}>.</span>
      </span>
    </Link>
  );
}
