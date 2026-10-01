"use client";

import { useEffect } from "react";

/**
 * The last net: this catches errors thrown by the root layout itself, which
 * error.tsx cannot. It replaces the whole document, so it carries its own
 * html and body and cannot rely on any of the app's styles being loaded.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[layout]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#ffffff",
          color: "#050038",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <h1 style={{ fontSize: "30px", lineHeight: 1.25, margin: 0 }}>The site couldn&apos;t load.</h1>
          <p style={{ fontSize: "17px", lineHeight: 1.6, color: "rgba(5,0,56,0.6)" }}>
            This is usually the content service waking up, which takes up to a minute. Trying again normally works.
          </p>
          {error.digest && (
            <p style={{ fontSize: "13px", color: "rgba(5,0,56,0.4)" }}>Reference: {error.digest}</p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "20px",
              height: "48px",
              padding: "0 24px",
              cursor: "pointer",
              border: "1px solid #00683e",
              background: "#00683e",
              color: "#ffffff",
              fontSize: "16px",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
