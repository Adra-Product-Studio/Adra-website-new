"use client";

import { useEffect } from "react";

/** Progressive enhancement: every section stays readable without JavaScript. */
export function StudioMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".studio-home");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const enter = (element: HTMLElement, delay = 0, distance = 8) => {
      if (preference.matches || typeof element.animate !== "function") return;
      const animation = element.animate(
        [
          { opacity: 0, transform: `translateY(${distance}px)` },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 440, delay, easing: "cubic-bezier(.22,.7,.2,1)", fill: "backwards" }
      );
      animations.add(animation);
      const release = () => animations.delete(animation);
      animation.onfinish = release;
      animation.oncancel = release;
    };
    // Introduce the copy once; the illustrated story keeps the visual emphasis.
    root
      .querySelectorAll<HTMLElement>(".studio-hero .grid > div:first-child > *")
      .forEach((element, index) => enter(element, index * 40, 6));
    const targets = root.querySelectorAll<HTMLElement>(
      ".studio-heading, .studio-card, .studio-clients > *, .studio-faq, .dd-section-intro, .dd-situation-copy, .dd-questions-grid > div:first-child, .dd-contact > .dd-wrap"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.dataset.visible = "true";
          observer.unobserve(element);
          if (preference.matches) return;
          const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
          const sameRow = siblings.filter(
            (sibling) =>
              Math.abs(sibling.getBoundingClientRect().top - element.getBoundingClientRect().top) <
              20
          );
          const delay = Math.min(Math.max(sameRow.indexOf(element), 0), 3) * 35;
          enter(element, delay, element.classList.contains("studio-faq") ? 0 : 8);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    targets.forEach((target) => observer.observe(target));
    const stopMotion = () => {
      if (preference.matches) animations.forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", stopMotion);
    const revealFocused = (event: FocusEvent) => {
      animations.forEach((animation) => {
        const effect = animation.effect as KeyframeEffect | null;
        if (effect?.target?.contains(event.target as Node)) animation.cancel();
      });
    };
    root.addEventListener("focusin", revealFocused);

    // Native scrolling, with a quiet reading indicator and section location.
    const header = document.querySelector<HTMLElement>(".studio-header");
    const links = header?.hasAttribute("data-chapter-navigation")
      ? []
      : Array.from(document.querySelectorAll<HTMLAnchorElement>(".studio-header nav a[href^='#']"));
    const sections = links.map((link) => document.getElementById(link.hash.slice(1)));
    let frame = 0;
    const updatePosition = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - innerHeight;
      header?.style.setProperty(
        "--reading-progress",
        String(distance > 0 ? Math.min(scrollY / distance, 1) : 0)
      );
      let active = -1;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= 180) active = index;
      });
      links.forEach((link, index) => {
        if (index === active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updatePosition);
    };
    addEventListener("scroll", scheduleUpdate, { passive: true });
    addEventListener("resize", scheduleUpdate);
    updatePosition();
    return () => {
      observer.disconnect();
      root.removeEventListener("focusin", revealFocused);
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", stopMotion);
      removeEventListener("scroll", scheduleUpdate);
      removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(frame);
      links.forEach((link) => link.removeAttribute("aria-current"));
      header?.style.removeProperty("--reading-progress");
    };
  }, []);
  return null;
}
