import { getContent } from "@/lib/content";
import { IndustriesTabs } from "./IndustriesTabs";

type IndustriesProps = {
  titleAs?: "h1" | "h2";
  className?: string;
  /** Slug of the tab to open, e.g. "real-estate" from a mega-menu link. */
  initialSlug?: string;
};

/** Server wrapper: fetches the copy, then hands it to the client-side tabs. */
export async function Industries(props: IndustriesProps) {
  const { industries, industriesSection } = await getContent();
  return <IndustriesTabs industries={industries} copy={industriesSection} {...props} />;
}
