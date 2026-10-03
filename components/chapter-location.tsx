"use client";

import { useEffect, useState } from "react";

const chapters = [
  ["top", "Overview"],
  ["clients", "Our clients"],
  ["approach", "00 / Approach"],
  ["startups", "01 / Startups"],
  ["enterprises", "02 / Enterprises"],
  ["capabilities", "03 / Capabilities"],
  ["engagement", "04 / Partnership"],
  ["questions", "05 / Questions"],
  ["contact", "06 / Contact"]
] as const;

/** A quiet mobile location label; navigation itself remains native anchors. */
export function useCurrentChapter() {
  const [current, setCurrent] = useState<{ id: string; label: string }>({
    id: "top",
    label: "Overview"
  });
  useEffect(() => {
    const sections = chapters.map(([id, title]) => ({
      id,
      element: document.getElementById(id),
      title
    }));
    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold =
        (document.querySelector(".studio-header")?.getBoundingClientRect().height ?? 72) + 60;
      let next = { id: "top", label: "Overview" };
      for (const section of sections)
        if (section.element && section.element.getBoundingClientRect().top <= threshold)
          next = { id: section.id, label: section.title };
      setCurrent((previous) => (previous.id === next.id ? previous : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    update();
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return current;
}
