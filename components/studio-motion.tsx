"use client";

import { useEffect } from "react";

/** Progressive enhancement: every section stays readable without JavaScript. */
export function StudioMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".studio-home");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const targets = root.querySelectorAll<HTMLElement>(".studio-heading, .studio-card, .studio-clients > *, .studio-faq");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.dataset.visible = "true";
        observer.unobserve(element);
        if (preference.matches) return;
        const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
        const delay = element.classList.contains("studio-card") ? Math.min(siblings.indexOf(element), 3) * 65 : 0;
        const animation = element.animate([
          { opacity: 0, transform: "translateY(18px)" },
          { opacity: 1, transform: "translateY(0)" }
        ], { duration: 560, delay, easing: "cubic-bezier(.22,.7,.2,1)", fill: "backwards" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: .08, rootMargin: "0px 0px -24px 0px" });
    targets.forEach(target => observer.observe(target));
    const stopMotion = () => { if (preference.matches) animations.forEach(animation => animation.cancel()); };
    preference.addEventListener("change", stopMotion);

    // Native scrolling, with a quiet reading indicator and section location.
    const header = document.querySelector<HTMLElement>(".studio-header");
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".studio-header nav a[href^='#']"));
    const sections = links.map(link => document.getElementById(link.hash.slice(1)));
    let frame = 0;
    const updatePosition = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - innerHeight;
      header?.style.setProperty("--reading-progress", String(distance > 0 ? Math.min(scrollY / distance, 1) : 0));
      let active = -1;
      sections.forEach((section, index) => { if (section && section.getBoundingClientRect().top <= 180) active = index; });
      links.forEach((link, index) => {
        if (index === active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    const scheduleUpdate = () => { if (!frame) frame = requestAnimationFrame(updatePosition); };
    addEventListener("scroll", scheduleUpdate, { passive: true });
    addEventListener("resize", scheduleUpdate);
    updatePosition();
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener("change", stopMotion);
      removeEventListener("scroll", scheduleUpdate);
      removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(frame);
      links.forEach(link => link.removeAttribute("aria-current"));
      header?.style.removeProperty("--reading-progress");
    };
  }, []);
  return null;
}
