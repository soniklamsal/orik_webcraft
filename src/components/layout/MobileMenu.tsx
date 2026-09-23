"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { NavItem, NavLinkItem } from "@/data/navigation";
import { NavLink } from "./NavLink";

type MobileMenuProps = {
  items: NavItem[];
  utility: NavLinkItem[];
};

export function MobileMenu({ items, utility }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <div className="ml-2 lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => (open ? close() : setOpen(true))}
        className="flex size-11 cursor-pointer items-center justify-center rounded-full text-navy hover:bg-surface"
      >
        {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-4 top-full z-50 max-h-[calc(100vh-110px)] overflow-y-auto rounded-[8px] border border-tab-border bg-white p-3 shadow-[0_20px_40px_-16px_rgba(5,0,56,0.25)]"
        >
          <ul className="flex flex-col">
            {items.map((item) => {
              if (!item.menu) {
                return (
                  <li key={item.label}>
                    <NavLink
                      href={item.href}
                      onClick={close}
                      className="block rounded-[8px] px-4 py-3 font-inter text-[16px] leading-6 text-navy hover:bg-surface"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              }

              const isExpanded = expanded === item.label;
              const listId = `mobile-menu-${item.label.toLowerCase()}`;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={listId}
                    onClick={() => setExpanded(isExpanded ? null : item.label)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-[8px] px-4 py-3 font-helvetica text-[16px] leading-6 text-navy hover:bg-surface"
                  >
                    {item.label}
                    <Image
                      src="/icons/chevron-down.svg"
                      alt=""
                      width={10}
                      height={10}
                      className={`size-2.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isExpanded && (
                    <ul id={listId} className="pb-2 pl-3">
                      {item.menu.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={close}
                            className="block rounded-[8px] px-4 py-2.5 hover:bg-tab-active"
                          >
                            <span className="block font-inter text-[15px] leading-5 font-semibold text-navy">
                              {link.label}
                            </span>
                            <span className="block text-[13px] leading-5 text-navy/60">{link.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}

            <li className="mt-1 border-t border-tab-border pt-1">
              {utility.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  onClick={close}
                  className="block rounded-[8px] px-4 py-3 font-inter text-[16px] leading-6 text-navy hover:bg-surface"
                >
                  {link.label}
                </NavLink>
              ))}
            </li>

            <li className="mt-2">
              <Link
                href="/contact"
                onClick={close}
                className="flex h-12.5 items-center justify-center rounded-[24px] bg-primary font-helvetica text-[16px] text-white"
              >
                Get Started →
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
