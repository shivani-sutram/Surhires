"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Filter, Search, SearchX, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/ui/job-card";
import { Card, Container, IconChip, Reveal, Section, SectionHeading, Tag } from "@/components/ui/primitives";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { jobs, type JobType } from "@/lib/jobs";

const locations = [
  "Bengaluru",
  "Chennai",
  "Delhi",
  "Hyderabad",
  "Mumbai",
  "Pune",
  "Remote",
];
const jobTypes: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Remote",
];

export function JobsExplorer() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const filterTimer = useRef<number | null>(null);

  const filteredJobs = useMemo(() => {
    const search = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesSearch =
        !search ||
        [job.title, job.company, job.location, ...job.skills]
          .join(" ")
          .toLowerCase()
          .includes(search);
      const matchesLocation = !location || job.location === location;
      const matchesType = !type || job.type === type;
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [location, query, type]);

  const activeCount = Number(Boolean(query.trim())) + Number(Boolean(location)) + Number(Boolean(type));

  useEffect(
    () => () => {
      if (filterTimer.current !== null) window.clearTimeout(filterTimer.current);
    },
    [],
  );

  function queueFilter(update: () => void) {
    update();
    setIsLoading(true);
    if (filterTimer.current !== null) window.clearTimeout(filterTimer.current);
    filterTimer.current = window.setTimeout(() => {
      setIsLoading(false);
      filterTimer.current = null;
    }, 300);
  }

  function clearFilters() {
    setQuery("");
    setLocation("");
    setType("");
    setMobileOpen(false);
    setIsLoading(false);
    if (filterTimer.current !== null) window.clearTimeout(filterTimer.current);
    filterTimer.current = null;
  }

  const selectClass =
    "h-12 w-full rounded-xl border border-border bg-surface px-3 text-sm text-text outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30";

  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container>
        <SectionHeading
          eyebrow="Open opportunities"
          title="Search roles that fit."
          description="Choose from clear, current openings across teams, locations, and work styles."
        />
        <div className="job-filter-panel sticky top-16 z-30 mb-8 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <div className="min-w-0 flex-1">
              <label htmlFor="job-search" className="mb-2 block text-sm font-semibold text-text">
                Search roles
              </label>
              <div className="relative">
                <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-text-muted" />
                <input
                  id="job-search"
                  type="search"
                  value={query}
                  onChange={(event) => queueFilter(() => setQuery(event.target.value))}
                  placeholder="Try “designer” or “React”"
                  className={`${selectClass} pl-10`}
                />
              </div>
            </div>
            <div className={`gap-3 sm:grid-cols-2 lg:flex lg:w-auto ${mobileOpen ? "grid" : "hidden"} lg:grid`}>
              <div className="min-w-0 lg:w-48">
                <label htmlFor="job-location" className="mb-2 block text-sm font-semibold text-text">
                  Location
                </label>
                <select
                  id="job-location"
                  value={location}
                  onChange={(event) => queueFilter(() => setLocation(event.target.value))}
                  className={selectClass}
                >
                  <option value="">All locations</option>
                  {locations.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
              <div className="min-w-0 lg:w-48">
                <label htmlFor="job-type" className="mb-2 block text-sm font-semibold text-text">
                  Job type
                </label>
                <select
                  id="job-type"
                  value={type}
                  onChange={(event) => queueFilter(() => setType(event.target.value))}
                  className={selectClass}
                >
                  <option value="">All job types</option>
                  {jobTypes.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-expanded={mobileOpen}
                aria-controls="job-location job-type"
                onClick={() => setMobileOpen((open) => !open)}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
              >
                <Filter aria-hidden="true" className="size-4" />
                Filters
                {activeCount > 0 && (
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-accent text-xs text-accent-on">
                    {activeCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={clearFilters}
                disabled={activeCount === 0}
                className="min-h-12 rounded-xl px-4 text-sm font-semibold text-accent transition hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {query.trim() && (
            <button
              type="button"
              aria-label={`Remove search filter ${query}`}
              onClick={() => queueFilter(() => setQuery(""))}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Tag className="filter-chip gap-2">Search: {query}<X aria-hidden="true" className="size-3" /></Tag>
            </button>
          )}
          {location && (
            <button
              type="button"
              aria-label={`Remove location filter ${location}`}
              onClick={() => queueFilter(() => setLocation(""))}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Tag className="filter-chip gap-2">{location}<X aria-hidden="true" className="size-3" /></Tag>
            </button>
          )}
          {type && (
            <button
              type="button"
              aria-label={`Remove job type filter ${type}`}
              onClick={() => queueFilter(() => setType(""))}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Tag className="filter-chip gap-2">{type}<X aria-hidden="true" className="size-3" /></Tag>
            </button>
          )}
        </div>

        <div className="mb-6 flex items-center justify-end gap-4">
          <p aria-live="polite" aria-atomic="true" className="shrink-0 rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-text-muted-strong shadow-sm">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? "role" : "roles"}
          </p>
        </div>

        <div className={`job-results ${isLoading ? "is-loading" : ""}`} aria-busy={isLoading}>
          {isLoading ? (
            <div className="grid gap-5 md:grid-cols-2">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="skeleton-card rounded-2xl border border-border bg-surface p-6 shadow-sm">
                  <span className="skeleton-shimmer block size-12 rounded-xl" />
                  <span className="skeleton-shimmer mt-5 block h-5 w-2/3 rounded-lg" />
                  <span className="skeleton-shimmer mt-3 block h-4 w-1/2 rounded-lg" />
                  <span className="skeleton-shimmer mt-7 block h-4 w-1/3 rounded-lg" />
                </div>
              ))}
            </div>
          ) : filteredJobs.length ? (
            <div className="grid items-stretch gap-5 md:grid-cols-2">
              {filteredJobs.map((job) => (
                <div key={job.id} id={job.id} className="scroll-mt-32">
                  <div className="h-full">
                    <JobCard job={job} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <Card className="mx-auto max-w-2xl py-12 text-center sm:py-16">
            <IconChip className="mx-auto size-14 rounded-2xl">
              <SearchX aria-hidden="true" className="size-7" />
            </IconChip>
            <h3 className="mt-5 font-display text-2xl font-bold text-text">
              No roles match those filters
            </h3>
            <p className="mx-auto mt-3 max-w-md leading-7 text-text-muted-strong">
              Try a broader search or clear your filters to see every open opportunity.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button onClick={clearFilters}>Clear filters</Button>
              <Link
                href="/employers"
                className="inline-flex min-h-12 items-center justify-center rounded-xl px-5 text-sm font-semibold text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Explore employer plans
              </Link>
            </div>
          </Card>
          )}
        </div>
      </Container>
    </Section>
  );
}

export function JobsBenefits() {
  const benefits = [
    ["Clear salary ranges", "Know the compensation before you invest your time."],
    ["Real role details", "Understand the work, team, and expectations up front."],
    ["A human process", "Move from application to conversation with less friction."],
  ];
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="The Surhires difference"
          title="A job search that respects your time."
          description="Find the details you need to make a confident next move."
          align="center"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map(([title, text], index) => (
            <Reveal key={title} delay={index * 60}>
              <SpotlightCard className="h-full">
                <Card className="flex h-full items-start gap-4">
                  <IconChip><Search aria-hidden="true" className="size-5" /></IconChip>
                  <div>
                    <h3 className="weight-reserve font-display text-lg font-bold text-text" data-text={title}>{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted-strong">{text}</p>
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
