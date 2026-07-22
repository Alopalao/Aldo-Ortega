/** Creates the contact section with image and a simple form layout. */
export function createContactSection(profile) {
  const section = createBaseSection(
    "Contact",
    "Feel free to contact me on LinkedIn or send me an email at aldortega65@gmail.com."
  );

  const wrap = document.createElement("div");
  wrap.className = "contact-wrap";

  const photo = document.createElement("img");
  photo.className = "contact-photo";
  photo.src = profile.photo;
  photo.alt = `${profile.name} contact photo`;

  const message = document.createElement("div");
  message.className = "contact-message";

  const note = document.createElement("p");
  note.textContent = "Reach me through the links below:";

  const links = document.createElement("div");
  links.className = "contact-links";

  const linkedInLink = document.createElement("a");
  linkedInLink.href = "https://www.linkedin.com/in/aldortega";
  linkedInLink.target = "_blank";
  linkedInLink.rel = "noreferrer";
  linkedInLink.textContent = "LinkedIn";

  const emailLink = document.createElement("a");
  emailLink.href = "mailto:aldortega65@gmail.com";
  emailLink.textContent = "aldortega65@gmail.com";

  links.append(linkedInLink, emailLink);
  message.append(note, links);

  wrap.append(photo, message);
  section.appendChild(wrap);

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
