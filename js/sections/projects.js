import { createGallerySection } from "./gallery.js";

/** Creates the projects section in a 3-column gallery layout. */
export function createProjectsSection(projects) {
  return createGallerySection({
    title: "Projects",
    subtitle: "Each card opens for larger images and extra details.",
    items: projects,
    linkLabel: "Visit project",
  });
}
