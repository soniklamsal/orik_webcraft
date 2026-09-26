"use client";

import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { SocialLink } from "@/data/site";

// Each icon starts a little after the one before it, so opening reads as one
// movement rather than four. Closing runs the order backwards.
const STAGGER_MS = 45;

// How far the icons sit from the button, and the slice of circle they spread
// across: straight up (90 degrees) round to straight left (180), which is the
// free space next to a button pinned in the bottom-right corner.
const RADIUS_PX = 124;
const FIRST_ANGLE = 90;
const LAST_ANGLE = 180;

/** Where one icon rests on the arc, measured from the button's centre. */
function restingPoint(index: number, count: number) {
  const step = count > 1 ? (LAST_ANGLE - FIRST_ANGLE) / (count - 1) : 0;
  const radians = ((FIRST_ANGLE + index * step) * Math.PI) / 180;
  return {
    x: Math.cos(radians) * RADIUS_PX,
    // Negative because the page's y axis grows downwards.
    y: -Math.sin(radians) * RADIUS_PX,
  };
}

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
    // The box is only the button; the icons are positioned out of it, so the
    // arc can overhang without pushing the corner around.
    <div ref={dock} className="fixed right-5 bottom-5 z-40 size-14">
      <ul inert={!open} className="absolute inset-0">
        {links.map((link, index) => {
          const { x, y } = restingPoint(index, links.length);
          const order = open ? index : links.length - 1 - index;
          return (
            <li key={link.platform} className="absolute inset-0 grid place-items-center">
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${siteName} on ${link.label}`}
                style={{
                  // Folded into the button when closed, out on the arc when open.
                  transform: open ? `translate(${x}px, ${y}px) scale(1)` : "translate(0px, 0px) scale(0.3)",
                  transitionDelay: `${order * STAGGER_MS}ms`,
                }}
                className={`group grid size-13 place-items-center rounded-full bg-white shadow-[0_6px_20px_-6px_rgba(5,0,56,0.35)] transition duration-300 ease-out motion-reduce:transition-none ${
                  open ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <span className="size-6.5">
                  <SocialIcon
                    platform={link.platform}
                    className="fill-current text-navy/70 transition-colors group-hover:text-primary"
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={open}
        aria-label={open ? "Hide social links" : "Show social links"}
        className="relative grid size-14 cursor-pointer place-items-center rounded-full bg-primary text-white shadow-[0_10px_28px_-8px_rgba(0,132,84,0.75)] transition-colors hover:bg-primary-dark"
      >
        {/* Both glyphs are stacked so one can spin out as the other spins in. */}
        <span className="relative grid size-6 place-items-center">
          <MessageCircle
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
