import type { Metadata } from "next";
import { FooterCta } from "@/components/sections/footer-cta";
import { EmployerSections } from "@/components/sections/employer-sections";
import { PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Hiring plans for growing teams",
  description:
    "Find a Surhires plan for your team. Post a role, get thoughtful candidate matches, and build your next great team.",
  openGraph: {
    title: "For employers | Surhires",
    description: "Meet people who are ready to do their best work.",
    type: "website",
  },
};

export default function EmployersPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHeader
        breadcrumb="For employers"
        eyebrow="For thoughtful teams"
        title="Meet your next great teammate."
        description="Spend less time sorting and more time connecting with people who can move your work forward."
        note="Straightforward plans · No payment collected on this demo"
      />
      <EmployerSections />
      <FooterCta />
    </main>
  );
}
