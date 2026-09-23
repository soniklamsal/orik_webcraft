import Image from "next/image";
import { socialLabel, TeamSocialIcon } from "@/components/ui/TeamSocialIcon";
import type { TeamMember } from "@/data/home";
import { getContent } from "@/lib/content";

type TeamProps = {
  titleAs?: "h1" | "h2";
  className?: string;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberCard({ member }: { member: TeamMember }) {
  const links = member.links ?? [];

  return (
    <article className="flex flex-col items-center">
      <div className="relative w-full max-w-72">
        {/* Portrait sits in a circle; the name card overlaps its lower edge. */}
        <div className="relative aspect-square overflow-hidden rounded-full bg-tab-active ring-8 ring-surface">
          {member.photo ? (
            <Image
              src={member.photo}
              alt=""
              fill
              sizes="288px"
              className="object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="flex h-full w-full items-center justify-center font-inter text-[56px] leading-none font-bold text-primary/45"
            >
              {initials(member.name)}
            </span>
          )}
        </div>

        <div className="relative -mt-14 rounded-2xl border border-tab-border bg-white px-5 pt-5 pb-6 text-center shadow-[0_18px_40px_-24px_rgba(5,0,56,0.35)]">
          <h3 className="font-inter text-[20px] leading-7 font-bold tracking-[-0.3px] text-navy">{member.name}</h3>
          <p className="mt-1 text-[15px] leading-5 text-primary">{member.role}</p>
          {member.bio ? <p className="mt-3 text-[14px] leading-5 text-navy/60">{member.bio}</p> : null}

          {links.length > 0 ? (
            <ul className="mt-4 flex items-center justify-center gap-2">
              {links.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.href}
                    target={link.platform === "email" ? undefined : "_blank"}
                    rel={link.platform === "email" ? undefined : "noreferrer"}
                    aria-label={`${member.name} on ${socialLabel(link.platform)}`}
                    className="flex size-9 items-center justify-center rounded-full bg-tab-active text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    <TeamSocialIcon platform={link.platform} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export async function Team({ titleAs: Title = "h2", className = "mt-30" }: TeamProps) {
  const { team } = await getContent();

  return (
    <section id="team" aria-labelledby="team-heading" className={`scroll-mt-6 pb-10 ${className}`}>
      <div className="mx-auto max-w-285 px-4 text-center md:px-10 xl:px-0">
        <Title id="team-heading" className="font-inter text-[48px] leading-14 font-bold tracking-[-1px] text-navy">
          Our team
        </Title>
        <p className="mx-auto mt-4 max-w-160 text-[18px] leading-6 text-navy/70">
          A small team focused on building websites that earn trust and bring your business real enquiries.
        </p>

        {team.length > 0 ? (
          <div className="mt-14 grid justify-items-center gap-y-12 gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
            {team.map((member) => (
              <MemberCard key={`${member.name}-${member.role}`} member={member} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-[16px] leading-6 text-navy/50">Team profiles are on the way.</p>
        )}
      </div>
    </section>
  );
}
