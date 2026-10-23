import Link from "next/link";
import { AtSign, Camera, MessageCircle } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { Container } from "@/components/ui/primitives";
import { NewsletterForm } from "@/components/layout/newsletter-form";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Find jobs", href: "/jobs" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Career advice", href: "/jobs" },
    ],
  },
  {
    title: "For employers",
    links: [
      { label: "Post a job", href: "/employers#post-a-job" },
      { label: "Pricing", href: "/employers#pricing" },
      { label: "Why Surhires", href: "/employers#why-surhires" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/#how-it-works" },
      { label: "Frequently asked questions", href: "/#faq" },
      { label: "Contact", href: "mailto:hello@surhires.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-surface-raised text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="sm:col-span-2">
            <Brand light />
            <p className="mt-4 max-w-sm text-sm leading-6 text-text-subtle">
              A more thoughtful way to find your next teammate — or your next
              great opportunity.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                aria-label="Surhires on LinkedIn"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-xl bg-surface/10 text-accent-hover transition hover:bg-surface/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover"
              >
                <AtSign aria-hidden="true" className="size-5" />
              </a>
              <a
                aria-label="Surhires on Instagram"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-xl bg-surface/10 text-accent-hover transition hover:bg-surface/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover"
              >
                <Camera aria-hidden="true" className="size-5" />
              </a>
              <a
                aria-label="Surhires on Facebook"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-xl bg-surface/10 text-accent-hover transition hover:bg-surface/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover"
              >
                <MessageCircle aria-hidden="true" className="size-5" />
              </a>
            </div>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="font-display text-sm font-bold text-white">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-subtle transition hover:text-accent-hover focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-md border-t border-white/10 pt-8">
          <h2 className="font-display text-sm font-bold text-white">
            Good work starts here
          </h2>
          <p className="mt-2 text-sm text-text-subtle">
            Get thoughtful opportunities and hiring notes in your inbox.
          </p>
          <NewsletterForm />
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Surhires. Made for better work.</p>
          <div className="flex gap-5">
            <Link
              className="hover:text-accent-hover"
              href="mailto:hello@surhires.com?subject=Privacy%20question"
            >
              Privacy
            </Link>
            <Link
              className="hover:text-accent-hover"
              href="mailto:hello@surhires.com?subject=Terms%20question"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
