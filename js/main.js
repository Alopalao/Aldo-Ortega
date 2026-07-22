import { createIntroSection } from "./intro.js";
import { createExperienceSection } from "./experience.js";
import { createProjectsSection } from "./projects.js";
import { createConferencesSection } from "./conferences.js";
import { createContactSection } from "./contact.js";

const profile = {
  name: "Aldo Ortega",
  headline: "Computer Science Student | Software Developer | Full Stack",
  introText:
    "Hello, I am Aldo. This website serves two purposes. First, to have a reason to finish my projects and show them off. Second, to avoid LinkedIn 😅. ",
  photo: "./imgs/me_lost.jpg",
  links: [
    { label: "GitHub", href: "https://github.com/Alopalao", title: "GitHub profile" },
    { label: "Resume", href: "./resume/", title: "Resume document" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aldortega", title: "LinkedIn profile" },
  ],
};
const contact = {
  name: "Aldo Ortega",
  photo: "./imgs/desk.jpg",
};

const headerSocialLinks = [
  {
    href: "https://www.linkedin.com/in/aldortega",
    icon: "./imgs/linkedin_logo.png",
    alt: "LinkedIn",
    title: "Open LinkedIn profile",
  },
  {
    href: "https://github.com/Alopalao",
    icon: "./imgs/github_logo.png",
    alt: "GitHub",
    title: "Open GitHub profile",
  },
  {
    href: "./resume/",
    icon: "./imgs/cv_logo.jpg",
    alt: "Resume",
    title: "Open Resume document",
  },
];

const experience = [
  {
    company: "Center For Internet Augmented Research & Assessment (CIARA)",
    location: "Miami, Florida",
    logo: "./imgs/CIARA_logo.jpg",
    roles: [
      {
        title: "Research Application Developer Intern",
        period: "Jan. 2023 to Present",
        bullets: [
          "Led the development of open-source network management tools for Kytos-ng in Python and Linux so researchers and engineers could manage network traffic reliably.",
          "Designed reusable web UI components in Vue.js so future student developers could use them and save time in styling and interface design decisions.",
          "Redesigned database structure in MongoDB from sparse arrays to reduce document storage size by over 90%, so data retrieval and update was made faster and cheaper.",
          "Upgraded system concurrency with Python asyncio and multi-threading to handle 10x more processes (1,000 req/sec), maintaining API stability during peak traffic loads.",
          "Mentored 5+ student developers annually through structured Git and Python code reviews to accelerate onboarding and uphold software quality standards."
        ],
      },
      {
        title: "Application Developer Intern",
        period: "Sept. 2022 to Dec. 2022",
        bullets: [
          "Constructed and maintained back-end for a repository leveraging PyMongo for efficient database management.",
          "Enforced robust data validation with Pydantic, automatically enforcing data format rules and prevents future developers from runtime errors.",
        ],
      },
    ],
  },
  {
    company: "Amazon",
    location: "Austin, Texas",
    logo: "./imgs/amazon_logo.jpeg",
    roles: [
      {
        title: "Intern Software Developer Engineer",
        period: "May 2022 to Aug. 2022",
        bullets: [
          "Built modern, intuitive React UI components for customer support tools, simplifying refund and cancellation workflows for agents.",
          "Replaced large API calls with GraphQL queries to fetch order data across internal services without loading unnecessary customer information.",
        ],
      },
    ],
  },
];

const projects = [
  {
    title: "My own website",
    shortDescription: "A simple personal website to show my projects and experience as Software Developer engineer.",
    longDescription:
      "This is the website. The one you are currently on.",
    images: ["./imgs/website_project.png"],
    href: "https://github.com/Alopalao/Aldo-Ortega.git",
  },
  {
    title: "Random Project 2",
    shortDescription: "Description of generic project here.",
    longDescription:
      "Expanded view for Random Project 2. Add architecture notes, stack decisions, and outcomes here.",
    images: ["./imgs/a_turtle.jpeg", "./imgs/a_turtle.jpeg"],
    href: "#",
  },
  {
    title: "Random Project 3",
    shortDescription: "Description of generic project here.",
    longDescription:
      "Expanded view for Random Project 3. Add architecture notes, stack decisions, and outcomes here.",
    images: ["./imgs/a_turtle.jpeg", "./imgs/a_turtle.jpeg"],
    href: "#",
  },
  {
    title: "Random Project 4",
    shortDescription: "Description of generic project here.",
    longDescription:
      "Expanded view for Random Project 4. Add architecture notes, stack decisions, and outcomes here.",
    images: ["./imgs/a_turtle.jpeg", "./imgs/a_turtle.jpeg"],
    href: "#",
  },
  {
    title: "Random Project 5",
    shortDescription: "Description of generic project here.",
    longDescription:
      "Expanded view for Random Project 5. Add architecture notes, stack decisions, and outcomes here.",
    images: ["./imgs/a_turtle.jpeg", "./imgs/a_turtle.jpeg"],
    href: "#",
  },
  {
    title: "Random Project 6",
    shortDescription: "Description of generic project here.",
    longDescription:
      "Expanded view for Random Project 6. Add architecture notes, stack decisions, and outcomes here.",
    images: ["./imgs/a_turtle.jpeg", "./imgs/a_turtle.jpeg"],
    href: "#",
  },
];

const conferences = [];

const sections = [
  { id: "introduction", label: "Introduction", node: createIntroSection(profile) },
  { id: "experience", label: "Experience", node: createExperienceSection(experience) },
  { id: "projects", label: "Projects", node: createProjectsSection(projects) },
  { id: "conferences", label: "Conferences", node: createConferencesSection(conferences) },
  { id: "contact", label: "Contact", node: createContactSection(contact) },
];

const app = document.getElementById("app");
const nav = document.getElementById("top-nav");

buildNavigation(sections);
renderSections(sections);
attachRevealAnimation();

/** Builds sticky top navigation links for each section. */
function buildNavigation(sectionList) {
  const menuButton = document.createElement("button");
  menuButton.className = "nav-toggle";
  menuButton.type = "button";
  menuButton.setAttribute("aria-label", "Toggle navigation menu");
  menuButton.setAttribute("aria-expanded", "false");

  const menuIcon = document.createElement("span");
  menuIcon.className = "nav-toggle-icon";

  const menuLabel = document.createElement("span");
  menuLabel.className = "nav-toggle-label";
  menuLabel.textContent = "Menu";

  menuButton.append(menuIcon, menuLabel);

  const linkGroup = document.createElement("div");
  linkGroup.className = "nav-links";

  sectionList.forEach((section) => {
    const link = document.createElement("a");
    link.className = "nav-link";
    link.href = `#${section.id}`;
    link.textContent = section.label;
    linkGroup.appendChild(link);
  });

  const socialGroup = document.createElement("div");
  socialGroup.className = "nav-social";

  headerSocialLinks.forEach((item) => {
    const anchor = document.createElement("a");
    anchor.className = "nav-social-link";
    anchor.href = item.href;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.title = item.title;

    const icon = document.createElement("img");
    icon.className = "nav-social-icon";
    icon.src = item.icon;
    icon.alt = item.alt;

    anchor.appendChild(icon);
    socialGroup.appendChild(anchor);
  });

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  linkGroup.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", () => {
      nav.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      nav.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });

  nav.append(menuButton, linkGroup, socialGroup);
}

/** Appends section nodes to the page and marks them for reveal animation. */
function renderSections(sectionList) {
  sectionList.forEach((section) => {
    section.node.id = section.id;
    section.node.classList.add("reveal");
    app.appendChild(section.node);
  });
}

/** Reveals sections when they enter the viewport. */
function attachRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("show");
        instance.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
}
