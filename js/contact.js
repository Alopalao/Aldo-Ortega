/** Creates the contact section with image and a simple form layout. */
export function createContactSection(profile) {
  const section = createBaseSection(
    "Contact",
    "Use the form to share details so I can reach back to you."
  );

  const wrap = document.createElement("div");
  wrap.className = "contact-wrap";

  const photo = document.createElement("img");
  photo.className = "contact-photo";
  photo.src = profile.photo;
  photo.alt = `${profile.name} contact photo`;

  const form = document.createElement("form");
  form.className = "contact-form";

  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.name = "name";
  inputName.placeholder = "Your name";
  inputName.required = true;

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.name = "email";
  inputEmail.placeholder = "Your email";
  inputEmail.required = true;

  const inputCompany = document.createElement("input");
  inputCompany.type = "text";
  inputCompany.name = "company";
  inputCompany.placeholder = "Company / Organization";

  const message = document.createElement("textarea");
  message.name = "message";
  message.rows = 5;
  message.placeholder = "Message";
  message.required = true;

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Send";

  form.append(inputName, inputEmail, inputCompany, message, button);
  wrap.append(photo, form);
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
