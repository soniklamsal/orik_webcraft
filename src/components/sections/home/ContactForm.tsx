"use client";

import { useState, type ComponentProps, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { WebsitePackage } from "@/data/home";

const labelClass = "block text-[14px] leading-5 text-navy/70";
const controlClass =
  "mt-2 w-full border-b border-input-border bg-transparent text-[18px] text-navy outline-none transition-colors placeholder:text-placeholder focus:border-primary";

type Status = "idle" | "sending" | "sent" | "error";

function Field({ label, ...props }: { label: string } & ComponentProps<"input">) {
  return (
    <label className={labelClass}>
      {label}
      <input className={`${controlClass} h-11`} {...props} />
    </label>
  );
}

export function ContactForm({ packages }: { packages: WebsitePackage[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setError(null);

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        form.reset();
        setStatus("sent");
        return;
      }

      // Handle different error cases
      setError(
        response.status === 429
          ? "You've sent a few enquiries already. Please try again later, or email us directly."
          : result.error || "Please check your details and try again.",
      );
      setStatus("error");
    } catch {
      setError("We couldn't send your enquiry. Please check your connection and try again, or email us directly.");
      setStatus("error");
    }
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit}>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Business name" name="business" autoComplete="organization" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" required />
      </div>

      <label className={`${labelClass} mt-7`}>
        Package (optional)
        <select name="package" defaultValue="" className={`${controlClass} h-11`}>
          <option value="">Not sure yet</option>
          {packages.map((pkg) => (
            <option key={pkg.name} value={pkg.name}>
              {pkg.name}
            </option>
          ))}
        </select>
      </label>

      <label className={`${labelClass} mt-7`}>
        Project details (optional)
        <textarea
          name="message"
          rows={3}
          placeholder="What would you like your website to do?"
          className={`${controlClass} resize-none py-2`}
        />
      </label>

      {/* Honeypot: hidden from people, irresistible to bots. The API rejects any filled value. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Button type="submit" className="mt-9" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : "Send enquiry"}
      </Button>

      <p role="status" aria-live="polite" className="mt-5 text-[15px] leading-6 text-navy/70">
        {status === "sent" && "Thanks! Your enquiry is with us — we'll get back to you shortly."}
        {status === "error" && error}
      </p>
    </form>
  );
}