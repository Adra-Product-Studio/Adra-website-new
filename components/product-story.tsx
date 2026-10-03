"use client";

import { useEffect, useId, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Pause, Play, RotateCcw } from "lucide-react";

import styles from "./product-story.module.css";

const STAGE_DURATION = 5600;
const stages = [
  { id: "align", label: "Align", title: "A question becomes a shared direction.", description: "Goals, users, and success measures—in one clear brief." },
  { id: "shape", label: "Shape", title: "The direction becomes something you can try.", description: "Priorities, prototypes, and a roadmap shaped by feedback." },
  { id: "ship", label: "Ship", title: "The plan becomes a working product.", description: "Build in short cycles. Review progress, spend, and risks together." },
  { id: "handoff", label: "Handoff", title: "The product becomes yours to build on.", description: "Code, documentation, and team walkthroughs for lasting ownership." }
] as const;

function StoryArtwork({ stage }: { stage: number }) {
  const id = useId().replace(/:/g, "");
  const shadow = `url(#paper-shadow-${id})`;
  const paper = `url(#paper-${id})`;

  return (
    <svg viewBox="0 0 480 312" className={styles.artwork} aria-hidden="true">
      <defs>
        <filter id={`paper-shadow-${id}`} x="-35%" y="-35%" width="170%" height="190%">
          <feDropShadow dx="0" dy="10" stdDeviation="11" floodColor="#000" floodOpacity=".17" />
        </filter>
        <linearGradient id={`paper-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fffefa" />
          <stop offset="1" stopColor="#f2efe7" />
        </linearGradient>
      </defs>

      <path d="M18 39V20h19 M443 20h19v19 M18 273v19h19 M443 292h19v-19" className={styles.registration} />

      {stage === 0 && (
        <>
          <g className={styles.connections} fill="none" stroke="#d9b786" strokeWidth="1.5" strokeDasharray="4 5">
            <path d="M104 104H155 M357 93H316 M367 244H311" />
          </g>
          <g className={styles.note}>
            <g transform="translate(18 68) rotate(-9 52 33)" filter={shadow}>
              <rect width="110" height="70" rx="5" fill="#eecf9f" />
              <text x="14" y="29" className={styles.noteTitle}>Who?</text>
              <path d="M14 43h71 M14 51h48" stroke="#796649" strokeWidth="2" opacity=".45" strokeLinecap="round" />
            </g>
          </g>
          <g className={`${styles.note} ${styles.noteTwo}`}>
            <g transform="translate(357 57) rotate(8 50 34)" filter={shadow}>
              <rect width="104" height="72" rx="5" fill="#d8e1db" />
              <text x="14" y="30" className={styles.noteTitle}>Why?</text>
              <path d="M14 44h64 M14 53h44" stroke="#51655b" strokeWidth="2" opacity=".45" strokeLinecap="round" />
            </g>
          </g>
          <g className={`${styles.note} ${styles.noteThree}`}>
            <g transform="translate(350 213) rotate(-6 54 32)" filter={shadow}>
              <rect width="110" height="67" rx="5" fill="#e3ddd3" />
              <text x="14" y="28" className={styles.noteTitle}>What?</text>
              <path d="M14 42h67 M14 51h42" stroke="#756d62" strokeWidth="2" opacity=".45" strokeLinecap="round" />
            </g>
          </g>
          <g className={styles.brief} filter={shadow}>
            <rect x="139" y="31" width="202" height="250" rx="10" fill={paper} stroke="#e2ded5" />
            <path d="M157 54h20" stroke="#b79b75" strokeWidth="3" strokeLinecap="round" />
            <text x="157" y="78" className={styles.paperEyebrow}>PRODUCT BRIEF</text>
            <text x="157" y="111" className={styles.paperTitle}>One clear</text>
            <text x="157" y="138" className={styles.paperTitle}>direction.</text>
            {[["Audience", 173], ["Success", 207], ["Constraints", 241]].map(([label, y], i) => (
              <g key={label} className={styles.ink} style={{ animationDelay: `${.9 + i * .22}s` }}>
                <circle cx="162" cy={Number(y) - 4} r="5" fill="#ddc39f" />
                <text x="176" y={y} className={styles.paperLabel}>{label}</text>
                <path d={`M176 ${Number(y) + 9}h${i === 0 ? 111 : i === 1 ? 89 : 101}`} stroke="#d8d3c9" strokeWidth="2" strokeLinecap="round" />
              </g>
            ))}
          </g>
        </>
      )}

      {stage === 1 && (
        <>
          <g className={styles.window} filter={shadow}>
            <rect x="55" y="39" width="370" height="239" rx="12" fill={paper} stroke="#e2ded5" />
            <path d="M55 72h370" stroke="#e2ded5" />
            <circle cx="74" cy="56" r="3" fill="#c4bbaa" /><circle cx="85" cy="56" r="3" fill="#d4cec2" /><circle cx="96" cy="56" r="3" fill="#e1dcd2" />
            <text x="406" y="59" textAnchor="end" className={styles.paperEyebrow}>THE BLUEPRINT</text>
            <text x="78" y="110" className={styles.screenTitle}>Map the experience.</text>
            <g className={styles.draw} fill="none" stroke="#b29a7a" strokeWidth="1.7" pathLength="1">
              <path d="M160 175h38m-5-5 5 5-5 5 M282 175h38m-5-5 5 5-5 5" />
              <path d="M361 217v19H120v-19m-5 5 5-5 5 5" strokeDasharray="4 5" />
            </g>
            {[{ x: 80, text: "Start", delay: ".35s" }, { x: 201, text: "Decide", delay: ".6s" }, { x: 322, text: "Done", delay: ".85s" }].map((item, i) => (
              <g key={item.text} className={styles.flowCard} style={{ animationDelay: item.delay }}>
                <rect x={item.x} y="138" width="78" height="78" rx="9" fill={i === 1 ? "#eee1ca" : "#fffefa"} stroke={i === 1 ? "#c9ad85" : "#d8d3c9"} />
                {i === 0 ? <circle cx={item.x + 39} cy="163" r="8" fill="none" stroke="#756959" strokeWidth="1.5" /> : i === 1 ? <path d={`M${item.x + 39} 154l9 9-9 9-9-9z`} fill="none" stroke="#756959" strokeWidth="1.5" /> : <path d={`M${item.x + 31} 164l6 6 10-12`} fill="none" stroke="#756959" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />}
                <text x={item.x + 39} y="194" textAnchor="middle" className={styles.paperLabel}>{item.text}</text>
              </g>
            ))}
            <text x="240" y="259" textAnchor="middle" className={styles.paperSmall}>Prototype. Test the idea. Refine.</text>
          </g>
          <g className={styles.stamp}>
            <g transform="translate(27 242) rotate(-8)">
              <rect width="74" height="31" rx="5" fill="#d8e1db" stroke="#bccbc1" />
              <text x="37" y="20" textAnchor="middle" className={styles.stampLabel}>TRY IT ↗</text>
            </g>
          </g>
        </>
      )}

      {stage === 2 && (
        <>
          <g className={styles.window} filter={shadow}>
            <rect x="55" y="34" width="370" height="248" rx="12" fill={paper} stroke="#e2ded5" />
            <path d="M55 68h370" stroke="#e2ded5" />
            <circle cx="74" cy="51" r="3" fill="#c4bbaa" /><circle cx="85" cy="51" r="3" fill="#d4cec2" /><circle cx="96" cy="51" r="3" fill="#e1dcd2" />
            <text x="406" y="54" textAnchor="end" className={styles.paperEyebrow}>YOUR PRODUCT</text>
            <path d="M114 68v214" stroke="#e2ded5" />
            <rect x="74" y="90" width="21" height="21" rx="6" fill="#282b28" />
            <path d="M80 101h9 M84.5 96.5v9" stroke="#f5f2eb" strokeWidth="1.3" />
            <path d="M75 132h20 M75 152h13 M75 172h18 M75 248h20" stroke="#d2ccbf" strokeWidth="3" strokeLinecap="round" />
            <text x="135" y="102" className={styles.screenTitle}>Ready for real work.</text>
            <g className={`${styles.flowCard} ${styles.productMain}`}>
              <rect x="134" y="121" width="270" height="71" rx="9" fill="#f0ebe2" stroke="#e0d9cd" />
              <circle cx="154" cy="142" r="7" fill="#d9b786" />
              <text x="171" y="145" className={styles.paperLabel}>First release</text>
              <text x="149" y="166" className={styles.paperSmall}>The core journey, working.</text>
              <rect x="149" y="178" width="237" height="3" rx="1.5" fill="#dfd8cc" />
              <path d="M149 179.5h237" className={styles.buildLine} stroke="#9b8668" strokeWidth="3" strokeLinecap="round" />
            </g>
            {[{ x: 134, label: "Built", delay: ".9s" }, { x: 276, label: "Tested", delay: "1.3s" }].map(item => (
              <g key={item.label} className={styles.flowCard} style={{ animationDelay: item.delay }}>
                <rect x={item.x} y="205" width="128" height="56" rx="9" fill="#fffefa" stroke="#ded8cd" />
                <circle cx={item.x + 22} cy="233" r="10" fill="#dce5de" />
                <path d={`M${item.x + 17} 233l3 3 6-7`} fill="none" stroke="#537061" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x={item.x + 40} y="237" className={styles.paperLabel}>{item.label}</text>
              </g>
            ))}
          </g>
          <g className={`${styles.stamp} ${styles.releaseStamp}`}>
            <g transform="translate(327 269) rotate(-5)">
              <rect width="109" height="30" rx="5" fill="#d8e1db" stroke="#bccbc1" />
              <text x="54.5" y="19" textAnchor="middle" className={styles.stampLabel}>RELEASE READY</text>
            </g>
          </g>
        </>
      )}

      {stage === 3 && (
        <>
          <g className={styles.handoffBack} filter={shadow}>
            <rect x="126" y="37" width="228" height="190" rx="10" fill={paper} stroke="#e2ded5" />
            <path d="M126 68h228" stroke="#e2ded5" />
            <circle cx="143" cy="53" r="3" fill="#c4bbaa" /><circle cx="154" cy="53" r="3" fill="#d4cec2" />
            <text x="337" y="56" textAnchor="end" className={styles.paperEyebrow}>YOUR PRODUCT</text>
          </g>
          <path d="M78 184a9 9 0 0 1 9-9h118l16 12h172a9 9 0 0 1 9 9v81H78z" fill="#bda27d" className={styles.folderBack} />
          <g className={`${styles.file} ${styles.fileOne}`}>
            <g transform="rotate(-9 135 182)" filter={shadow}>
              <rect x="82" y="107" width="106" height="143" rx="8" fill="#f6f2e9" stroke="#d5cdbd" />
              <path d="M117 130l-7 7 7 7m19-14 7 7-7 7m-8-16-4 18" fill="none" stroke="#897459" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="104" y="170" className={styles.fileTitle}>Code</text>
              <path d="M104 184h54 M104 194h38" stroke="#d3cabc" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
          <g className={`${styles.file} ${styles.fileTwo}`}>
            <g filter={shadow}>
              <rect x="187" y="88" width="106" height="157" rx="8" fill="#fffefa" stroke="#d5cdbd" />
              <path d="M215 109h16l8 8v20h-24zm16 0v8h8m-18 8h12m-12 6h9" fill="none" stroke="#897459" strokeWidth="1.6" strokeLinejoin="round" />
              <text x="207" y="158" className={styles.fileTitle}>Docs</text>
              <path d="M207 172h55 M207 182h39" stroke="#d3cabc" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
          <g className={`${styles.file} ${styles.fileThree}`}>
            <g transform="rotate(9 344 182)" filter={shadow}>
              <rect x="292" y="107" width="106" height="143" rx="8" fill="#e8eee8" stroke="#c4d0c5" />
              <path d="M316 128h26v18h-15l-7 6v-6h-4zm6 6h14m-14 6h9" fill="none" stroke="#617968" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <text x="311" y="170" className={styles.fileTitle}>Context</text>
              <path d="M311 184h54 M311 194h38" stroke="#c5d2c6" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
          <g className={styles.folderFront} filter={shadow}>
            <path d="M78 207a10 10 0 0 1 10-10h99l18 13h187a10 10 0 0 1 10 10v57a10 10 0 0 1-10 10H88a10 10 0 0 1-10-10z" fill="#e3c498" stroke="#d1af7f" />
            <path d="M98 227h24" stroke="#aa8757" strokeWidth="3" strokeLinecap="round" />
            <text x="98" y="261" className={styles.folderTitle}>Yours to build on.</text>
            <circle cx="369" cy="249" r="15" fill="#f4e5cd" />
            <path d="M363 249h12m-5-5 5 5-5 5" fill="none" stroke="#735b3c" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </>
      )}
    </svg>
  );
}

export function ProductStory() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const figureRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!motion.matches);
    const updateMotion = () => { if (motion.matches) setPlaying(false); };
    const updateVisibility = () => setPageVisible(document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    if (figureRef.current) observer.observe(figureRef.current);
    motion.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    updateVisibility();
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${elapsedRef.current / STAGE_DURATION})`;
    if (!playing || !visible || !pageVisible) return;
    let frame: number;
    let previous: number | undefined;
    const tick = (time: number) => {
      if (previous !== undefined) elapsedRef.current += time - previous;
      previous = time;
      const progress = Math.min(elapsedRef.current / STAGE_DURATION, 1);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      if (progress >= 1) {
        if (active === stages.length - 1) {
          setPlaying(false);
          setFinished(true);
        } else {
          elapsedRef.current = 0;
          setActive(active + 1);
        }
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, playing, visible, pageVisible]);

  const selectStage = (id: string) => {
    elapsedRef.current = 0;
    setActive(stages.findIndex(stage => stage.id === id));
    setPlaying(false);
    setFinished(false);
    if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
  };

  const togglePlayback = () => {
    if (finished) {
      elapsedRef.current = 0;
      setActive(0);
      setFinished(false);
    }
    setPlaying(value => !value);
  };

  return (
    <figure ref={figureRef} className={styles.story} aria-label="How Adra turns business goals into a product">
      <figcaption className={styles.header}>
        <div className={styles.topline}>
          <p className={styles.eyebrow}><span aria-hidden="true" />Adra, in the making</p>
          <button type="button" onClick={togglePlayback} className={styles.playback} aria-label={finished ? "Replay story" : playing ? "Pause story" : "Play story"}>
            {finished ? <RotateCcw aria-hidden="true" /> : playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            <span>{finished ? "Replay" : playing ? "Pause" : "Play"}</span>
          </button>
        </div>
        <h2>From brief to built.</h2>
        <p className={styles.intro}>A shared direction. A product you own.</p>
      </figcaption>

      <Tabs.Root value={stages[active].id} onValueChange={selectStage}>
        {stages.map((stage, index) => (
          <Tabs.Content key={stage.id} value={stage.id} className={styles.panel}>
            <div className={styles.canvas}><StoryArtwork stage={index} /></div>
            <div className={styles.caption}>
              <p className={styles.chapter}>0{index + 1} / {stage.label}</p>
              <h3>{stage.title}</h3>
              <p className={styles.description}>{stage.description}</p>
            </div>
          </Tabs.Content>
        ))}

        <Tabs.List className={styles.stages} aria-label="Choose a stage of the product story">
          {stages.map((stage, index) => (
            <Tabs.Trigger key={stage.id} value={stage.id} className={styles.stage}>
              <span className={styles.track} aria-hidden="true"><span ref={index === active ? progressRef : undefined} style={{ transform: `scaleX(${index < active ? 1 : 0})` }} /></span>
              <span className={styles.stageLabel}><span aria-hidden="true">0{index + 1}</span>{stage.label}</span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
      <p className={styles.footer}>Built together. Improved in short cycles.</p>
    </figure>
  );
}
