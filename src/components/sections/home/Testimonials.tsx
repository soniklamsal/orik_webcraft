import { requireContent } from "@/lib/content";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

export async function Testimonials() {
  const { testimonials } = await requireContent();

  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="mx-auto mt-30 max-w-300 overflow-hidden px-4 xl:px-0">
      <div className="mx-auto max-w-190 text-center">
        <p className="font-inter text-[14px] font-bold tracking-[0.18em] text-primary uppercase">Client stories</p>
        <h2
          id="testimonials-heading"
          className="mt-3 font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy"
        >
          Loved by businesses like yours
        </h2>
        <p className="mx-auto mt-4 max-w-160 text-[18px] leading-6 text-navy/60">
          Real progress starts with a clear digital experience. Here is what business owners say after working with ORIK.
        </p>
      </div>
      <TestimonialsCarousel testimonials={testimonials} />
    </section>
  );
}
