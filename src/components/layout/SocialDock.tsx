import { getContent } from "@/lib/content";
import { SocialDockMenu } from "./SocialDockMenu";

/**
 * The floating social button. Uses getContent rather than requireContent: if
 * the API is down the page already shows why, and a missing dock should not
 * take the rest of the layout with it.
 */
export async function SocialDock() {
  const { content } = await getContent();
  if (!content) return null;

  return <SocialDockMenu links={content.site.socials} siteName={content.site.name} />;
}
