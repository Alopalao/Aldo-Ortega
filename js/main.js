import { createIntroSection } from "./intro.js";
import { createExperienceSection } from "./experience.js";
import { createProjectsSection } from "./projects.js";
import { createConferencesSection } from "./conferences.js";
import { createContactSection } from "./contact.js";

const profile = {
  name: "Aldo Ortega",
  headline: "Software Developer | Full Stack | ",
  introText:
    "Hello, I am Aldo. This intro section is a placeholder so you can clearly see the current layout. I enjoy building useful software, learning new tools, and turning ideas into products.",
  photo: "../imgs/a_turtle.jpeg",
  links: [
    { label: "GitHub", href: "https://github.com/Alopalao", title: "GitHub profile" },
    { label: "Resume", href: "#", title: "Resume document" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aldortega", title: "LinkedIn profile" },
  ],
};

const headerSocialLinks = [
  {
    href: "https://www.linkedin.com/in/aldortega",
    icon: "../imgs/linkedin_logo.png",
    alt: "LinkedIn",
    title: "Open LinkedIn profile",
  },
  {
    href: "https://github.com/Alopalao",
    icon: "../imgs/github_logo.png",
    alt: "GitHub",
    title: "Open GitHub profile",
  },
];

const experience = [
  {
    company: "Northwind Labs",
    companyType: "Software & Data Consulting",
    logo: "../imgs/a_turtle.jpeg",
    roles: [
      {
        title: "Frontend Developer",
        period: "2024 - Present",
        bullets: [
          "Built a dashboard for daily operations and reduced manual reporting steps.",
          "Created reusable UI components to speed up feature delivery across teams.",
          "Partnered with backend engineers to integrate new API endpoints.",
        ],
      },
      {
        title: "QA Automation Analyst",
        period: "2023 - 2024",
        bullets: [
          "Automated smoke tests for release candidates before deployment.",
          "Logged critical bugs and worked with developers on fast verification cycles.",
        ],
      },
    ],
  },
  {
    company: "Blue Harbor Systems",
    companyType: "Product Engineering",
    logo: "../imgs/a_turtle.jpeg",
    roles: [
      {
        title: "Backend Developer",
        period: "2022 - 2023",
        bullets: [
          "Implemented REST APIs for account management and analytics flows.",
          "Improved query performance for high-traffic endpoints.",
          "Documented service contracts for internal consumers.",
        ],
      },
      {
        title: "DevOps Engineer",
        period: "2021 - 2022",
        bullets: [
          "Maintained CI pipelines and deployment scripts for multiple environments.",
          "Added health checks and logging to improve incident response time.",
        ],
      },
    ],
  },
];

const projects = [
  {
    title: "Random Project 1",
    shortDescription: "Description of generic project here.",
    longDescription:
      "Expanded view for Random Project 1. Add architecture notes, stack decisions, and outcomes here.",
    images: ["../imgs/a_turtle.jpeg", "../imgs/a_turtle.jpeg"],
    href: "#",
  },
  {
    title: "Random Project 2",
    shortDescription: "Description of generic project here.",
    longDescription:
      "Expanded view for Random Project 2. Add architecture notes, stack decisions, and outcomes here.",
    images: ["../imgs/a_turtle.jpeg", "../imgs/a_turtle.jpeg"],
    href: "#",
  },
  {
    title: "Random Project 3",
    shortDescription: "Description of generic project here.",
    longDescription:
      "Expanded view for Random Project 3. Add architecture notes, stack decisions, and outcomes here.",
    images: ["../imgs/a_turtle.jpeg", "../imgs/a_turtle.jpeg"],
    href: "#",
  },
  {
    title: "Random Project 4",
    shortDescription: "Description of generic project here.",
    longDescription:
      "Expanded view for Random Project 4. Add architecture notes, stack decisions, and outcomes here.",
    images: ["../imgs/a_turtle.jpeg", "../imgs/a_turtle.jpeg"],
    href: "#",
  },
  {
    title: "Random Project 5",
    shortDescription: "Description of generic project here.",
    longDescription:
      "Expanded view for Random Project 5. Add architecture notes, stack decisions, and outcomes here.",
    images: ["../imgs/a_turtle.jpeg", "../imgs/a_turtle.jpeg"],
    href: "#",
  },
  {
    title: "Random Project 6",
    shortDescription: "Description of generic project here.",
    longDescription:
      "Expanded view for Random Project 6. Add architecture notes, stack decisions, and outcomes here.",
    images: ["../imgs/a_turtle.jpeg", "../imgs/a_turtle.jpeg"],
    href: "#",
  },
];

const conferences = [];

const sections = [
  { id: "introduction", label: "Introduction", node: createIntroSection(profile) },
  { id: "experience", label: "Experience", node: createExperienceSection(experience) },
  { id: "projects", label: "Projects", node: createProjectsSection(projects) },
  { id: "conferences", label: "Conferences", node: createConferencesSection(conferences) },
  { id: "contact", label: "Contact", node: createContactSection(profile) },
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
