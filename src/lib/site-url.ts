/**
 * The site's public origin, used for canonical URLs, Open Graph images,
 * robots.txt and the sitemap.
 *
 * Set NEXT_PUBLIC_SITE_URL in Vercel once the custom domain is attached. On a
 * preview deployment Vercel provides VERCEL_URL, which keeps preview links
 * pointing at themselves rather than at production.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "https://orikwebcraft.com"
).replace(/\/$/, "");
