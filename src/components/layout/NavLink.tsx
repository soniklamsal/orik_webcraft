"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  activeClassName?: string;
};

export function NavLink({ href, className = "", activeClassName = "text-primary", ...props }: NavLinkProps) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={active ? `${className} ${activeClassName}` : className}
      {...props}
    />
  );
}
