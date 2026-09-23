"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import type { NavItem } from "@/data/navigation";
import { MegaPanel } from "./MegaPanel";
import { NavLink } from "./NavLink";

const CLOSE_DELAY = 160;
const SWITCH_DELAY = 120;

type Timer = ReturnType<typeof setTimeout> | null;

function clearTimer(timer: RefObject<Timer>) {
  if (timer.current) {
    clearTimeout(timer.current);
    timer.current = null;
  }
}

const isMouse = (event: ReactPointerEvent) => event.pointerType === "mouse";

export function DesktopNav({ items }: { items: NavItem[] }) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<Timer>(null);
  const switchTimer = useRef<Timer>(null);
  const hoverOpenedAt = useRef(0);

  // Opens instantly when nothing is open; switching or closing waits briefly so
  // a diagonal move toward the panel doesn't flip to the neighbouring menu.
  function hoverTo(label: string | null) {
    clearTimer(closeTimer);
    clearTimer(switchTimer);
    if (openLabel === label) return;

    const apply = () => {
      if (label) hoverOpenedAt.current = Date.now();
      setOpenLabel(label);
    };
    if (openLabel) switchTimer.current = setTimeout(apply, SWITCH_DELAY);
    else apply();
  }

  useEffect(() => {
    if (!openLabel) return;

    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenLabel(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      navRef.current?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${openLabel}"]`)?.focus();
      setOpenLabel(null);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openLabel]);

  useEffect(
    () => () => {
      clearTimer(closeTimer);
      clearTimer(switchTimer);
    },
    [],
  );

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="ml-5.75 hidden lg:block"
      onPointerEnter={() => clearTimer(closeTimer)}
      onPointerLeave={(event) => {
        if (!isMouse(event)) return;
        clearTimer(switchTimer);
        clearTimer(closeTimer);
        closeTimer.current = setTimeout(() => setOpenLabel(null), CLOSE_DELAY);
      }}
    >
      <ul className="flex items-center gap-4 text-[16px] leading-6 text-navy">
        {items.map((item) => {
          if (!item.menu) {
            return (
              <li key={item.label}>
                <NavLink
                  href={item.href}
                  onPointerEnter={(event) => {
                    if (isMouse(event)) hoverTo(null);
                  }}
                  onPointerLeave={() => clearTimer(switchTimer)}
                  className="block pr-1.75 font-inter"
                >
                  {item.label}
                </NavLink>
              </li>
            );
          }

          const open = openLabel === item.label;
          const panelId = `mega-menu-${item.label.toLowerCase()}`;

          return (
            <li
              key={item.label}
              onBlur={(event: FocusEvent<HTMLLIElement>) => {
                if (open && !event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenLabel(null);
              }}
            >
              <button
                type="button"
                data-menu-trigger={item.label}
                aria-expanded={open}
                aria-controls={panelId}
                onPointerEnter={(event) => {
                  if (isMouse(event)) hoverTo(item.label);
                }}
                onPointerLeave={() => clearTimer(switchTimer)}
                onClick={() => {
                  clearTimer(switchTimer);
                  // A hover just opened this menu; don't let the follow-up click close it.
                  if (open && Date.now() - hoverOpenedAt.current < 500) return;
                  setOpenLabel(open ? null : item.label);
                }}
                className={`flex h-22.5 cursor-pointer items-center gap-3.25 pl-1.25 font-helvetica transition-colors ${
                  open ? "text-primary" : ""
                }`}
              >
                <span className="relative top-px">{item.label}</span>
                <Image
                  src="/icons/chevron-down.svg"
                  alt=""
                  width={10}
                  height={10}
                  className={`size-2.5 translate-y-0.75 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
              {open && <MegaPanel id={panelId} menu={item.menu} onNavigate={() => setOpenLabel(null)} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
