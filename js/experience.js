/** Creates the work experience section with one card per organization. */
export function createExperienceSection(jobs) {
  const section = createBaseSection(
    "Work Experience", "",
  );

  const grid = document.createElement("div");
  grid.className = "job-grid";

  jobs.forEach((job) => {
    const card = document.createElement("article");
    card.className = "job-card";

    const header = document.createElement("div");
    header.className = "job-header";

    const companyInfo = document.createElement("div");

    const companyName = document.createElement("h3");
    companyName.textContent = job.company;

    const companyType = document.createElement("p");
    companyType.textContent = job.companyType;

    companyInfo.append(companyName, companyType);

    const logo = document.createElement("img");
    logo.className = "job-logo";
    logo.src = job.logo;
    logo.alt = `${job.company} logo`;

    header.append(companyInfo, logo);

    const roleList = document.createElement("div");
    roleList.className = "role-list";

    job.roles.forEach((role) => {
      const roleBlock = document.createElement("section");
      roleBlock.className = "role-block";

      const roleTitle = document.createElement("h4");
      roleTitle.textContent = role.title;

      const rolePeriod = document.createElement("p");
      rolePeriod.textContent = role.period;

      const bullets = document.createElement("ul");
      role.bullets.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        bullets.appendChild(li);
      });

      roleBlock.append(roleTitle, rolePeriod, bullets);
      roleList.appendChild(roleBlock);
    });

    card.append(header, roleList);
    grid.appendChild(card);
  });

  section.appendChild(grid);
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
