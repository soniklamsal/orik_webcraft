"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  value: string;
  delay?: number;
  duration?: number;
  className?: string;
};

// "10+" -> 10 and "+", "24/7" -> 24 and "/7"
function parseValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return match ? { target: Number(match[1]), suffix: match[2] } : null;
}

export function CountUp({ value, delay = 0, duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parsed = parseValue(value);
    if (!el || !parsed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { target, suffix } = parsed;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    el.textContent = `0${suffix}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            el.textContent = `${Math.round(target * eased)}${suffix}`;
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value, delay, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className={className}>
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
