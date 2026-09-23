"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Matches the header's h-22.5. Above this the bar is always shown, so the top of a page looks normal. */
const HEADER_HEIGHT = 90;

/** Roughly three mouse-wheel notches — a small upward nudge shouldn't unpin the bar. */
const UNPIN_AFTER_SCROLLING_UP = 300;

/** Once scrolling stops for this long, the bar goes back to normal on its own. */
const UNPIN_AFTER_IDLE = 2000;

export function StickyHeader({ children }: { children: ReactNode }) {
  const [pinned, setPinned] = useState(true);
  const lastY = useRef(0);
  const scrolledUp = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (idleTimer.current) clearTimeout(idleTimer.current);

      if (y <= HEADER_HEIGHT) {
        scrolledUp.current = 0;
        setPinned(true);
        return;
      }

      if (delta > 0) {
        scrolledUp.current = 0;
        setPinned(true);
      } else if (delta < 0) {
        scrolledUp.current -= delta;
        if (scrolledUp.current >= UNPIN_AFTER_SCROLLING_UP) setPinned(false);
      }

      idleTimer.current = setTimeout(() => {
        if (window.scrollY > HEADER_HEIGHT) setPinned(false);
      }, UNPIN_AFTER_IDLE);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    // The wrapper keeps the header's space in the flow, so pinning never shifts the page.
    <div className="h-22.5">
      <div
        className={`fixed inset-x-0 top-0 z-40 bg-white transition-transform duration-300 motion-reduce:transition-none ${
          pinned ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
