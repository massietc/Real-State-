gsap.registerPlugin(ScrollTrigger);

/* Smooth scroll with Lenis */

const lenis = new Lenis({
  duration: 1.6,
  smoothWheel: true,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.2
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* Cursor */

const cursor = document.querySelector(".cursor");
const hoverElements = document.querySelectorAll("a, .gallery-item, .detail-card, .intro-image");

window.addEventListener("mousemove", (event) => {
  gsap.to(cursor, {
    x: event.clientX,
    y: event.clientY,
    duration: 0.22,
    ease: "power2.out"
  });
});

hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => cursor.classList.add("active"));
  element.addEventListener("mouseleave", () => cursor.classList.remove("active"));
});

/* Hero opening animation */

gsap.to(".hero-video", {
  scale: 1,
  duration: 3,
  ease: "power3.out"
});

gsap.to(".hero .reveal", {
  opacity: 1,
  y: 0,
  duration: 1.4,
  stagger: 0.18,
  ease: "power4.out",
  delay: 0.4
});

/* Text reveals */

gsap.utils.toArray(".reveal").forEach((item) => {
  if (item.closest(".hero")) return;

  gsap.to(item, {
    opacity: 1,
    y: 0,
    duration: 1.25,
    ease: "power4.out",
    scrollTrigger: {
      trigger: item,
      start: "top 82%",
      once: true
    }
  });
});

/* Image expansion */

gsap.utils.toArray(".image-expand").forEach((wrap) => {
  const img = wrap.querySelector("img");

  gsap.fromTo(
    wrap,
    {
      clipPath: "inset(18% 18% 18% 18%)"
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top 85%",
        end: "bottom 35%",
        scrub: true
      }
    }
  );

  gsap.to(img, {
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: wrap,
      start: "top 90%",
      end: "bottom 20%",
      scrub: true
    }
  });
});

/* Parallax images */

gsap.utils.toArray(".parallax-image img").forEach((img) => {
  gsap.to(img, {
    yPercent: -14,
    ease: "none",
    scrollTrigger: {
      trigger: img.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

/* Gallery reveal */

gsap.utils.toArray(".gallery-item").forEach((item, index) => {
  gsap.fromTo(
    item,
    {
      opacity: 0,
      y: 80,
      clipPath: "inset(12% 12% 12% 12%)"
    },
    {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      ease: "power4.out",
      delay: index * 0.08,
      scrollTrigger: {
        trigger: item,
        start: "top 82%",
        once: true
      }
    }
  );
});

/* Video parallax */

gsap.to(".video-section video", {
  scale: 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".video-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

/* Navigation hide/show effect */

let lastScroll = 0;
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 120) {
    gsap.to(nav, { y: -100, duration: 0.45, ease: "power3.out" });
  } else {
    gsap.to(nav, { y: 0, duration: 0.45, ease: "power3.out" });
  }

  lastScroll = currentScroll;
});
