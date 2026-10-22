import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { InViewMotion } from "@/components/motion/in-view-motion";

const logos = [
  ["NORTHSTAR", "Technology"],
  ["orbit", "Product"],
  ["goodkind", "Wellness"],
  ["FINSTACK", "Finance"],
  ["morrow", "Creative"],
  ["kindred", "Health"],
];

function LogoSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className={cn("logo-set", duplicate && "logo-set-copy")} aria-hidden={duplicate || undefined}>
      {logos.map(([name, descriptor]) => (
        <div key={name} className="group flex min-h-24 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-center transition duration-base hover:border-teal/30 hover:shadow-sm">
          <span className="font-display text-lg font-extrabold tracking-tight text-slate-500 transition-colors duration-base group-hover:text-navy">
            {name}
          </span>
          <span className="mt-1 text-xs text-slate-500">{descriptor}</span>
        </div>
      ))}
    </div>
  );
}

export function EmployerLogoMarquee() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="Good company"
          title="Teams doing meaningful work."
          description="A growing community of thoughtful teams and ambitious people."
          align="center"
        />
        <InViewMotion>
          <div className="logo-marquee">
            <div className="logo-marquee-track">
              <LogoSet />
              <LogoSet duplicate />
            </div>
          </div>
        </InViewMotion>
      </Container>
    </Section>
  );
}
