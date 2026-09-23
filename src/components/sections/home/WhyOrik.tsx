import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
export function WhyOrik() {
  return (
    <section aria-labelledby="why-heading" className="mt-30 grid xl:grid-cols-2">
      <h2 id="why-heading" className="sr-only">
        Why businesses choose ORIK Webcraft
      </h2>

      <div className="relative h-175 overflow-hidden">
        <Image
          src="/images/why-orik/team.png"
          alt="A smiling team member sitting at a table in a bright office"
          fill
          sizes="(min-width: 1280px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute right-4 bottom-10 left-4 xl:top-[449.63px] xl:right-auto xl:bottom-auto xl:left-18 xl:w-126">
          <h3 className="max-w-[422.2px] font-manrope text-[36px] leading-[43.2px] font-extralight text-white">
            Business first, with personal support.
          </h3>
          <ButtonLink href="/process" className="mt-6 xl:absolute xl:top-[122.38px] xl:left-0 xl:mt-0">
            Our process
          </ButtonLink>
        </div>
      </div>

      <div className="relative h-175 overflow-hidden">
        <Image
          src="/images/why-orik/laptop.jpg"
          alt="Hands resting on a closed laptop covered in stickers"
          fill
          sizes="(min-width: 1280px) 50vw, 100vw"
          loading="eager"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.76),rgba(255,255,255,0))]"
        />
        <div className="absolute top-17.5 right-4 left-4 xl:right-auto xl:left-18">
          <p className="font-manrope text-[22px] leading-14 tracking-[0.04em] text-white">Why ORIK Webcraft</p>
          <h3 className="font-manrope text-[36px] leading-[43.2px] font-extralight text-white">
            Responsive, modern websites{" "}
            <br />
            that grow with you.
          </h3>
        </div>
        <div className="absolute bottom-10 left-4 xl:top-63 xl:right-18 xl:bottom-auto xl:left-auto">
          <ButtonLink href="/work">View our work</ButtonLink>
        </div>
      </div>
    </section>
  );
}
