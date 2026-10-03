"use client";

import { useEffect } from "react";

/** Content is visible by default; motion marks a new chapter without moving the page. */
export function EditorialMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".editorial-home");
    if (!root) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const targets = root.querySelectorAll<HTMLElement>("[data-editorial-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.dataset.visible = "true";
          observer.unobserve(element);
          if (preference.matches || typeof element.animate !== "function") return;
          const animation = element.animate(
            [
              { opacity: 0.35, transform: "translateY(9px)" },
              { opacity: 1, transform: "translateY(0)" }
            ],
            { duration: 520, easing: "cubic-bezier(.22,.7,.2,1)" }
          );
          animations.add(animation);
          animation.onfinish = animation.oncancel = () => animations.delete(animation);
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((target) => observer.observe(target));
    const nav = document.querySelector<HTMLElement>(".e-desktop-index");
    const rule = nav?.querySelector<HTMLElement>(".e-index-rule");
    const sections = [
      "approach",
      "startups",
      "enterprises",
      "capabilities",
      "engagement",
      "contact"
    ]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => !!element);
    let frame = 0;
    let settle = 0;
    let selected = "";
    let deliberate = false;
    const mark = (id: string, animate = false) => {
      const links = document.querySelectorAll<HTMLAnchorElement>(
        ".e-header nav a[href^='#'], .e-contents nav a[href^='#']"
      );
      links.forEach((link) => {
        if (link.hash === `#${id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      const link = nav?.querySelector<HTMLAnchorElement>(`a[href='#${id}']`);
      if (!nav || !rule) return;
      nav.dataset.moving = String(animate && !preference.matches);
      if (!link) {
        rule.style.opacity = "0";
        return;
      }
      const parentRect = nav.getBoundingClientRect();
      const rect = link.getBoundingClientRect();
      rule.style.width = `${rect.width}px`;
      rule.style.transform = `translateX(${rect.left - parentRect.left}px)`;
      rule.style.opacity = "1";
    };
    const update = () => {
      frame = 0;
      if (deliberate) return;
      const current =
        sections.filter((section) => section.getBoundingClientRect().top <= 190).at(-1)?.id ?? "";
      if (current !== selected) {
        selected = current;
        mark(current);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const reconcile = () => {
      deliberate = false;
      clearTimeout(settle);
      if (nav) nav.dataset.moving = "false";
      update();
    };
    const resize = () => {
      reconcile();
      mark(selected);
    };
    const keydown = (event: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
          "Escape",
          "Tab"
        ].includes(event.key)
      )
        reconcile();
    };
    const click = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        ".e-desktop-index a[href^='#']"
      );
      if (
        !link ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      deliberate = true;
      selected = link.hash.slice(1);
      mark(selected, true);
      clearTimeout(settle);
      settle = window.setTimeout(reconcile, 440);
    };
    // Radix mounts the contents panel in a portal after this effect. Apply the
    // current chapter to new menu links without waiting for another scroll.
    const menuObserver = new MutationObserver((records) => {
      if (
        records.some((record) =>
          Array.from(record.addedNodes).some(
            (node) =>
              node instanceof Element &&
              (node.matches(".e-contents") ||
                node.querySelector(".e-contents") ||
                node.closest(".e-contents"))
          )
        )
      )
        mark(selected);
    });
    menuObserver.observe(document.body, { childList: true, subtree: true });
    const interruptions = [
      "wheel",
      "touchstart",
      "pointerdown",
      "popstate",
      "hashchange",
      "pagehide"
    ] as const;
    interruptions.forEach((event) => addEventListener(event, reconcile, { passive: true }));
    const stopMotion = () => {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        reconcile();
      }
    };
    const focus = (event: FocusEvent) =>
      animations.forEach((animation) => {
        if ((animation.effect as KeyframeEffect | null)?.target?.contains(event.target as Node))
          animation.cancel();
      });
    document.addEventListener("click", click, true);
    document.addEventListener("keydown", keydown);
    root.addEventListener("focusin", focus);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", resize);
    preference.addEventListener("change", stopMotion);
    update();
    return () => {
      observer.disconnect();
      menuObserver.disconnect();
      interruptions.forEach((event) => removeEventListener(event, reconcile));
      document.removeEventListener("keydown", keydown);
      animations.forEach((animation) => animation.cancel());
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      document.removeEventListener("click", click, true);
      root.removeEventListener("focusin", focus);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", resize);
      preference.removeEventListener("change", stopMotion);
    };
  }, []);
  return null;
}
