import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Check, CircleCheck, Clock3, Sparkles } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/ui/job-card";
import { AnimatedHeadline } from "@/components/motion/animated-headline";
import { CountUp } from "@/components/motion/count-up";
import { InViewMotion } from "@/components/motion/in-view-motion";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import {
  Avatar,
  Card,
  Container,
  IconChip,
  Reveal,
  Section,
  SectionHeading,
  StatPill,
} from "@/components/ui/primitives";
import { jobs } from "@/lib/jobs";

const faqs = [
  {
    question: "What is Surhires?",
    answer:
      "Surhires is a hiring and job discovery platform designed to make good matches easier. We help employers meet relevant people and help job seekers find opportunities that fit their goals.",
  },
  {
    question: "Is it free to look for a job?",
    answer:
      "Yes. Job seekers can create a profile, explore roles, and apply without paying a fee.",
  },
  {
    question: "How are candidates matched with roles?",
    answer:
      "We use the role requirements, candidate skills, experience, and stated preferences to surface more relevant introductions. Employers always make the final hiring decisions.",
  },
  {
    question: "Can I see salary ranges before applying?",
    answer:
      "We encourage clear salary ranges on every listing. The roles shown on Surhires include an indicative range so you can decide whether an opportunity is right for you.",
  },
  {
    question: "How quickly can an employer get a shortlist?",
    answer:
      "Many teams receive their first relevant introductions within 48 hours after sharing a complete role brief. Timing varies with the role and the market.",
  },
  {
    question: "Which cities and work arrangements are supported?",
    answer:
      "Surhires supports opportunities across more than 40 Indian cities, as well as remote, hybrid, contract, part-time, and internship roles.",
  },
];

const testimonials = [
  {
    outcome: "Cut time-to-hire from 38 to 14 days",
    quote:
      "We stopped sorting through a mountain of applications and started having better conversations from day one.",
    initials: "AS",
    name: "Aarav Shah",
    role: "VP of People, Orbit Labs",
  },
  {
    outcome: "Found a team that values thoughtful design",
    quote:
      "The role details were clear, the process felt human, and I knew what to expect at every step.",
    initials: "PM",
    name: "Priya Menon",
    role: "Product Designer",
  },
  {
    outcome: "Built a stronger shortlist in one week",
    quote:
      "Surhires helped us meet people who understood the work and were genuinely excited about our mission.",
    initials: "RK",
    name: "Rohan Kapoor",
    role: "Founder, Goodkind",
  },
];

function HeroVisual() {
  return (
    <div
      role="group"
      aria-label="A preview of a candidate match for a product designer role"
      className="relative isolate mx-auto aspect-square w-full max-w-[32rem]"
    >
      <div className="hero-glow absolute inset-[9%] rounded-full bg-teal/10 blur-3xl" />
      <div className="absolute inset-[12%] rounded-full border border-teal/15" />
      <div className="absolute inset-[21%] rounded-full border border-dashed border-slate-300/80" />
      <div className="absolute left-[9%] top-[22%] size-3 rounded-full bg-teal" />
      <div className="absolute right-[14%] top-[34%] size-2 rounded-full bg-navy/50" />
      <Card className="float-card float-card-a absolute left-[4%] top-[23%] w-[72%] max-w-[20rem] p-5 shadow-md sm:left-[8%] sm:p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-teal">
            <Sparkles aria-hidden="true" className="size-4" />
            Great match found
          </span>
          <span className="text-xs text-slate-500">Just now</span>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Avatar initials="AM" className="size-12 border-0 bg-teal/10" />
          <div>
            <p className="weight-reserve font-display font-bold text-navy" data-text="Ananya Mehta">Ananya Mehta</p>
            <p className="text-xs text-slate-600">Senior Product Designer</p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-4 rounded-xl bg-warm-white p-3">
          <div className="relative grid size-14 shrink-0 place-items-center rounded-full border-[5px] border-teal/20">
            <span className="absolute inset-[-5px] rounded-full border-[5px] border-transparent border-t-teal border-r-teal rotate-45" />
            <span className="font-display text-xs font-bold text-navy">
              <CountUp value={92} suffix="%" accessibleText="92 percent" />
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">Role fit</p>
            <p className="mt-1 text-xs text-slate-600">Skills and goals align</p>
          </div>
          <CircleCheck aria-hidden="true" className="ml-auto size-5 text-teal" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600">Product design</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600">Figma</span>
        </div>
      </Card>

      <Card className="float-card float-card-b absolute bottom-[13%] right-[1%] w-[56%] max-w-[17rem] p-4 shadow-md sm:right-[2%] sm:p-5">
        <div className="flex items-start gap-3">
          <IconChip className="size-10">
            <BriefcaseBusiness aria-hidden="true" className="size-5" />
          </IconChip>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-600">OPEN ROLE</p>
            <p className="weight-reserve mt-1 truncate font-display text-sm font-bold text-navy" data-text="Product Designer">Product Designer</p>
            <p className="mt-1 text-xs text-slate-600">Orbit Labs · Bengaluru</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-xs">
          <span className="font-medium text-slate-600">₹24–32 LPA</span>
          <span className="text-teal">12 matches</span>
        </div>
      </Card>

      <div className="float-card float-card-c absolute right-[2%] top-[12%] flex max-w-[13rem] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-md sm:right-0">
        <IconChip className="size-9">
          <Clock3 aria-hidden="true" className="size-4" />
        </IconChip>
        <div>
          <p className="text-xs font-semibold text-navy">Interview scheduled</p>
          <p className="mt-0.5 text-[11px] text-slate-600">Tomorrow, 11:30 AM</p>
        </div>
        <Check aria-hidden="true" className="size-4 text-teal" />
      </div>

      <div className="absolute bottom-[9%] left-[5%] inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-navy shadow-sm sm:left-[2%]">
        <span className="size-2 rounded-full bg-teal" />
        48h to first shortlist
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="dot-grid hero-dot-grid relative overflow-hidden bg-warm-white">
      <Container className="relative grid items-center gap-8 py-14 sm:py-16 lg:min-h-[38rem] lg:grid-cols-2 lg:gap-8 lg:py-20">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white px-4 py-2 text-xs font-semibold text-teal shadow-sm sm:text-sm">
            <span className="size-2 rounded-full bg-teal" />
            Now hiring across 40+ cities
          </p>
          <AnimatedHeadline />
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Better work starts with better matches. Meet the people and
            opportunities that move you forward.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/employers">Hire faster</Button>
            <Button href="/jobs" variant="secondary">
              Find a job
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-3">
              <Avatar initials="AS" className="size-10 bg-teal/10" />
              <Avatar initials="PM" className="size-10 bg-slate-200" />
              <Avatar initials="RK" className="size-10 bg-warm-white" />
              <span className="inline-flex size-10 items-center justify-center rounded-full border-2 border-white bg-teal text-[10px] font-bold tabular-nums text-white">
                +2k
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600">
              Trusted by <span className="font-bold text-navy"><CountUp value={2400} suffix="+" accessibleText="2,400 plus" /></span> teams
            </p>
          </div>
        </div>
        <InViewMotion className="mx-auto w-full max-w-[32rem]">
          <HeroVisual />
        </InViewMotion>
        <div className="relative z-10 col-span-full grid grid-cols-2 gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-4 sm:divide-x sm:divide-slate-200 sm:gap-0 sm:p-7">
          <div className="sm:px-5">
            <StatPill value={<CountUp value={12000} suffix="+" accessibleText="12,000 plus" />} label="vetted candidates" />
          </div>
          <div className="sm:px-5">
            <StatPill value={<CountUp value={48} suffix="h" accessibleText="48 hours" />} label="to first shortlist" />
          </div>
          <div className="sm:px-5">
            <StatPill value={<CountUp value={40} suffix="+" accessibleText="40 plus" />} label="cities covered" />
          </div>
          <div className="sm:px-5">
            <StatPill value={<CountUp value={4.9} suffix="/5" decimals={1} accessibleText="4.9 out of 5" />} label="candidate experience" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FeaturedRoles() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Find your next move"
            title="Work that fits your next chapter."
            description="A few standout opportunities from teams building what’s next."
            className="mb-0"
          />
          <Button href="/jobs" variant="secondary" className="shrink-0">
            View all jobs
          </Button>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.slice(0, 6).map((job, index) => (
            <Reveal key={job.id} delay={(index % 3) * 60}>
              <JobCard job={job} featured />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Button href="/jobs" variant="secondary">
            View all jobs
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export function Testimonials() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Good things happen"
          title="Better work, in their own words."
          description="Real progress for teams and people finding the right fit."
          align="center"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 60}>
              <SpotlightCard className="h-full">
                <Card className="flex h-full flex-col">
                  <span aria-hidden="true" className="quote-reveal font-display text-5xl font-bold leading-none text-teal">
                    “
                  </span>
                  <h3 className="weight-reserve mt-3 font-display text-lg font-bold leading-snug text-navy" data-text={testimonial.outcome}>
                    {testimonial.outcome}
                  </h3>
                  <p className="mt-4 flex-1 leading-7 text-slate-600">
                    “{testimonial.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                    <Avatar initials={testimonial.initials} className="avatar-pulse" />
                    <div>
                      <p className="text-sm font-semibold text-navy">{testimonial.name}</p>
                      <p className="mt-0.5 text-xs text-slate-600">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function HomeFaq() {
  return (
    <Section id="faq" tone="white">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="A few good questions"
            title="Straight answers, right here."
            description="Everything you need to know to take your next step."
          />
          <Accordion items={faqs} />
          <Link
            href="/employers"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            More about how Surhires works
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
