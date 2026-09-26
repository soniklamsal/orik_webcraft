/** Neutral placeholder blocks shown while a page waits for the content API. */

function Bar({ className = "" }: { className?: string }) {
  return <span className={`block rounded-md bg-navy/8 motion-safe:animate-pulse ${className}`} />;
}

export function PageSkeleton() {
  return (
    <main aria-busy="true" aria-live="polite" className="mx-auto w-full max-w-300 px-4 py-20 md:px-10">
      <span className="sr-only">Loading content…</span>

      <div className="flex flex-col gap-10 xl:flex-row xl:items-start">
        <div className="w-full max-w-110 shrink-0">
          <Bar className="h-12 w-full" />
          <Bar className="mt-3 h-12 w-4/5" />
          <Bar className="mt-6 h-5 w-full" />
          <Bar className="mt-2 h-5 w-11/12" />
          <Bar className="mt-8 h-15 w-full max-w-87.5 rounded-lg" />
        </div>
        <Bar className="h-75 w-full rounded-3xl xl:h-100" />
      </div>

      <div className="mt-24 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-tab-border p-6">
            <Bar className="h-6 w-1/2" />
            <Bar className="mt-4 h-4 w-full" />
            <Bar className="mt-2 h-4 w-5/6" />
          </div>
        ))}
      </div>
    </main>
  );
}

export function FooterSkeleton() {
  return (
    <div aria-busy="true" className="mt-auto border-t border-tab-border bg-surface px-4 py-14">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <Bar className="h-4 w-24" />
            <Bar className="mt-4 h-4 w-32" />
            <Bar className="mt-2 h-4 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}
