import Link from "next/link";
import { CountUp } from "@/components/ui/CountUp";
import { getContent } from "@/lib/content";

export async function QuickStats() {
  const { stats: quickStats } = await getContent();

  return (
    <section aria-labelledby="stats-heading" className="mt-15 py-15">
      <div className="bg-accent-yellow px-4 md:px-10 xl:px-37.5">
        <div className="mx-auto max-w-285 py-30 text-center">
          <h2
            id="stats-heading"
            className="font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy xl:whitespace-pre"
          >
            {"Digital experiences built\nfor modern business."}
          </h2>
          <Link
            href="/contact"
            className="mx-auto mt-4.25 block h-5.75 w-fit border-b border-navy font-inter text-[18px] leading-6 text-navy"
          >
            <span className="relative -top-px">Get a free consultation</span>
          </Link>

          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-4">
            {quickStats.map((stat, index) => (
              <div key={stat.label} className="flex flex-col-reverse items-center justify-end">
                <dt className="mt-2 max-w-40 font-inter text-[16px] leading-5.5 text-navy">{stat.label}</dt>
                <dd className="font-inter text-[40px] leading-12 font-extrabold tracking-[-1.5px] text-navy tabular-nums md:text-[48px] md:leading-14">
                  <CountUp value={stat.value} delay={index * 120} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
