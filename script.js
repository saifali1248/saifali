/**
 * The Grinders Karrada - Main Script
 * Handles navigation, menu tabs, scroll animations, and interactivity.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initMenuTabs();
  initScrollAnimations();
  initSmoothScroll();
});

/**
 * Navbar scroll effect — adds a solid background on scroll.
 */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/**
 * Mobile hamburger menu toggle.
 */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    links.classList.toggle("open");
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      links.classList.remove("open");
    });
  });
}

/**
 * Menu section tab switching.
 */
function initMenuTabs() {
  const tabs = document.querySelectorAll(".menu-tab");
  const panels = document.querySelectorAll(".menu-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");

      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      const panel = document.getElementById(`tab-${target}`);
      if (panel) {
        panel.classList.add("active");
      }
    });
  });
}

/**
 * Intersection Observer for fade-up scroll animations.
 */
function initScrollAnimations() {
  const selectors = [
    ".section-header",
    ".about-content",
    ".about-images",
    ".menu-card",
    ".gallery-item",
    ".review-card",
    ".info-card",
    ".times-chart",
    ".cta-card",
  ];

  const elements = document.querySelectorAll(selectors.join(","));

  elements.forEach((el) => {
    el.classList.add("fade-up");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/**
 * Smooth scrolling for anchor links with offset for fixed navbar.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = 80;
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  });
}
