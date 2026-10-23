"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${id}-trigger-${index}`;
        const panelId = `${id}-panel-${index}`;
        return (
          <div key={item.question} className="py-1">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left font-display text-base font-semibold text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-lg"
              >
                {item.question}
                <span
                  className={cn(
                    "inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-surface text-accent transition-transform duration-fast ease-brand-out",
                    isOpen && "rotate-45",
                  )}
                >
                  <Plus aria-hidden="true" className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={cn("accordion-panel", isOpen && "is-open")}
              aria-hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-5 pr-10 text-sm leading-7 text-text-muted-strong sm:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
