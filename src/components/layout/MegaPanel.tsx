import {
  Bot,
  Briefcase,
  Building2,
  Globe,
  GraduationCap,
  House,
  LayoutTemplate,
  MessageCircle,
  Plane,
  ShoppingBag,
  ShoppingCart,
  Store,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import type { MegaFeature, MegaIcon, MegaLink, MegaMenu } from "@/data/navigation";

const megaIcons: Record<MegaIcon, typeof Globe> = {
  website: Globe,
  ecommerce: ShoppingBag,
  landing: LayoutTemplate,
  chatbot: Bot,
  whatsapp: MessageCircle,
  maintenance: Wrench,
  restaurant: UtensilsCrossed,
  corporate: Building2,
  education: GraduationCap,
  travel: Plane,
  retail: ShoppingCart,
  realEstate: House,
  professional: Briefcase,
  local: Store,
};

const featureTones = {
  yellow: "bg-accent-yellow text-navy",
  navy: "bg-navy text-white",
  tint: "bg-tab-active text-navy",
} as const;

// Keeps the copy readable over the background art without flattening it.
const featureScrims = {
  yellow: "bg-gradient-to-br from-accent-yellow via-accent-yellow/75 to-transparent",
  navy: "bg-gradient-to-br from-navy via-navy/75 to-transparent",
  tint: "bg-gradient-to-br from-tab-active via-tab-active/75 to-transparent",
} as const;

function LinkMark({ link }: { link: MegaLink }) {
  const Icon = megaIcons[link.icon ?? "website"];
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-tab-active text-primary transition-colors group-hover:bg-white">
      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
    </span>
  );
}

function FeatureCard({ feature, onNavigate }: { feature: MegaFeature; onNavigate: () => void }) {
  return (
    <div className={`relative isolate flex flex-col overflow-hidden rounded-xl p-6 ${featureTones[feature.tone]}`}>
      <Image
        src={feature.image}
        alt=""
        fill
        sizes="260px"
        className="-z-10 object-cover object-center"
      />
      <span aria-hidden className={`absolute inset-0 -z-10 ${featureScrims[feature.tone]}`} />
      <p className="text-[12px] leading-4 font-semibold tracking-[0.08em] uppercase opacity-70">{feature.eyebrow}</p>
      <p className="mt-3 font-inter text-[22px] leading-7 font-bold tracking-[-0.5px]">{feature.title}</p>
      <p className="mt-2 text-[15px] leading-6 opacity-75">{feature.description}</p>
      <div className="mt-auto pt-6">
        <ButtonLink href={feature.cta.href} size="xs" onClick={onNavigate}>
          {feature.cta.label}
        </ButtonLink>
      </div>
    </div>
  );
}

type MegaPanelProps = {
  id: string;
  menu: MegaMenu;
  onNavigate: () => void;
};

export function MegaPanel({ id, menu, onNavigate }: MegaPanelProps) {
  return (
    <div
      id={id}
      className="absolute inset-x-4 top-full z-50 rounded-2xl border border-tab-border bg-white shadow-[0_32px_64px_-24px_rgba(5,0,56,0.28)] motion-safe:animate-mega-in md:inset-x-7.5"
    >
      <div className="mx-auto grid max-w-310 grid-cols-[1fr_260px] gap-10 px-2.5 py-9 xl:grid-cols-[200px_1fr_260px]">
        <div className="hidden flex-col xl:flex">
          <p className="font-inter text-[24px] leading-7 font-bold tracking-[-0.5px] text-navy">{menu.title}</p>
          <p className="mt-3 text-[16px] leading-6 text-navy/60">{menu.description}</p>
          <Link
            href={menu.footer.href}
            onClick={onNavigate}
            className="mt-auto flex w-fit items-end gap-[5.02px] pt-8 font-inter text-[16px] leading-6 text-primary"
          >
            <span className="block border-b border-primary pr-2">{menu.footer.label}</span>
            <span aria-hidden="true" className="font-arrow">
              →
            </span>
          </Link>
        </div>

        <ul className="grid content-start gap-1 lg:grid-cols-2">
          {menu.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={onNavigate}
                className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-tab-active focus-visible:bg-tab-active"
              >
                <LinkMark link={link} />
                <span>
                  <span className="block font-inter text-[16px] leading-6 font-semibold text-navy">{link.label}</span>
                  <span className="block text-[14px] leading-5 text-navy/60">{link.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <FeatureCard feature={menu.feature} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
