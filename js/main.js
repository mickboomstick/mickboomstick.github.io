/* ============================================================
   Site behavior: renders project cards from PROJECTS (projects-data.js),
   handles the image-gallery modal, and the mobile nav toggle.
   ============================================================ */

(function () {
  const IMG_BASE = "assets/images/";
  const AUDIO_BASE = "assets/audio/";

  const listEl = document.getElementById("project-list");
  const overlay = document.getElementById("modal-overlay");
  const modalGallery = document.getElementById("modal-gallery");
  const modalBody = document.getElementById("modal-body");

  let activeProject = null;
  let activeImgIndex = 0;

  function slugifyTag(t) {
    return t
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function renderTags(tags) {
    return tags
      .map((t) => `<span class="tag" data-tag="${slugifyTag(t)}">${t}</span>`)
      .join("");
  }

  function renderCard(project, index) {
    const hasImages = project.images && project.images.length > 0;
    const thumbHTML = hasImages
      ? `<img src="${IMG_BASE}${project.images[0]}" alt="${project.title}" loading="lazy">
         ${project.images.length > 1 ? `<span class="count">1 / ${project.images.length}</span>` : ""}`
      : `<span>Image coming soon</span>`;

    const tagsHTML = renderTags(project.tags);
    const statusTag =
      project.status === "In Progress"
        ? `<span class="tag status">In Progress</span>`
        : "";

    const specsHTML = (project.specs || [])
      .map(
        (s) => `<div class="spec"><span class="k">${s.k}</span><span class="v">${s.v}</span></div>`
      )
      .join("");

    const card = document.createElement("article");
    card.className = "project-card reveal" + (index % 2 === 1 ? " alt" : "");
    card.style.transitionDelay = `${(index % 4) * 70}ms`;
    card.setAttribute("data-id", project.id);
    card.innerHTML = `
      <div class="thumb ${hasImages ? "" : "placeholder"}">${thumbHTML}</div>
      <div class="body">
        <div class="project-tags">${statusTag}${tagsHTML}</div>
        <h3>${project.title}</h3>
        <div class="project-date">${project.date}</div>
        <p class="desc">${project.summary}</p>
        ${specsHTML ? `<div class="specs">${specsHTML}</div>` : ""}
        <span class="read-more">View project</span>
      </div>
    `;
    card.addEventListener("click", () => openModal(project));
    return card;
  }

  function renderProjects() {
    if (!listEl) return;
    PROJECTS.forEach((p, i) => listEl.appendChild(renderCard(p, i)));
  }

  function renderTracks() {
    const trackListEl = document.getElementById("track-list");
    if (!trackListEl || typeof TRACKS === "undefined") return;

    TRACKS.forEach((t, i) => {
      const card = document.createElement("div");
      card.className = "track-card reveal";
      card.style.transitionDelay = `${(i % 4) * 70}ms`;
      card.innerHTML = `
        <div class="track-info">
          <span class="tag status">Unreleased</span>
          <h4>${t.title}</h4>
          <div class="track-sub">${t.subtitle}</div>
        </div>
        <audio controls preload="none" src="${AUDIO_BASE}${t.file}"></audio>
        <a class="track-dl" href="${AUDIO_BASE}${t.file}" download title="Download MP3">⬇</a>
      `;
      trackListEl.appendChild(card);
    });
  }

  function renderGallery() {
    const project = activeProject;
    const hasImages = project.images && project.images.length > 0;

    if (!hasImages) {
      modalGallery.innerHTML = `<div class="placeholder-img">Image coming soon</div>`;
      return;
    }

    const navHTML =
      project.images.length > 1
        ? `<div class="gnav prev" aria-label="Previous image">‹</div>
           <div class="gnav next" aria-label="Next image">›</div>
           <div class="gdots">${project.images
             .map((_, i) => `<span class="${i === activeImgIndex ? "active" : ""}"></span>`)
             .join("")}</div>`
        : "";

    modalGallery.innerHTML = `<img src="${IMG_BASE}${project.images[activeImgIndex]}" alt="${project.title}">${navHTML}`;

    if (project.images.length > 1) {
      modalGallery.querySelector(".prev").addEventListener("click", (e) => {
        e.stopPropagation();
        activeImgIndex = (activeImgIndex - 1 + project.images.length) % project.images.length;
        renderGallery();
      });
      modalGallery.querySelector(".next").addEventListener("click", (e) => {
        e.stopPropagation();
        activeImgIndex = (activeImgIndex + 1) % project.images.length;
        renderGallery();
      });
    }
  }

  function openModal(project) {
    activeProject = project;
    activeImgIndex = 0;
    renderGallery();

    const tagsHTML = renderTags(project.tags);
    const statusTag =
      project.status === "In Progress"
        ? `<span class="tag status">In Progress</span>`
        : "";
    const specsHTML = (project.specs || [])
      .map(
        (s) => `<div class="spec"><span class="k">${s.k}</span><span class="v">${s.v}</span></div>`
      )
      .join("");
    const detailsHTML = project.details.map((p) => `<p class="desc">${p}</p>`).join("");

    modalBody.innerHTML = `
      <div class="project-tags">${statusTag}${tagsHTML}</div>
      <h3>${project.title}</h3>
      <div class="project-date">${project.date}</div>
      ${detailsHTML}
      ${specsHTML ? `<div class="specs">${specsHTML}</div>` : ""}
    `;

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  // ---- Intro / title screen ----
  function initIntro() {
    const intro = document.getElementById("intro-screen");
    if (!intro) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      intro.classList.add("hide");
      document.body.classList.remove("intro-active");
      setTimeout(() => intro.remove(), prefersReduced ? 0 : 700);
    };
    if (prefersReduced) {
      finish();
    } else {
      setTimeout(finish, 1100);
    }
  }

  // ---- Scroll-triggered reveal animations ----
  function initScrollReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    els.forEach((el) => observer.observe(el));
  }

  // ---- Header shadow once the page has scrolled ----
  function initHeaderScroll() {
    const headerEl = document.querySelector("header");
    if (!headerEl) return;
    const update = () => headerEl.classList.toggle("scrolled", window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Mobile nav toggle
  const navToggle = document.getElementById("nav-toggle");
  const navEl = document.getElementById("main-nav");
  if (navToggle && navEl) {
    navToggle.addEventListener("click", () => navEl.classList.toggle("open"));
    navEl.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => navEl.classList.remove("open"))
    );
  }

  renderProjects();
  renderTracks();
  initIntro();
  initScrollReveal();
  initHeaderScroll();

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
