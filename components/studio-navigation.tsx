"use client";

import { forwardRef, useEffect, type AnchorHTMLAttributes } from "react";
import { queueMenuNavigation } from "@/lib/section-navigation";
import "./studio-navigation.css";

// Same-document destinations use native anchors, including without JavaScript.
// Next's route navigation must not compete with the section transition.
export const SectionLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  (props, ref) => <a ref={ref} {...props} />
);
SectionLink.displayName = "SectionLink";

export function StudioNavigation() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let revision = 0;
    let arrival: Animation | undefined;
    let cancelMenu: (() => void) | undefined;
    let clearFocus: (() => void) | undefined;

    const cancel = () => {
      revision++;
      cancelAnimationFrame(frame);
      arrival?.cancel();
      arrival = undefined;
      cancelMenu?.();
      cancelMenu = undefined;
    };

    const navigate = (target: HTMLElement, hash: string, keyboard: boolean, skip: boolean) => {
      const current = revision;
      const headerHeight = document.querySelector(".studio-header")?.getBoundingClientRect().height ?? 80;
      const top = target.id === "top" || skip ? 0 : target.getBoundingClientRect().top + scrollY - headerHeight - 28;
      const destination = Math.max(0, Math.min(top, document.documentElement.scrollHeight - innerHeight));
      const start = scrollY;
      const distance = destination - start;
      const heading = target.querySelector<HTMLElement>("h1, h2") ?? target;
      const previouslySeen = !!heading.closest("[data-visible]");

      // Keep the router's existing state and the browser's own Back/Forward restoration.
      if (location.hash !== hash) history.pushState(history.state, "", hash);

      const finish = () => {
        if (revision !== current) return;
        clearFocus?.();
        const priorTabIndex = heading.getAttribute("tabindex");
        heading.tabIndex = -1;
        heading.dataset.navigationFocus = keyboard ? "keyboard" : "pointer";
        const cleanup = () => {
          if (priorTabIndex === null) heading.removeAttribute("tabindex");
          else heading.setAttribute("tabindex", priorTabIndex);
          delete heading.dataset.navigationFocus;
          heading.removeEventListener("blur", cleanup);
        };
        clearFocus = cleanup;
        heading.addEventListener("blur", cleanup, { once: true });
        heading.focus({ preventScroll: true });
        // Previously visited headings need only a quiet acknowledgement. New
        // sections already have an entrance owned by StudioMotion.
        if (previouslySeen && !skip && !preference.matches && Math.abs(distance) > 2) {
          arrival = heading.animate([{ opacity: .72 }, { opacity: 1 }], { duration: 180, easing: "ease-out" });
        }
      };

      // A long section jump should not fly past the entire document.
      if (skip || preference.matches || Math.abs(distance) > innerHeight * 1.15 || Math.abs(distance) < 2) {
        window.scrollTo({ top: destination, behavior: "instant" });
        frame = requestAnimationFrame(finish);
        return;
      }

      const duration = Math.min(360, Math.max(220, Math.abs(distance) * .35));
      let started: number | undefined;
      const step = (time: number) => {
        if (revision !== current) return;
        started ??= time;
        const progress = Math.min((time - started) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo({ top: start + distance * ease, behavior: "instant" });
        if (progress < 1) frame = requestAnimationFrame(step);
        else finish();
      };
      frame = requestAnimationFrame(step);
    };

    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href^='#']");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const hash = link.getAttribute("href")!;
      let id: string;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      // Bubble after Radix SheetClose has handled the click. Preventing the
      // child event earlier would suppress its automatic dismissal.
      event.preventDefault();
      cancel();
      const current = revision;
      const go = () => {
        if (revision === current) navigate(target, hash, event.detail === 0, link.classList.contains("studio-skip"));
      };
      if (link.closest("[data-studio-sheet]")) cancelMenu = queueMenuNavigation(go);
      else go();
    };
    const keydown = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Escape", "Tab"].includes(event.key)) cancel();
    };
    const preferenceChanged = () => { if (preference.matches) cancel(); };
    document.addEventListener("click", click);
    document.addEventListener("keydown", keydown);
    const interruptions = ["wheel", "touchstart", "pointerdown", "popstate", "hashchange", "resize", "pagehide"] as const;
    interruptions.forEach(type => window.addEventListener(type, cancel, { passive: true }));
    preference.addEventListener("change", preferenceChanged);
    return () => {
      cancel();
      clearFocus?.();
      document.removeEventListener("click", click);
      document.removeEventListener("keydown", keydown);
      interruptions.forEach(type => window.removeEventListener(type, cancel));
      preference.removeEventListener("change", preferenceChanged);
    };
  }, []);
  return null;
}
