"use client";

import { Share2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { SocialLink } from "@/data/site";

// Each icon starts a little after the one before it, so opening reads as one
// movement rather than four. Closing runs the order backwards.
const STAGGER_MS = 45;

type SocialDockMenuProps = {
  links: SocialLink[];
  siteName: string;
};

export function SocialDockMenu({ links, siteName }: SocialDockMenuProps) {
  const [open, setOpen] = useState(false);
  const dock = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!dock.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [open]);

  // Nothing to reveal until at least one social link has a URL.
  if (links.length === 0) return null;

  return (
    <div ref={dock} className="fixed right-5 bottom-5 z-40 flex flex-col items-center gap-3">
      <ul inert={!open} className="flex flex-col items-center gap-3">
        {links.map((link, index) => (
          <li key={link.platform}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${siteName} on ${link.label}`}
              style={{ transitionDelay: `${(open ? index : links.length - 1 - index) * STAGGER_MS}ms` }}
              className={`group grid size-11 place-items-center rounded-full bg-white shadow-[0_6px_20px_-6px_rgba(5,0,56,0.35)] transition duration-200 ease-out motion-reduce:transition-none ${
                open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-50 opacity-0"
              }`}
            >
              <span className="size-5.5">
                <SocialIcon
                  platform={link.platform}
                  className="fill-current text-navy/70 transition-colors group-hover:text-primary"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={open}
        aria-label={open ? "Hide social links" : "Show social links"}
        className="grid size-14 cursor-pointer place-items-center rounded-full bg-primary text-white shadow-[0_10px_28px_-8px_rgba(0,132,84,0.75)] transition-colors hover:bg-primary-dark"
      >
        {/* Both glyphs are stacked so one can spin out as the other spins in. */}
        <span className="relative grid size-6 place-items-center">
          <Share2
            aria-hidden="true"
            className={`absolute size-6 transition-all duration-200 ease-out motion-reduce:transition-none ${
              open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            aria-hidden="true"
            className={`absolute size-6 transition-all duration-200 ease-out motion-reduce:transition-none ${
              open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </span>
      </button>
    </div>
  );
}
