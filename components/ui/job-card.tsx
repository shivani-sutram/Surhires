"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Bookmark, BriefcaseBusiness, MapPin } from "lucide-react";
import type { Job } from "@/lib/jobs";
import { CompanyLogo, Card, Tag } from "@/components/ui/primitives";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export function JobCard({
  job,
  featured = false,
}: {
  job: Job;
  featured?: boolean;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <SpotlightCard className="h-full">
      <Card interactive className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <CompanyLogo name={job.company} short={job.companyShort} className="transition-transform duration-base ease-brand-spring group-hover/card:rotate-[-4deg] group-hover/card:scale-105" />
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-warm-white px-3 py-1 text-xs font-medium text-slate-600">
              {job.posted}
            </span>
            <button
              type="button"
              aria-label={saved ? `Remove saved role: ${job.title}` : `Save role: ${job.title}`}
              aria-pressed={saved}
              onClick={() => setSaved((value) => !value)}
              className="inline-flex size-9 items-center justify-center rounded-lg text-slate-600 transition-colors duration-fast hover:bg-teal/10 hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              <Bookmark aria-hidden="true" className={`size-4 ${saved ? "bookmark-pop fill-teal text-teal" : ""}`} />
            </button>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-sm font-medium text-slate-600">{job.company}</p>
          <h3
            className="weight-reserve mt-1 font-display text-lg font-bold text-navy transition-colors duration-base group-hover/card:text-teal"
            data-text={job.title}
          >
            {job.title}
          </h3>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-4 text-teal" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BriefcaseBusiness aria-hidden="true" className="size-4 text-teal" />
            {job.type}
          </span>
        </div>
        <p className="mt-3 text-sm font-semibold text-navy">
          ₹{job.salaryMin}–{job.salaryMax} LPA
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.slice(0, featured ? 3 : 4).map((skill) => (
            <Tag key={skill} className="tag-lift">{skill}</Tag>
          ))}
        </div>
        <Link
          href={`/jobs#${job.id}`}
          className="link-underline mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-teal focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
        >
          View role
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-fast group-hover/card:translate-x-0.5" />
        </Link>
      </Card>
    </SpotlightCard>
  );
}
