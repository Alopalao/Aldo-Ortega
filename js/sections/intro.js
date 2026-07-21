/** Creates the introduction section with profile image, text, and links. */
export function createIntroSection(profile) {
  const section = createBaseSection("Welcome", "A snippet of who I am.");

  const introWrap = document.createElement("div");
  introWrap.className = "intro-wrap";

  const photo = document.createElement("img");
  photo.className = "portrait";
  photo.src = profile.photo;
  photo.alt = `${profile.name} portrait`;

  const heading = document.createElement("h3");
  heading.textContent = `${profile.name} | ${profile.headline}`;

  const text = document.createElement("p");
  text.textContent = profile.introText;

  const links = document.createElement("div");
  links.className = "intro-links";

  profile.links.forEach((item, index) => {
    const anchor = document.createElement("a");
    anchor.className = "icon-link";
    anchor.href = item.href;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.title = item.title;
    anchor.textContent = item.label;
    links.appendChild(anchor);

    if (index < profile.links.length - 1) {
      const separator = document.createElement("span");
      separator.className = "link-separator";
      separator.textContent = "|";
      links.appendChild(separator);
    }
  });

  introWrap.append(photo, heading, text, links);
  section.appendChild(introWrap);

  return section;
}

/** Creates shared section heading structure. */
function createBaseSection(title, subtitle) {
  const section = document.createElement("section");
  section.className = "section";

  const heading = document.createElement("h2");
  heading.className = "section-title";
  heading.textContent = title;

  const sub = document.createElement("p");
  sub.className = "section-subtitle";
  sub.textContent = subtitle;

  section.append(heading, sub);
  return section;
}
