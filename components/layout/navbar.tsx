"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Brand } from "@/components/layout/brand";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const links = [
  { label: "Home", href: "/" },
  { label: "Find jobs", href: "/jobs" },
  { label: "For employers", href: "/employers" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 12);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    firstFocusable?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/" && currentHash === href.slice(1);
    return pathname.startsWith(href);
  };

  useLayoutEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLAnchorElement>(
      'a[aria-current="page"]',
    );
    const indicator = indicatorRef.current;
    const nav = navRef.current;
    if (!activeLink || !indicator || !nav) {
      indicator?.style.setProperty("opacity", "0");
      return;
    }
    indicator.style.width = `${activeLink.offsetWidth}px`;
    indicator.style.transform = `translateX(${activeLink.offsetLeft}px)`;
    indicator.style.setProperty("opacity", "1");
  }, [currentHash, pathname]);

  return (
    <header
      className={`nav-shell sticky top-0 z-50 border-b bg-white/95 ${isScrolled ? "is-scrolled border-slate-200/80 shadow-sm backdrop-blur" : "border-transparent backdrop-blur-0"}`}
    >
      <Container className={`flex items-center justify-between ${isScrolled ? "h-16" : "h-20"}`}>
        <Brand />
        <nav ref={navRef} aria-label="Main navigation" className="relative hidden items-center gap-1 lg:flex">
          <span ref={indicatorRef} aria-hidden="true" className="nav-active-indicator" />
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              data-text={link.label}
              className={`nav-link relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-base hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${isActive(link.href) ? "text-navy" : "text-slate-600"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/employers#post-a-job" size="sm">
            Post a job
          </Button>
          <ThemeToggle />
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="inline-flex size-11 items-center justify-center rounded-xl text-navy transition duration-fast hover:bg-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          tabIndex={-1}
          className="mobile-menu-backdrop fixed inset-0 z-10 bg-navy/20 lg:hidden"
          onClick={closeMenu}
        />
      )}
      <div
        id="mobile-navigation"
        ref={panelRef}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={`mobile-menu-panel absolute inset-x-0 top-full z-20 border-b border-slate-200 bg-white px-4 shadow-md transition-[opacity,transform,visibility] duration-base ease-brand-out lg:hidden ${isOpen ? "is-open visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        <nav className="mx-auto flex max-h-[calc(100dvh-4rem)] max-w-7xl flex-col overflow-y-auto py-4">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
              style={{ "--menu-delay": `${index * 40}ms` } as CSSProperties}
              className={`mobile-menu-link flex min-h-12 items-center rounded-xl px-3 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${isActive(link.href) ? "text-teal" : "text-navy"}`}
            >
              {link.label}
            </Link>
          ))}
          <Button
            href="/employers#post-a-job"
            className="mt-3 w-full"
            tabIndex={isOpen ? 0 : -1}
            onLinkClick={() => setIsOpen(false)}
          >
            Post a job
          </Button>
          <ThemeToggle className="mt-3 w-full" />
        </nav>
      </div>
    </header>
  );
}
