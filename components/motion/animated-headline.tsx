import type { CSSProperties } from "react";
import { GradientText } from "@/components/motion/gradient-text";
import { RotatingWord } from "@/components/motion/rotating-word";
import { HERO_WORD_STAGGER_MS } from "@/lib/motion";

function wordDelay(delay: number) {
  return { "--word-delay": `${delay * HERO_WORD_STAGGER_MS}ms` } as CSSProperties;
}

export function AnimatedHeadline() {
  return (
    <h1
      aria-label="Hire faster. Get hired sooner."
      className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-text sm:text-5xl lg:text-6xl"
    >
      <span aria-hidden="true" className="hero-word" style={wordDelay(0)}>Hire</span>{" "}
      <span aria-hidden="true" className="hero-word" style={wordDelay(1)}>
        <RotatingWord />
      </span>
      <span aria-hidden="true" className="hero-word" style={wordDelay(2)}>.</span>
      <br />
      <span aria-hidden="true" className="hero-word" style={wordDelay(3)}>Get</span>{" "}
      <span aria-hidden="true" className="hero-word" style={wordDelay(4)}>hired</span>{" "}
      <span aria-hidden="true" className="hero-word" style={wordDelay(5)}>
        <GradientText>sooner.</GradientText>
      </span>
    </h1>
  );
}
