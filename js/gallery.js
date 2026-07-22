/** Creates a gallery section with cards, mini carousels, and expandable modal view. */
export function createGallerySection(config) {
  const section = createBaseSection(config.title, config.subtitle);

  const items = config.items.length
    ? config.items
    : [
        {
          title: "Coming Soon",
          shortDescription: "This section will be filled soon.",
          longDescription: "More details will be added once content is ready.",
          images: ["./imgs/a_turtle.jpeg", "./imgs/a_turtle.jpeg", "./imgs/a_turtle.jpeg"],
          videoURLs: [],
          href: "#",
        },
      ];

  const grid = document.createElement("div");
  grid.className = "gallery-grid";

  const overlay = createModalOverlay();
  document.body.appendChild(overlay);

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "gallery-card";

    const carousel = createCarousel(getCarouselMedia(item), 180);

    const content = document.createElement("div");
    content.className = "card-content";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.shortDescription;

    content.append(title, description);
    card.append(carousel.wrap, content);

    card.addEventListener("click", () => {
      showModal(overlay, item, config.linkLabel);
    });

    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

/** Creates left-right image navigation for a local image array. */
function createCarousel(images, height) {
  const wrap = document.createElement("div");
  wrap.className = "carousel";
  wrap.style.height = `${height}px`;

  const left = document.createElement("button");
  left.className = "carousel-btn left";
  left.type = "button";
  left.textContent = "<";

  const right = document.createElement("button");
  right.className = "carousel-btn right";
  right.type = "button";
  right.textContent = ">";

  let index = 0;
  let currentContent = null;

  const update = () => {
    const media = images[index];
    const nextContent = createCarouselMediaElement(media);

    if (currentContent) {
      currentContent.remove();
    }

    currentContent = nextContent;
    wrap.insertBefore(currentContent, left);
  };

  left.addEventListener("click", (event) => {
    event.stopPropagation();
    index = (index - 1 + images.length) % images.length;
    update();
  });

  right.addEventListener("click", (event) => {
    event.stopPropagation();
    index = (index + 1) % images.length;
    update();
  });

  wrap.append(left, right);
  update();
  return { wrap, update };
}

/** Returns carousel media with videos first, then images. */
function getCarouselMedia(item) {
  const videos = Array.isArray(item.videoURLs)
    ? item.videoURLs.map((url) => ({ type: "video", src: url }))
    : [];

  const images = Array.isArray(item.images)
    ? item.images.map((src) => ({ type: "image", src }))
    : [];

  const media = [...videos, ...images];

  if (!media.length) {
    media.push({ type: "image", src: "./imgs/a_turtle.jpeg" });
  }

  return media;
}

/** Creates a carousel slide element for either an image or a YouTube video. */
function createCarouselMediaElement(media) {
  const slide = document.createElement("div");
  slide.className = "carousel-media";

  if (media.type === "video") {
    const iframe = document.createElement("iframe");
    iframe.src = toYoutubeEmbedUrl(media.src);
    iframe.title = "YouTube video";
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    slide.appendChild(iframe);
    return slide;
  }

  const image = document.createElement("img");
  image.src = media.src;
  image.alt = "Gallery preview";
  slide.appendChild(image);
  return slide;
}

/** Creates the shared fullscreen overlay used by the modal. */
function createModalOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeModal(overlay);
    }
  });

  return overlay;
}

/** Renders modal details for one selected item and opens the overlay. */
function showModal(overlay, item, linkLabel) {
  overlay.innerHTML = "";
  overlay.classList.add("show");
  document.body.classList.add("modal-open");

  const modal = document.createElement("div");
  modal.className = "modal";

  const close = document.createElement("button");
  close.className = "modal-close";
  close.type = "button";
  close.textContent = "Close";
  close.addEventListener("click", () => {
    closeModal(overlay);
  });

  const body = document.createElement("div");
  body.className = "modal-body";

  const title = document.createElement("h3");
  title.textContent = item.title;

  const carousel = createCarousel(getCarouselMedia(item), getModalCarouselHeight());

  const details = document.createElement("div");
  details.className = "modal-rich-text";
  details.innerHTML = renderMarkdown(item.longDescription || "");

  body.append(title, carousel.wrap, details);

  // Only show an outbound link if this item actually has a usable URL.
  if (item.href && item.href !== "#") {
    const link = document.createElement("a");
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = linkLabel;
    body.appendChild(link);
  }

  modal.append(close, body);
  overlay.appendChild(modal);
}

/** Converts common YouTube URL forms into an embeddable URL. */
function toYoutubeEmbedUrl(url) {
  if (!url) {
    return "";
  }

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }
    }
  } catch {
    return "";
  }

  return "";
}

/** Renders a small subset of Markdown into safe HTML for modal details. */
function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const htmlParts = [];
  let paragraph = [];
  let listItems = [];

  const flushParagraph = () => {
    if (!paragraph.length) {
      return;
    }

    htmlParts.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) {
      return;
    }

    const items = listItems.map((item) => `<li>${renderInline(item)}</li>`).join("");
    htmlParts.push(`<ul>${items}</ul>`);
    listItems = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      htmlParts.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
      return;
    }

    const listMatch = line.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1]);
      return;
    }

    paragraph.push(line);
  });

  flushParagraph();
  flushList();

  return htmlParts.join("");
}

/** Renders inline markdown syntax while escaping unsupported HTML. */
function renderInline(text) {
  let safe = escapeHtml(text);

  safe = safe.replace(/`([^`]+)`/g, "<code>$1</code>");
  safe = safe.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  safe = safe.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  safe = safe.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, href) => {
    if (!isSafeHref(href)) {
      return label;
    }

    return `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`;
  });

  return safe;
}

/** Escapes HTML-significant characters before markdown formatting transforms. */
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Allows only common safe link patterns in markdown links. */
function isSafeHref(href) {
  return /^(https?:\/\/|mailto:|\.\/|\/|#)/i.test(href);
}

/** Returns a responsive image height for the expanded modal carousel. */
function getModalCarouselHeight() {
  const viewportHeight = window.innerHeight;
  const scaledHeight = Math.round(viewportHeight * 0.72);
  return Math.max(320, Math.min(scaledHeight, 900));
}

/** Closes the modal overlay and restores background page scrolling. */
function closeModal(overlay) {
  overlay.classList.remove("show");
  overlay.innerHTML = "";
  document.body.classList.remove("modal-open");
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
