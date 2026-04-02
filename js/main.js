/**
 * كرادة داين - Karrada Dine
 * Main JavaScript file
 */

document.addEventListener("DOMContentLoaded", function () {
  initNavbar();
  initHeroSlider();
  initMobileMenu();
  initBackToTop();
  initScrollAnimations();
  initSmoothScroll();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
  var navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/**
 * Hero image slider
 */
function initHeroSlider() {
  var slides = document.querySelectorAll(".hero-slide");
  var indicators = document.querySelectorAll(".indicator");
  var currentSlide = 0;

  if (slides.length === 0) return;

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    indicators[currentSlide].classList.remove("active");
    currentSlide = index;
    slides[currentSlide].classList.add("active");
    indicators[currentSlide].classList.add("active");
  }

  function nextSlide() {
    var next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  indicators.forEach(function (indicator, index) {
    indicator.addEventListener("click", function () {
      goToSlide(index);
    });
  });

  setInterval(nextSlide, 5000);
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  var toggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    toggle.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      toggle.classList.remove("active");
    });
  });

  document.addEventListener("click", function (e) {
    if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
      navLinks.classList.remove("active");
      toggle.classList.remove("active");
    }
  });
}

/**
 * Back to top button
 */
function initBackToTop() {
  var btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * Scroll animations using IntersectionObserver
 */
function initScrollAnimations() {
  var elements = document.querySelectorAll(
    ".feature-card, .review-card, .menu-card, .times-card, .contact-card"
  );

  if (!("IntersectionObserver" in window)) {
    elements.forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    return;
  }

  elements.forEach(function (el) {
    el.classList.add("animate-on-scroll");
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href === "#") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        var offset = document.getElementById("navbar").offsetHeight + 20;
        var position = target.offsetTop - offset;
        window.scrollTo({ top: position, behavior: "smooth" });
      }
    });
  });
}
