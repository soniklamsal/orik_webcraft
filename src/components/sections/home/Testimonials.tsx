import { requireContent } from "@/lib/content";

export async function Testimonials() {
  const { testimonials } = await requireContent();

  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="mx-auto mt-30 max-w-285 px-4 xl:px-0">
      <h2
        id="testimonials-heading"
        className="text-center font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy"
      >
        Loved by businesses like yours
      </h2>
      <ul className="mt-10 grid gap-5 xl:grid-cols-3 xl:px-2.5">
        {testimonials.map((testimonial) => (
          <li key={testimonial.name}>
            <figure className="flex flex-col p-9 xl:h-115">
              <blockquote className="text-[18px] leading-6 text-navy/60">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-10 flex flex-col text-[14px] leading-5 text-navy/60 xl:mt-auto">
                <span>{testimonial.name}</span>
                <span>{testimonial.business}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
