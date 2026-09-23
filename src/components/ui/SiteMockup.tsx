import { MessageCircle } from "lucide-react";
import type { MockupOverlay, MockupTheme } from "@/data/home";

type MockupProps = {
  theme: MockupTheme;
  overlay?: MockupOverlay;
  className?: string;
};

const windowDots = ["#ff5f57", "#febc2e", "#28c840"];

function Overlay({ type, theme }: { type: MockupOverlay; theme: MockupTheme }) {
  if (type === "chat") {
    return (
      <div className="absolute right-4 bottom-4 w-44 rounded-xl bg-white p-3 shadow-[0_12px_30px_-10px_rgba(5,0,56,0.35)]">
        <div className="flex items-center gap-2">
          <span className="size-5 rounded-full" style={{ background: theme.accent }} />
          <span className="text-[10px] font-semibold text-navy">Chat assistant</span>
        </div>
        <p className="mt-2 rounded-lg bg-surface px-2 py-1.5 text-[10px] leading-3.5 text-navy/80">
          Hi! How can we help you today?
        </p>
        <div className="mt-2 h-5 rounded-full border border-tab-border" />
      </div>
    );
  }

  if (type === "whatsapp") {
    return (
      <span className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-full bg-[#25d366] px-3 py-2 text-[11px] font-semibold text-white shadow-[0_10px_24px_-8px_rgba(5,0,56,0.4)]">
        <MessageCircle aria-hidden className="size-3.5" />
        Chat on WhatsApp
      </span>
    );
  }

  return (
    <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-navy shadow-[0_8px_20px_-8px_rgba(5,0,56,0.35)]">
      <span className="size-2 rounded-full bg-[#28c840]" />
      All updates installed
    </span>
  );
}

export function BrowserMockup({ theme, overlay, className = "" }: MockupProps) {
  return (
    <div
      role="img"
      aria-label={`Demo website design for ${theme.name}`}
      className={`overflow-hidden rounded-xl border border-navy/10 bg-white font-inter shadow-[0_20px_40px_-24px_rgba(5,0,56,0.35)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-navy/8 bg-surface px-4 py-3">
        <div className="flex gap-1.5">
          {windowDots.map((color) => (
            <span key={color} className="size-2.5 rounded-full" style={{ background: color }} />
          ))}
        </div>
        <div className="flex-1 truncate rounded-full bg-white px-3 py-1 text-center text-[11px] text-navy/50">
          {theme.domain}
        </div>
      </div>

      <div aria-hidden="true" className="relative p-5 sm:p-6" style={{ background: theme.soft }}>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold" style={{ color: theme.accentDark }}>
            {theme.name}
          </span>
          <div className="hidden gap-4 sm:flex">
            {theme.nav.map((item) => (
              <span key={item} className="text-[11px] text-navy/60">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 grid items-center gap-5 sm:grid-cols-[1.1fr_1fr]">
          <div>
            <p
              className="text-[20px] leading-6 font-bold tracking-[-0.3px] sm:min-h-21 sm:text-[22px] sm:leading-7"
              style={{ color: theme.accentDark }}
            >
              {theme.headline}
            </p>
            <p className="mt-2 text-[12px] leading-4 text-navy/60">{theme.subline}</p>
            <span
              className="mt-4 inline-flex rounded-full px-3.5 py-1.5 text-[11px] font-semibold text-white"
              style={{ background: theme.accent }}
            >
              {theme.cta}
            </span>
          </div>
          <div
            className="relative h-28 overflow-hidden rounded-xl sm:h-32"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})` }}
          >
            <span className="absolute -right-6 -bottom-8 size-24 rounded-full bg-white/20" />
            <span className="absolute top-4 left-4 size-10 rounded-lg bg-white/25" />
            <span className="absolute bottom-4 left-4 h-2 w-16 rounded-full bg-white/40" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {theme.cards.map((card) => (
            <div key={card} className="rounded-lg bg-white p-2.5 shadow-sm">
              <div
                className="h-10 rounded-md sm:h-12"
                style={{ background: `linear-gradient(135deg, ${theme.accent}33, ${theme.accent}77)` }}
              />
              <p className="mt-2 truncate text-[11px] font-semibold text-navy">{card}</p>
              <div className="mt-1 h-1.5 w-2/3 rounded-full bg-navy/10" />
            </div>
          ))}
        </div>

        {overlay && <Overlay type={overlay} theme={theme} />}
      </div>
    </div>
  );
}

export function PhoneMockup({ theme, className = "" }: MockupProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-36 overflow-hidden rounded-[26px] border-[5px] border-navy bg-white font-inter shadow-[0_20px_40px_-16px_rgba(5,0,56,0.45)] ${className}`}
    >
      <div className="flex justify-center bg-navy pb-1">
        <span className="h-1.5 w-12 rounded-full bg-white/25" />
      </div>
      <div className="px-3 pt-3 pb-4" style={{ background: theme.soft }}>
        <span className="text-[9px] font-bold" style={{ color: theme.accentDark }}>
          {theme.name}
        </span>
        <div
          className="mt-2 h-16 rounded-lg"
          style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})` }}
        />
        <p className="mt-2 text-[11px] leading-3.5 font-bold" style={{ color: theme.accentDark }}>
          {theme.headline}
        </p>
        <span
          className="mt-2 inline-flex rounded-full px-2.5 py-1 text-[8px] font-semibold text-white"
          style={{ background: theme.accent }}
        >
          {theme.cta}
        </span>
        <div className="mt-3 space-y-1.5">
          {theme.cards.slice(0, 2).map((card) => (
            <div key={card} className="flex items-center gap-2 rounded-md bg-white p-1.5">
              <span className="size-5 rounded" style={{ background: `${theme.accent}55` }} />
              <span className="text-[8px] font-semibold text-navy">{card}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MockupStage({ theme, overlay }: { theme: MockupTheme; overlay?: MockupOverlay }) {
  return (
    <div className="flex h-full items-center rounded-[4px] border border-tab-border bg-surface p-6 sm:p-10">
      <BrowserMockup theme={theme} overlay={overlay} className="w-full" />
    </div>
  );
}
