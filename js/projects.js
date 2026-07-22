import { createGallerySection } from "./gallery.js";

/** Creates the projects section in a 3-column gallery layout. */
export function createProjectsSection(projects) {
  return createGallerySection({
    title: "Projects",
    subtitle: "",
    items: projects,
    linkLabel: "Source code",
  });
}
