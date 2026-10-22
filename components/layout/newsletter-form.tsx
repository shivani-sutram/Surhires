"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p role="status" className="mt-4 text-sm font-medium text-teal-bright">
        You&apos;re on the list. Look out for our next update.
      </p>
    );
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="newsletter-email">
        Email address for career updates
      </label>
      <div className="flex rounded-xl border border-white/20 bg-white/5 p-1">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-teal-bright"
        />
        <Button type="submit" size="sm" variant="onDark" showArrow={false}>
          Join
        </Button>
      </div>
    </form>
  );
}
