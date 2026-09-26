import { AlertTriangle } from "lucide-react";
import type { ContentError } from "@/lib/content";

/**
 * Shown in place of the page when the content API cannot be reached. It names
 * the endpoint and the reason, so a failure is diagnosable from the browser
 * instead of looking like an empty site.
 */
export function ContentUnavailable({ error }: { error: ContentError }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-190 flex-col items-center justify-center px-4 py-24 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-accent-yellow/30 text-navy">
        <AlertTriangle aria-hidden className="size-7" strokeWidth={1.75} />
      </span>

      <h1 className="mt-6 font-inter text-[32px] leading-10 font-bold tracking-[-0.5px] text-navy">
        This page can&apos;t load its content
      </h1>

      <p className="mt-4 text-[18px] leading-6 text-navy/70">{error.summary}</p>
      <p className="mt-2 text-[16px] leading-6 text-navy/60">{error.detail}</p>

      <dl className="mt-8 w-full rounded-xl border border-tab-border bg-surface px-5 py-4 text-left">
        <dt className="text-[12px] leading-4 font-semibold tracking-[0.08em] text-navy/50 uppercase">
          Content service
        </dt>
        <dd className="mt-1 font-mono text-[14px] leading-5 break-all text-navy/80">{error.endpoint}</dd>
      </dl>

      <p className="mt-8 text-[15px] leading-6 text-navy/50">
        Nothing is broken on your side — reloading in a moment usually helps.
      </p>
    </main>
  );
}
