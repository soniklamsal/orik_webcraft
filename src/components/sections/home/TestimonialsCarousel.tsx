"use client";

import { ChevronLeft, ChevronRight, GripHorizontal, Mars, Quote, Venus } from "lucide-react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";
import type { Testimonial } from "@/data/home";

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const dragState = useRef({ active: false, startX: 0, startScroll: 0 });
  const [isDragging, setIsDragging] = useState(false);

  function moveByCard(direction: -1 | 1) {
    const list = listRef.current;
    if (!list) return;

    const card = list.querySelector<HTMLElement>("[data-testimonial-card]");
    const gap = 20;
    const amount = (card?.offsetWidth ?? 380) + gap;
    list.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLUListElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const list = listRef.current;
    if (!list) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      startScroll: list.scrollLeft,
    };
    setIsDragging(true);
    list.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLUListElement>) {
    const list = listRef.current;
    if (!list || !dragState.current.active) return;

    event.preventDefault();
    list.scrollLeft = dragState.current.startScroll - (event.clientX - dragState.current.startX);
  }

  function stopDragging(event: ReactPointerEvent<HTMLUListElement>) {
    dragState.current.active = false;
    setIsDragging(false);
    if (listRef.current?.hasPointerCapture(event.pointerId)) {
      listRef.current.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div className="relative mt-10">
      <button
        type="button"
        onClick={() => moveByCard(-1)}
        aria-label="Previous testimonial"
        className="absolute top-1/2 left-1 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-tab-border bg-white text-navy shadow-[0_12px_30px_-16px_rgba(5,0,56,0.55)] transition hover:border-primary hover:text-primary sm:-left-4"
      >
        <ChevronLeft aria-hidden className="size-5" />
      </button>

      <ul
        ref={listRef}
        aria-label="Customer testimonials"
        className={`-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-14 pb-5 sm:-mx-6 sm:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={(event) => {
          if (dragState.current.active) stopDragging(event);
        }}
      >
        {testimonials.map((testimonial) => {
          const isFemale = testimonial.gender === "female";
          const GenderIcon = isFemale ? Venus : Mars;
          const avatarLabel = isFemale ? "Female customer avatar" : "Male customer avatar";
          const avatarStyle = testimonial.photo
            ? { backgroundImage: `url(${JSON.stringify(testimonial.photo)})` }
            : undefined;

          return (
            <li
              key={testimonial.name}
              data-testimonial-card
              className="min-w-[min(82vw,390px)] snap-center sm:min-w-105 lg:min-w-115"
            >
              <figure className="relative flex min-h-105 flex-col overflow-hidden rounded-3xl border border-tab-border bg-white p-8 shadow-[0_20px_50px_-32px_rgba(5,0,56,0.6)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(5,0,56,0.45)] sm:p-10">
                <Quote aria-hidden className="absolute top-7 right-8 size-12 fill-primary/10 text-primary/20" strokeWidth={1.2} />
                <blockquote className="relative max-w-100 text-center font-inter text-[19px] leading-7 text-navy/70">
                  “{testimonial.quote}”
                </blockquote>

                <div className="mt-8 flex justify-center">
                  <span
                    role="img"
                    aria-label={testimonial.photo ? `${testimonial.name}'s photo` : avatarLabel}
                    className={`grid size-20 place-items-center rounded-full border-4 border-white bg-tab-active bg-cover bg-center text-primary ring-2 ring-primary/20 ${testimonial.photo ? "shadow-[0_8px_24px_-10px_rgba(0,132,84,0.7)]" : ""}`}
                    style={avatarStyle}
                  >
                    {!testimonial.photo ? <GenderIcon aria-hidden className="size-9" strokeWidth={1.5} /> : null}
                  </span>
                </div>

                <figcaption className="mt-5 text-center text-[14px] leading-5 text-navy/55">
                  <span className="block font-inter text-[17px] font-bold text-navy">{testimonial.name}</span>
                  <span className="block">{testimonial.business}</span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => moveByCard(1)}
        aria-label="Next testimonial"
        className="absolute top-1/2 right-1 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-tab-border bg-white text-navy shadow-[0_12px_30px_-16px_rgba(5,0,56,0.55)] transition hover:border-primary hover:text-primary sm:-right-4"
      >
        <ChevronRight aria-hidden className="size-5" />
      </button>

      <p className="mt-2 flex items-center justify-center gap-2 text-center text-[13px] text-navy/45">
        <GripHorizontal aria-hidden className="size-4" />
        Drag to explore reviews
      </p>
    </div>
  );
}
