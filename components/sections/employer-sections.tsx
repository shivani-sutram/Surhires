"use client";

import { useState, type CSSProperties, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { AlertCircle, Check, CircleCheck, Clock3, HeartHandshake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, Card, Container, IconChip, Reveal, Section, SectionHeading } from "@/components/ui/primitives";
import { InViewMotion } from "@/components/motion/in-view-motion";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import type { JobType } from "@/lib/jobs";

type Plan = "Starter" | "Growth" | "Scale";
type FormFields = {
  companyName: string;
  workEmail: string;
  jobTitle: string;
  location: string;
  jobType: JobType | "";
  salaryRange: string;
  description: string;
  consent: boolean;
};
type FormErrors = Partial<Record<keyof FormFields, string>>;

const emptyFields: FormFields = {
  companyName: "",
  workEmail: "",
  jobTitle: "",
  location: "",
  jobType: "",
  salaryRange: "",
  description: "",
  consent: false,
};

const plans: {
  name: Plan;
  description: string;
  monthlyPrice: number;
  features: string[];
  popular?: boolean;
}[] = [
  {
    name: "Starter",
    description: "For a focused first hire.",
    monthlyPrice: 4999,
    features: [
      "1 active job listing",
      "Curated candidate matches",
      "Basic applicant insights",
      "Email support",
      "Role performance summary",
      "Easy listing edits",
    ],
  },
  {
    name: "Growth",
    description: "For teams ready to build momentum.",
    monthlyPrice: 11999,
    popular: true,
    features: [
      "5 active job listings",
      "Priority candidate matching",
      "Advanced applicant insights",
      "Dedicated hiring support",
      "Team collaboration tools",
      "Featured role placement",
    ],
  },
  {
    name: "Scale",
    description: "For ambitious, growing teams.",
    monthlyPrice: 29999,
    features: [
      "Unlimited active listings",
      "Custom matching support",
      "Advanced hiring analytics",
      "Dedicated account partner",
      "Branded company profile",
      "Quarterly hiring review",
    ],
  },
];

const benefits = [
  {
    icon: HeartHandshake,
    title: "People-first matching",
    text: "Meet candidates for what they can bring next, not just a keyword match.",
  },
  {
    icon: Clock3,
    title: "Less time to shortlist",
    text: "Spend less of your week screening and more time with the right people.",
  },
  {
    icon: ShieldCheck,
    title: "Clear, honest hiring",
    text: "Set salary and expectations up front to build trust from the first click.",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function validateFields(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.companyName.trim()) errors.companyName = "Enter your company name.";
  if (!fields.workEmail.trim()) {
    errors.workEmail = "Enter your work email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.workEmail.trim())) {
    errors.workEmail = "Enter a valid email address.";
  }
  if (!fields.jobTitle.trim()) errors.jobTitle = "Enter the job title.";
  if (!fields.location.trim()) errors.location = "Enter a job location.";
  if (!fields.jobType) errors.jobType = "Choose a job type.";
  if (!fields.salaryRange.trim()) errors.salaryRange = "Add the salary range.";
  if (!fields.description.trim()) errors.description = "Add a short role description.";
  if (!fields.consent) errors.consent = "Please agree before submitting.";
  return errors;
}

function FormField({
  id,
  label,
  error,
  helper,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  helper?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-navy">
        {label}
      </label>
      {children}
      {helper && (
        <p id={`${id}-help`} className="mt-1.5 text-xs leading-5 text-slate-600">
          {helper}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="error-message mt-1.5 flex items-start gap-1.5 text-sm text-red-700">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function FieldInput({
  id,
  error,
  helper,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  helper?: string;
}) {
  return (
    <input
      id={id}
      aria-invalid={Boolean(error)}
      aria-describedby={[helper ? `${id}-help` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined}
      className={`field-input min-h-12 w-full rounded-xl border bg-white px-3 text-sm text-navy outline-none placeholder:text-slate-500 ${error ? "field-shake border-red-700" : "border-slate-200"} ${className ?? ""}`}
      {...props}
    />
  );
}

export function EmployerSections() {
  const [annual, setAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan>("Growth");
  const [fields, setFields] = useState<FormFields>(emptyFields);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<FormFields | null>(null);

  function choosePlan(plan: Plan) {
    setSelectedPlan(plan);
    const form = document.getElementById("post-a-job");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    form?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }

  function updateField<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateFields(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidKey = Object.keys(nextErrors)[0];
      const fieldIds: Record<string, string> = {
        companyName: "company-name",
        workEmail: "work-email",
        jobTitle: "job-title",
        location: "location",
        jobType: "job-type",
        salaryRange: "salary-range",
        description: "description",
        consent: "consent",
      };
      requestAnimationFrame(() => {
        document.getElementById(fieldIds[firstInvalidKey])?.focus();
      });
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted({ ...fields });
    setIsSubmitting(false);
  }

  function postAnotherJob() {
    setFields(emptyFields);
    setErrors({});
    setSubmitted(null);
    document.getElementById("company-name")?.focus();
  }

  const fieldClass =
    "field-input min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-navy outline-none";

  return (
    <>
      <Section id="pricing" tone="white">
        <Container>
          <SectionHeading
            eyebrow="Plans for every team"
            title="A little help with your next great hire."
            description="Simple, transparent plans that grow with your hiring needs."
            align="center"
          />
          <div className="mb-8 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <span className="text-sm font-medium text-slate-600">Billing:</span>
            <div className="billing-toggle relative flex rounded-full border border-slate-200 bg-warm-white p-1">
              <span
                aria-hidden="true"
                className={`billing-toggle-indicator ${annual ? "is-annual" : ""}`}
              />
              <button
                type="button"
                aria-pressed={!annual}
                onClick={() => setAnnual(false)}
                className={`billing-toggle-option ${!annual ? "is-active" : ""}`}
              >
                Monthly
              </button>
              <button
                type="button"
                aria-pressed={annual}
                onClick={() => setAnnual(true)}
                className={`billing-toggle-option ${annual ? "is-active" : ""}`}
              >
                Annual <span className="ml-1 text-teal">Save 20%</span>
              </button>
            </div>
            <span className="text-xs text-slate-600">Billed {annual ? "annually" : "monthly"} · Prices in INR</span>
          </div>
          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const price = Math.round(plan.monthlyPrice * (annual ? 0.8 : 1));
              const featured = Boolean(plan.popular);
              return (
                <Reveal key={plan.name} delay={index * 60} className="h-full">
                  <InViewMotion className="h-full">
                    <SpotlightCard className={`h-full ${featured ? "featured-border" : ""}`}>
                      <Card
                        interactive
                        className={`relative flex h-full flex-col p-6 sm:p-7 ${featured ? "featured-pricing-card border-navy bg-navy text-white shadow-xl lg:-translate-y-2" : ""}`}
                      >
                    {featured && (
                      <span className="absolute right-5 top-5 rounded-full bg-teal-bright px-3 py-1 text-xs font-bold text-navy">
                        Most popular
                      </span>
                    )}
                    <p className={`font-display text-xl font-bold ${featured ? "text-white" : "text-navy"}`}>
                      {plan.name}
                    </p>
                    <p className={`mt-2 min-h-10 text-sm leading-6 ${featured ? "text-slate-300" : "text-slate-600"}`}>
                      {plan.description}
                    </p>
                    <p className="mt-6">
                      <span
                        key={`${plan.name}-${annual ? "annual" : "monthly"}`}
                        aria-live="off"
                        className={`price-roll font-display text-3xl font-extrabold tracking-tight tabular-nums sm:text-4xl ${featured ? "text-white" : "text-navy"}`}
                      >
                        {formatPrice(price)}
                      </span>
                      <span className={`ml-1 text-sm ${featured ? "text-slate-300" : "text-slate-600"}`}>/month</span>
                    </p>
                    <p className={`mt-1 text-xs ${featured ? "text-slate-300" : "text-slate-600"}`}>
                      {annual ? `${formatPrice(price * 12)} billed yearly` : "Billed monthly"}
                    </p>
                    <Button
                      type="button"
                      variant={featured ? "onDark" : "secondary"}
                      className="mt-6 w-full"
                      onClick={() => choosePlan(plan.name)}
                    >
                      Choose {plan.name}
                    </Button>
                    <ul className="mt-6 space-y-3 border-t border-slate-200/30 pt-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className={`flex items-start gap-2.5 text-sm leading-6 ${featured ? "text-white" : "text-slate-600"}`}>
                          <Check aria-hidden="true" className={`mt-1 size-4 shrink-0 ${featured ? "text-teal-bright" : "text-teal"}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                      </Card>
                    </SpotlightCard>
                  </InViewMotion>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 text-center text-xs text-slate-600">
            Plan selection is a request for a conversation. No payment is collected on this demo site.
          </p>
        </Container>
      </Section>

      <Section id="why-surhires">
        <Container>
          <SectionHeading
            eyebrow="Why Surhires"
            title="Hiring can feel more human."
            description="Clear expectations and relevant introductions make every conversation count."
            align="center"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={benefit.title} delay={index * 60}>
                  <SpotlightCard className="h-full">
                    <Card className="h-full">
                      <IconChip className="card-icon-chip"><Icon aria-hidden="true" className="size-5" /></IconChip>
                      <h3 className="weight-reserve mt-4 font-display text-lg font-bold text-navy" data-text={benefit.title}>{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.text}</p>
                    </Card>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section id="post-a-job" tone="white">
        <Container>
          <SectionHeading
            eyebrow="Start a conversation"
            title="Tell us about your next role."
            description="Share a few details and our team will help you find your next great teammate."
          />
          <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <div>
              <h3 className="font-display text-xl font-bold text-navy">A simpler way to hire</h3>
              <ul className="mt-5 space-y-4">
                {[
                  "A shortlist shaped around your real role requirements",
                  "Clear salary expectations from the first conversation",
                  "Helpful support from people who understand hiring",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                    <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-teal" />
                    {item}
                  </li>
                ))}
              </ul>
              <Card className="mt-8 bg-warm-white shadow-none">
                <span aria-hidden="true" className="font-display text-4xl font-bold leading-none text-teal">“</span>
                <p className="mt-2 font-display text-lg font-bold leading-7 text-navy">
                  We met people who understood the role from the very first conversation.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar initials="RK" />
                  <div>
                    <p className="text-sm font-semibold text-navy">Rohan Kapoor</p>
                    <p className="text-xs text-slate-600">Founder, Goodkind</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-5 shadow-md sm:p-8">
              {submitted ? (
                <div className="py-6 text-center" role="status">
                  <span className="success-mark mx-auto grid size-14 place-items-center rounded-full bg-teal text-white">
                    <svg aria-hidden="true" viewBox="0 0 64 64" className="size-9">
                      <path className="success-check-path" d="m17 33 10 10 21-23" pathLength="1" />
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-navy">
                    Your role is in good hands.
                  </h3>
                  <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
                    Thanks, {submitted.companyName}. Our team will reach out to{" "}
                    <span className="font-semibold text-navy">{submitted.workEmail}</span>{" "}
                    about the {submitted.jobTitle} role.
                  </p>
                  <dl className="mx-auto mt-6 max-w-sm space-y-2 rounded-xl bg-warm-white p-4 text-left text-sm">
                    <div className="summary-row flex justify-between gap-4" style={{ "--summary-delay": "0ms" } as CSSProperties}>
                      <dt className="text-slate-600">Selected plan</dt>
                      <dd className="font-semibold text-navy">{selectedPlan}</dd>
                    </div>
                    <div className="summary-row flex justify-between gap-4" style={{ "--summary-delay": "60ms" } as CSSProperties}>
                      <dt className="text-slate-600">Location</dt>
                      <dd className="font-semibold text-navy">{submitted.location}</dd>
                    </div>
                    <div className="summary-row flex justify-between gap-4" style={{ "--summary-delay": "120ms" } as CSSProperties}>
                      <dt className="text-slate-600">Salary range</dt>
                      <dd className="font-semibold text-navy">{submitted.salaryRange}</dd>
                    </div>
                  </dl>
                  <Button className="mt-7" onClick={postAnotherJob}>Post another job</Button>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-navy">Post a job</h3>
                      <p className="mt-1 text-sm text-slate-600">Selected plan: <span className="font-semibold text-teal">{selectedPlan}</span></p>
                    </div>
                    <p className="inline-flex items-center gap-2 rounded-full bg-warm-white px-3 py-2 text-xs font-medium text-slate-600">
                      <Clock3 aria-hidden="true" className="size-4 text-teal" />
                      Takes under 2 minutes
                    </p>
                  </div>
                  <form noValidate onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField id="company-name" label="Company name" error={errors.companyName}>
                        <FieldInput id="company-name" name="companyName" autoComplete="organization" placeholder="e.g. Orbit Labs" value={fields.companyName} onChange={(event) => updateField("companyName", event.target.value)} error={errors.companyName} required />
                      </FormField>
                      <FormField id="work-email" label="Work email" error={errors.workEmail} helper="We’ll use this to follow up about your role.">
                        <FieldInput id="work-email" name="workEmail" type="email" autoComplete="email" placeholder="you@company.com" value={fields.workEmail} onChange={(event) => updateField("workEmail", event.target.value)} error={errors.workEmail} helper="We’ll use this to follow up about your role." required />
                      </FormField>
                      <FormField id="job-title" label="Job title" error={errors.jobTitle}>
                        <FieldInput id="job-title" name="jobTitle" placeholder="e.g. Senior Product Designer" value={fields.jobTitle} onChange={(event) => updateField("jobTitle", event.target.value)} error={errors.jobTitle} required />
                      </FormField>
                      <FormField id="location" label="Location" error={errors.location} helper="City, state, or Remote">
                        <FieldInput id="location" name="location" placeholder="e.g. Bengaluru or Remote" value={fields.location} onChange={(event) => updateField("location", event.target.value)} error={errors.location} helper="City, state, or Remote" required />
                      </FormField>
                      <FormField id="job-type" label="Job type" error={errors.jobType}>
                        <select id="job-type" name="jobType" value={fields.jobType} onChange={(event) => updateField("jobType", event.target.value as JobType | "")} aria-invalid={Boolean(errors.jobType)} aria-describedby={errors.jobType ? "job-type-error" : undefined}                         className={`${fieldClass} ${errors.jobType ? "field-shake border-red-700" : ""}`} required>
                          <option value="">Select a job type</option>
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Contract</option>
                          <option>Internship</option>
                          <option>Remote</option>
                        </select>
                      </FormField>
                      <FormField id="salary-range" label="Salary range" error={errors.salaryRange} helper="Share a range in INR, such as ₹18–24 LPA.">
                        <FieldInput id="salary-range" name="salaryRange" placeholder="e.g. ₹18–24 LPA" value={fields.salaryRange} onChange={(event) => updateField("salaryRange", event.target.value)} error={errors.salaryRange} helper="Share a range in INR, such as ₹18–24 LPA." required />
                      </FormField>
                    </div>
                    <FormField id="description" label="Role description" error={errors.description} helper="What will this person work on, and what experience will help them succeed?">
                      <textarea id="description" name="description" rows={5} maxLength={2000} placeholder="Tell candidates about the role, the team, and what success looks like." value={fields.description} onChange={(event) => updateField("description", event.target.value)} aria-invalid={Boolean(errors.description)} aria-describedby={`description-help${errors.description ? " description-error" : ""}`} className={`${fieldClass} h-auto py-3 leading-6 ${errors.description ? "field-shake border-red-700" : ""}`} required />
                    </FormField>
                    {errors.consent && (
                      <p id="consent-error" role="alert" className="error-message flex items-start gap-1.5 text-sm text-red-700">
                        <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                        {errors.consent}
                      </p>
                    )}
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-600">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        checked={fields.consent}
                        onChange={(event) => updateField("consent", event.target.checked)}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? "consent-error" : undefined}
                        className="mt-1 size-4 shrink-0 accent-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                        required
                      />
                      <span>
                        I agree that Surhires may contact me about this job listing and its hiring plans.
                      </span>
                    </label>
                    <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? "Sending your role…" : "Submit job details"}
                    </Button>
                    <p className="text-xs text-slate-600">
                      This demo stores no data. Submitting shows a local confirmation only.
                    </p>
                  </form>
                </>
              )}
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
