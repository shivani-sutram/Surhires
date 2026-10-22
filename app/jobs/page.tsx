import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/primitives";
import { JobsExplorer, JobsBenefits } from "@/components/sections/jobs-explorer";
import { FooterCta } from "@/components/sections/footer-cta";

export const metadata: Metadata = {
  title: "Find your next role",
  description:
    "Explore thoughtful full-time, part-time, contract, internship, and remote opportunities with clear salary ranges on Surhires.",
  openGraph: {
    title: "Find your next role | Surhires",
    description: "Explore opportunities with teams building what’s next.",
    type: "website",
  },
};

export default function JobsPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHeader
        breadcrumb="Find jobs"
        eyebrow="Find work that fits"
        title="Your next good thing starts here."
        description="Explore roles with clear expectations, thoughtful teams, and salary ranges up front."
      />
      <JobsExplorer />
      <JobsBenefits />
      <FooterCta />
    </main>
  );
}
