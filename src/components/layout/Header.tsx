import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { primaryNav, utilityNav } from "@/data/navigation";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { StickyHeader } from "./StickyHeader";

export function Header() {
  return (
    <StickyHeader>
      <header className="relative z-40 mx-auto flex h-22.5 w-full max-w-360 items-center justify-between px-4 md:px-7.5">
        <div className="flex items-center">
          <Link href="/" aria-label="ORIK Webcraft home" className="block shrink-0">
            <Image
              src="/logos/brand/orik-webcraft.png"
              alt=""
              width={988}
              height={452}
              sizes="123px"
              loading="eager"
              className="h-14 w-auto"
            />
          </Link>
          <DesktopNav items={primaryNav} />
        </div>

        <div className="flex items-center text-[16px] leading-6 text-navy">
          {utilityNav.map((item, index) => (
            <NavLink
              key={item.href}
              href={item.href}
              // The last link sits beside the CTA, so it appears when the CTA does.
              className={`hidden font-inter ${index > 0 ? "ml-6.5" : ""} ${
                index === utilityNav.length - 1 ? "sm:block" : "md:block"
              }`}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="ml-4.75 hidden sm:block">
            <ButtonLink href="/contact" size="sm">
              Get Started
            </ButtonLink>
          </div>
          <MobileMenu items={primaryNav} utility={utilityNav} />
        </div>
      </header>
    </StickyHeader>
  );
}
