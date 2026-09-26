"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { PopupCopy } from "@/data/home";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";

const STORAGE_KEY = "orik.popup";
// Someone who signed up should never see it again; someone who closed it is
// only asked again after a fortnight.
const DISMISSED_DAYS = 14;

// Pages where the visitor is already being asked for their details.
const SILENT_PATHS = ["/contact"];

type Status = "idle" | "sending" | "sent" | "error";

/** Reading storage throws in some privacy modes, so every access is guarded. */
function alreadyHandled(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { state, at } = JSON.parse(raw) as { state: string; at: number };
    if (state === "subscribed") return true;
    return Date.now() - at < DISMISSED_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function remember(state: "subscribed" | "dismissed") {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, at: Date.now() }));
  } catch {
    // A visitor with storage blocked simply gets asked again next visit.
  }
}

export function PopupDialog({ copy }: { copy: PopupCopy }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (SILENT_PATHS.includes(pathname) || alreadyHandled()) return;

    const timer = setTimeout(() => {
      // showModal gives the focus trap, the Escape key and the backdrop for
      // free, which is why this is a <dialog> and not a styled <div>.
      dialog.current?.showModal();
    }, copy.delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [copy.delaySeconds, pathname]);

  function close() {
    // "sent" is remembered by the submit handler; this is the dismissal case.
    if (status !== "sent") remember("dismissed");
    dialog.current?.close();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/subscribers/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      if (response.ok) {
        remember("subscribed");
        setStatus("sent");
        return;
      }

      setError(
        response.status === 429
          ? "That's a few sign-ups already. Please try again later."
          : "Please check the address and try again.",
      );
      setStatus("error");
    } catch {
      setError("We couldn't reach the server. Please check your connection.");
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby="popup-heading"
      onCancel={close}
      className="m-auto w-[min(92vw,30rem)] rounded-[8px] bg-white p-0 text-navy shadow-[0_30px_80px_-30px_rgba(5,0,56,0.6)] backdrop:bg-navy/45 open:motion-safe:animate-mega-in"
    >
      <div className="relative p-8 sm:p-10">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-9 cursor-pointer place-items-center rounded-full text-navy/40 transition-colors hover:bg-surface hover:text-navy"
        >
          <X aria-hidden="true" className="size-5" />
        </button>

        {status === "sent" ? (
          <div className="py-6 text-center">
            <p id="popup-heading" className="font-inter text-[24px] leading-8 font-bold tracking-[-0.5px] text-navy">
              {copy.successMessage}
            </p>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="mt-6 cursor-pointer text-[16px] text-primary underline underline-offset-4"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {copy.eyebrow && (
              <p className="text-[12px] leading-4 font-semibold tracking-[0.08em] text-primary uppercase">
                {copy.eyebrow}
              </p>
            )}
            <h2
              id="popup-heading"
              className="mt-2 font-inter text-[28px] leading-9 font-bold tracking-[-0.5px] text-navy"
            >
              {copy.heading}
            </h2>
            <p className="mt-3 text-[16px] leading-6 text-navy/60">{copy.body}</p>

            <form onSubmit={handleSubmit} className="relative mt-7">
              <label htmlFor="popup-email" className="sr-only">
                {copy.emailLabel}
              </label>
              <input
                id="popup-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={copy.emailLabel}
                className="h-14.5 w-full rounded-[8px] border border-input-border px-5 text-[16px] text-navy placeholder:text-placeholder focus:border-primary focus:outline-none"
              />

              {/* Honeypot: hidden from people, irresistible to bots. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {error && (
                <p role="alert" className="mt-3 text-[14px] leading-5 text-red-700">
                  {error}
                </p>
              )}

              <Button type="submit" className="mt-4 w-full justify-between" disabled={status === "sending"}>
                {status === "sending" ? "Sending" : copy.buttonLabel}
              </Button>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
