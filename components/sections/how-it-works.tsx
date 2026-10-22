"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Card, Container, Reveal, Section, SectionHeading } from "@/components/ui/primitives";
import { SpotlightCard } from "@/components/motion/spotlight-card";

const stepsByAudience = {
  employers: [
    {
      title: "Tell us who you need",
      text: "Share the role, the skills that matter, and what a great teammate looks like.",
    },
    {
      title: "Meet thoughtful matches",
      text: "Get a shortlist of people whose experience and goals fit the opportunity.",
    },
    {
      title: "Make your next great hire",
      text: "Spend less time sorting applications and more time having good conversations.",
    },
  ],
  seekers: [
    {
      title: "Set up your profile",
      text: "Show what you’re great at, what you’re looking for, and where you want to grow.",
    },
    {
      title: "Find roles that fit",
      text: "Explore real opportunities with clear details, salary ranges, and expectations.",
    },
    {
      title: "Meet your next team",
      text: "Apply with confidence and connect directly with teams ready to hear from you.",
    },
  ],
};

export function HowItWorks() {
  const [audience, setAudience] = useState<"employers" | "seekers">("employers");
  const employerTab = useRef<HTMLButtonElement>(null);
  const seekerTab = useRef<HTMLButtonElement>(null);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const nextAudience = audience === "employers" ? "seekers" : "employers";
    setAudience(nextAudience);
    (nextAudience === "employers" ? employerTab : seekerTab).current?.focus();
  }

  return (
    <Section id="how-it-works" tone="white">
      <Container>
        <SectionHeading
          eyebrow="A better way forward"
          title="Good matches. Fewer hoops."
          description="A clear, human process that gets the right people talking sooner."
          align="center"
        />
        <div
          role="tablist"
          aria-label="Choose who you are"
          className="tab-switch relative mx-auto mb-9 flex w-fit rounded-full border border-slate-200 bg-warm-white p-1"
        >
          <span
            aria-hidden="true"
            className={`tab-switch-indicator ${audience === "seekers" ? "is-seekers" : ""}`}
          />
          <button
            ref={employerTab}
            id="how-tab-employers"
            type="button"
            role="tab"
            aria-selected={audience === "employers"}
            aria-controls="how-step-panel"
            tabIndex={audience === "employers" ? 0 : -1}
            onKeyDown={handleTabKeyDown}
            onClick={() => setAudience("employers")}
            className={`tab-switch-button ${audience === "employers" ? "is-active" : ""}`}
          >
            For employers
          </button>
          <button
            ref={seekerTab}
            id="how-tab-seekers"
            type="button"
            role="tab"
            aria-selected={audience === "seekers"}
            aria-controls="how-step-panel"
            tabIndex={audience === "seekers" ? 0 : -1}
            onKeyDown={handleTabKeyDown}
            onClick={() => setAudience("seekers")}
            className={`tab-switch-button ${audience === "seekers" ? "is-active" : ""}`}
          >
            For job seekers
          </button>
        </div>
        <div
          id="how-step-panel"
          role="tabpanel"
          aria-labelledby={audience === "employers" ? "how-tab-employers" : "how-tab-seekers"}
          tabIndex={0}
          key={audience}
          className="tab-panel-content tab-panel relative grid gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
        >
          <div
            aria-hidden="true"
            className="step-connector absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-slate-300 md:block"
          />
          {stepsByAudience[audience].map((step, index) => (
            <Reveal key={`${audience}-${step.title}`} delay={index * 60}>
              <SpotlightCard className="h-full">
                <Card interactive className="relative h-full border-transparent bg-warm-white shadow-none">
                  <span className="font-display text-5xl font-bold leading-none text-teal/30">
                    0{index + 1}
                  </span>
                  <h3 className="weight-reserve mt-6 font-display text-xl font-bold text-navy" data-text={step.title}>
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
                </Card>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
