import { getContent } from "@/lib/content";
import { PopupDialog } from "./PopupDialog";

/**
 * The sign-up popup. Like the dock it uses getContent, so a backend outage
 * costs the page a popup rather than the whole layout.
 */
export async function Popup() {
  const { content } = await getContent();
  if (!content?.popup.isEnabled) return null;

  return <PopupDialog copy={content.popup} />;
}
