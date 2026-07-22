import { createGallerySection } from "./gallery.js";

/** Creates the conferences section using the same project-style layout. */
export function createConferencesSection(conferences) {
  return createGallerySection({
    title: "Conferences & Extra",
    subtitle:
      "Open-source contributions, conferences, and community highlights live here.",
    items: conferences,
    linkLabel: "More details",
  });
}
