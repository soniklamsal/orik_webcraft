"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Catches anything a page throws while rendering, most likely requireContent
 * when the backend is unreachable. Without this the visitor gets the host's
 * bare "a server error occurred" page instead of an explanation.
 */
export default function PageError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[page]", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-190 flex-col justify-center px-4 py-20 text-navy">
      <p className="text-[12px] leading-4 font-semibold tracking-[0.08em] text-navy/50 uppercase">Something broke</p>
      <h1 className="mt-3 font-inter text-[32px] leading-10 font-bold tracking-[-0.5px]">This page couldn&apos;t load.</h1>
      <p className="mt-4 text-[18px] leading-7 text-navy/60">
        This is usually the content service waking up. Trying again normally works.
      </p>
      {error.digest && <p className="mt-4 text-[14px] text-navy/40">Reference: {error.digest}</p>}
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={reset}
          className="h-12.5 cursor-pointer border border-primary-dark bg-primary-dark px-6 font-manrope text-[16px] font-extralight text-white transition-colors hover:bg-white hover:text-primary-dark"
        >
          Try again
        </button>
        <Link
          href="/"
          className="flex h-12.5 items-center px-2 font-manrope text-[16px] text-navy underline underline-offset-4 hover:text-primary"
        >
          Go to the homepage
        </Link>
      </div>
    </main>
  );
}
