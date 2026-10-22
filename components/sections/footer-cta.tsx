import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { InViewMotion } from "@/components/motion/in-view-motion";

export function FooterCta() {
  return (
    <InViewMotion>
      <section className="aurora-background dot-grid-dark relative isolate overflow-hidden bg-navy py-14 sm:py-16 lg:py-20">
        <Container className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <SectionHeading
            eyebrow="Ready for what’s next?"
            title="Make your next move a great one."
            description="Better matches start with a simpler, more human way to connect."
            light
            className="mb-0 max-w-2xl"
          />
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/employers#post-a-job" variant="onDark">
              Hire faster
            </Button>
            <Button
              href="/jobs"
              variant="secondary"
              className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10"
            >
              Find a job
            </Button>
          </div>
        </Container>
      </section>
    </InViewMotion>
  );
}
