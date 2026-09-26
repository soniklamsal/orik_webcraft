import Link from "next/link";
import { WhyOrik } from "@/components/sections/home/WhyOrik";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { footerNav } from "@/data/navigation";
import { requireContent } from "@/lib/content";

export async function Footer() {
  const { site } = await requireContent();
  const { name: siteName, description: siteDescription, socials: socialLinks } = site;
  const { email, phone, location } = site.contact;
  const year = new Date().getFullYear();

  return (
    <div className="mt-auto">
      <WhyOrik />

      <footer className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-10 text-navy sm:flex sm:justify-between sm:px-6">
          <div className="border-b border-navy/10 p-5 text-center sm:w-2/12 sm:border-r sm:border-b-0 sm:text-left">
            <p className="text-sm font-bold text-primary uppercase">Menu</p>
            <ul>
              {footerNav.map((item) => (
                <li key={item.label} className="my-2">
                  <Link href={item.href} className="hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-navy/10 p-5 text-center sm:w-7/12 sm:border-r sm:border-b-0">
            <p className="mb-4 text-xl font-bold text-primary">{siteName}</p>
            <p className="mb-10 text-sm text-navy/60">{siteDescription}</p>
          </div>

          <div className="p-5 text-center sm:w-3/12 sm:text-left">
            <p className="text-sm font-bold text-primary uppercase">Contact Us</p>
            <ul>
              <li className="my-2">
                <Link href="/contact" className="hover:text-primary">
                  Send us an enquiry
                </Link>
              </li>
              {email && (
                <li className="my-2">
                  <a href={`mailto:${email}`} className="hover:text-primary">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li className="my-2">
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-primary">
                    {phone}
                  </a>
                </li>
              )}
              {location && <li className="my-2">{location}</li>}
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center border-t border-navy/10 py-5 text-sm text-navy">
          <div className="mt-2 flex flex-row md:flex-auto md:flex-row-reverse">
            {socialLinks.map((link) => (
              <a key={link.platform} href={link.href} aria-label={`${siteName} on ${link.label}`} className="mx-1 w-6">
                <SocialIcon platform={link.platform} className="cursor-pointer fill-current text-navy/60 hover:text-primary" />
              </a>
            ))}
          </div>
          <p className="my-5">
            © Copyright {year} {siteName}. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
