"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./process-vignette.module.css";

type VignetteKind = "startup" | "enterprise" | "ownership";
const DURATION = 4000;
const stories: Record<VignetteKind, { index: string; title: string; detail: string }> = {
  startup: {
    index: "01",
    title: "A smaller first release. A clearer next decision.",
    detail:
      "Illustrative sequence: customer, scope, and constraint questions become a working brief. The roadmap starts with testing an assumption, then the core journey. Integrations move deliberately into Later. Budget, team, and the next review remain part of the plan."
  },
  enterprise: {
    index: "02",
    title: "One shared review. Room to change the plan.",
    detail:
      "Illustrative sequence: product, technology, and operations workstreams align for a release review with a named owner. Existing systems stay in view. A pilot is reviewed before a decision to expand or revise; readiness is not assumed."
  },
  ownership: {
    index: "03",
    title: "The work continues. The knowledge stays with you.",
    detail:
      "Illustrative sequence: code, decisions, a runbook, and team knowledge assemble into an indexed product record. Shared work becomes client ownership, with continued support available by agreement."
  }
};

function StartupArtwork() {
  return (
    <>
      <text x="26" y="31" className={styles.overline}>
        QUESTIONS → CHOICES
      </text>
      <text x="534" y="31" textAnchor="end" className={styles.micro}>
        WORKING PLAN / 01
      </text>
      <path d="M26 44H534" className={styles.hairline} />

      <g className={styles.briefSheet}>
        <path d="M26 65H186L209 88V253H26Z" className={styles.paper} />
        <path d="M186 65V88H209" className={styles.fold} />
        <text x="43" y="91" className={styles.paperHeading}>
          Working brief
        </text>
        <path d="M43 103H190" className={styles.hairline} />
      </g>
      <g className={`${styles.question} ${styles.customerQuestion}`}>
        <rect x="42" y="115" width="151" height="36" className={styles.slip} />
        <text x="52" y="129" className={styles.micro}>
          CUSTOMER
        </text>
        <text x="52" y="143" className={styles.label}>
          Who needs this?
        </text>
      </g>
      <g className={`${styles.question} ${styles.scopeQuestion}`}>
        <rect x="42" y="158" width="151" height="36" className={styles.slip} />
        <text x="52" y="172" className={styles.micro}>
          SCOPE
        </text>
        <text x="52" y="186" className={styles.label}>
          What matters first?
        </text>
      </g>
      <g className={`${styles.question} ${styles.constraintQuestion}`}>
        <rect x="42" y="201" width="151" height="36" className={styles.slip} />
        <text x="52" y="215" className={styles.micro}>
          CONSTRAINT
        </text>
        <text x="52" y="229" className={styles.label}>
          What can we commit?
        </text>
      </g>

      <g className={styles.planHeading}>
        <text x="241" y="82" className={styles.paperHeading}>
          A deliberate sequence
        </text>
        <path d="M241 94H534" className={styles.hairline} />
      </g>
      <g className={`${styles.planRow} ${styles.testRow}`}>
        <text x="241" y="119" className={styles.step}>
          01
        </text>
        <text x="275" y="119" className={styles.rowTitle}>
          Test the assumption
        </text>
        <text x="275" y="140" className={styles.annotation}>
          Demand still needs evidence
        </text>
        <path d="M241 155H534" className={styles.hairline} />
      </g>
      <g className={`${styles.planRow} ${styles.releaseRow}`}>
        <text x="241" y="181" className={styles.step}>
          02
        </text>
        <text x="275" y="181" className={styles.rowTitle}>
          First release
        </text>
        <text x="275" y="202" className={styles.coreJourney}>
          The core journey
        </text>
        <path d="M241 215H534" className={styles.hairline} />
      </g>
      <g className={`${styles.planRow} ${styles.laterRow}`}>
        <text x="241" y="241" className={styles.step}>
          03
        </text>
        <text x="275" y="241" className={styles.rowTitle}>
          Later
        </text>
      </g>
      <g className={styles.deferredItem}>
        <path d="M356 225H534V249H356" className={styles.deferredPaper} />
        <path d="M365 232V241H374" className={styles.fineInk} />
        <text x="382" y="241" className={styles.label}>
          Integrations
        </text>
      </g>

      <g className={styles.recordFooter}>
        <path d="M26 274H534" className={styles.hairline} />
        <text x="26" y="294" className={styles.micro}>
          BUDGET
        </text>
        <text x="26" y="313" className={styles.label}>
          Agreed for this phase
        </text>
        <path d="M196 289V316M371 289V316" className={styles.hairline} />
        <text x="213" y="294" className={styles.micro}>
          TEAM
        </text>
        <text x="213" y="313" className={styles.label}>
          Shaped to the work
        </text>
        <text x="388" y="294" className={styles.micro}>
          NEXT REVIEW
        </text>
        <text x="388" y="313" className={styles.label}>
          After the first test
        </text>
      </g>
    </>
  );
}

function EnterpriseArtwork() {
  return (
    <>
      <text x="26" y="31" className={styles.overline}>
        WORKSTREAMS → A SHARED DECISION
      </text>
      <text x="534" y="31" textAnchor="end" className={styles.micro}>
        RELEASE REVIEW / 02
      </text>
      <path d="M26 44H534" className={styles.hairline} />
      <text x="26" y="77" className={styles.micro}>
        CONTEXT STAYS VISIBLE
      </text>
      <path d="M26 127H317M26 181H317M26 235H317" className={styles.hairline} />
      <text x="26" y="113" className={styles.laneLabel}>
        Product
      </text>
      <text x="26" y="167" className={styles.laneLabel}>
        Technology
      </text>
      <text x="26" y="221" className={styles.laneLabel}>
        Operations
      </text>
      <g className={`${styles.workstream} ${styles.productStream}`}>
        <path d="M131 92H308V121H131Z" className={styles.slip} />
        <text x="143" y="111" className={styles.label}>
          Pilot scope
        </text>
        <path d="M287 101H298M287 106H295M287 111H298" className={styles.fineInk} />
      </g>
      <g className={`${styles.workstream} ${styles.technologyStream}`}>
        <path d="M131 146H308V175H131Z" className={styles.slip} />
        <text x="143" y="165" className={styles.label}>
          Existing systems
        </text>
        <path d="M286 156H293V163H286ZM295 156H302V163H295Z" className={styles.fineInk} />
      </g>
      <g className={`${styles.workstream} ${styles.operationsStream}`}>
        <path d="M131 200H308V229H131Z" className={styles.slip} />
        <text x="143" y="219" className={styles.label}>
          Readiness &amp; adoption
        </text>
        <path d="M290 211H300M290 215H297" className={styles.fineInk} />
      </g>
      <g className={styles.reviewBracket}>
        <path d="M318 106H327V214H318M327 160H343" className={styles.fineInk} />
        <circle cx="327" cy="160" r="2.5" className={styles.inkFill} />
      </g>

      <g className={styles.reviewSheet}>
        <path d="M347 65H515L534 84V245H347Z" className={styles.paper} />
        <path d="M515 65V84H534" className={styles.fold} />
        <text x="363" y="91" className={styles.micro}>
          REVIEW RECORD
        </text>
        <text x="363" y="119" className={styles.paperHeading}>
          A named owner.
        </text>
        <path d="M363 134H518" className={styles.hairline} />
        <text x="363" y="155" className={styles.label}>
          What have we learned?
        </text>
        <text x="363" y="177" className={styles.label}>
          What is ready to change?
        </text>
        <path d="M363 192H518" className={styles.hairline} />
        <g className={styles.reviewDecision}>
          <text x="363" y="214" className={styles.micro}>
            NEXT DECISION
          </text>
          <text x="363" y="233" className={styles.rowTitle}>
            Expand or revise.
          </text>
        </g>
      </g>
      <g className={styles.recordFooter}>
        <path d="M26 274H534" className={styles.hairline} />
        <text x="26" y="300" className={styles.label}>
          Pilot
        </text>
        <path d="M65 295H177M172 291L177 295L172 299" className={styles.hairline} />
        <text x="193" y="300" className={styles.label}>
          Review
        </text>
        <path d="M244 295H356M351 291L356 295L351 299" className={styles.hairline} />
        <text x="372" y="300" className={styles.label}>
          Decide together
        </text>
        <text x="26" y="321" className={styles.annotation}>
          Coordinate delivery with the people who will use it.
        </text>
      </g>
    </>
  );
}

function OwnershipArtwork() {
  const records = [
    { label: "Code", note: "Ready to work with", y: 109, className: styles.codeRecord },
    { label: "Decisions", note: "Why it works this way", y: 145, className: styles.decisionRecord },
    { label: "Runbook", note: "How to run & maintain it", y: 181, className: styles.runbookRecord },
    { label: "Team", note: "Knowledge shared", y: 217, className: styles.teamRecord }
  ];
  return (
    <>
      <text x="26" y="31" className={styles.overline}>
        DELIVERY → LASTING OWNERSHIP
      </text>
      <text x="534" y="31" textAnchor="end" className={styles.micro}>
        PRODUCT RECORD / 03
      </text>
      <path d="M26 44H534" className={styles.hairline} />
      <g className={styles.folioSheet}>
        <path d="M102 73H478V255H102Z" className={styles.backPaper} />
        <path d="M91 64H467V249H91Z" className={styles.paper} />
        <path d="M141 64V249" className={styles.hairline} />
        <path d="M111 87H121M111 93H125M111 99H121" className={styles.fineInk} />
        <text x="160" y="89" className={styles.paperHeading}>
          A product record. Kept useful.
        </text>
        <path d="M160 98H450" className={styles.hairline} />
        <text x="117" y="230" textAnchor="middle" className={styles.micro}>
          01–04
        </text>
      </g>
      {records.map((record, i) => (
        <g key={record.label} className={`${styles.ownershipRecord} ${record.className}`}>
          <rect x="155" y={record.y - 4} width="300" height="30" className={styles.recordSlip} />
          <text x="165" y={record.y + 14} className={styles.step}>
            {String(i + 1).padStart(2, "0")}
          </text>
          <text x="194" y={record.y + 14} className={styles.label}>
            {record.label}
          </text>
          <text x="291" y={record.y + 14} className={styles.recordNote}>
            {record.note}
          </text>
        </g>
      ))}
      <g className={styles.ownerTab}>
        <path d="M31 172H113V216H31Z" className={styles.darkPaper} />
        <text x="43" y="188" className={styles.inverseMicro}>
          OWNER
        </text>
        <text x="43" y="204" className={styles.inverseLabel}>
          Your team
        </text>
      </g>
      <g className={styles.recordFooter}>
        <path d="M26 274H534" className={styles.hairline} />
        <text x="26" y="298" className={styles.label}>
          Shared work
        </text>
        <path d="M114 294H177M172 290L177 294L172 298" className={styles.hairline} />
        <text x="194" y="298" className={styles.label}>
          Client ownership
        </text>
        <path d="M348 288V320" className={styles.hairline} />
        <text x="370" y="298" className={styles.label}>
          Continue together
        </text>
        <text x="370" y="318" className={styles.annotation}>
          Support by agreement
        </text>
      </g>
    </>
  );
}

/* A separate composition keeps small-screen labels readable instead of shrinking the desktop drawing. */
function MobileArtwork({ kind }: { kind: VignetteKind }) {
  if (kind === "startup")
    return (
      <>
        <text x="18" y="31" className={styles.mobileHeading}>
          A working brief
        </text>
        <text x="342" y="31" textAnchor="end" className={styles.mobileMicro}>
          01 / STARTUP
        </text>
        <path d="M18 44H342" className={styles.hairline} />
        {[
          { x: 18, width: 98, label: "Customer", className: styles.customerQuestion },
          { x: 123, width: 98, label: "Scope", className: styles.scopeQuestion },
          { x: 228, width: 114, label: "Constraints", className: styles.constraintQuestion }
        ].map((item) => (
          <g key={item.label} className={`${styles.question} ${item.className}`}>
            <rect x={item.x} y="61" width={item.width} height="40" className={styles.slip} />
            <text x={item.x + 12} y="86" className={styles.mobileLabel}>
              {item.label}
            </text>
          </g>
        ))}
        <g className={`${styles.planRow} ${styles.testRow}`}>
          <path d="M18 125H342" className={styles.hairline} />
          <text x="18" y="153" className={styles.mobileNumber}>
            01
          </text>
          <text x="55" y="153" className={styles.mobileHeading}>
            Test the assumption
          </text>
          <text x="55" y="176" className={styles.mobileNote}>
            Demand still needs evidence
          </text>
        </g>
        <g className={`${styles.planRow} ${styles.releaseRow}`}>
          <path d="M18 189H342" className={styles.hairline} />
          <text x="18" y="216" className={styles.mobileNumber}>
            02
          </text>
          <text x="55" y="216" className={styles.mobileHeading}>
            First release
          </text>
          <text x="55" y="239" className={`${styles.mobileNote} ${styles.coreJourney}`}>
            The core journey
          </text>
        </g>
        <g className={`${styles.planRow} ${styles.laterRow}`}>
          <path d="M18 251H342" className={styles.hairline} />
          <text x="18" y="279" className={styles.mobileNumber}>
            03
          </text>
          <text x="55" y="279" className={styles.mobileHeading}>
            Later
          </text>
        </g>
        <g className={`${styles.deferredItem} ${styles.mobileDeferred}`}>
          <path d="M182 259H342V288H182" className={styles.deferredPaper} />
          <path d="M192 267V280H201" className={styles.fineInk} />
          <text x="208" y="280" className={styles.mobileLabel}>
            Integrations
          </text>
        </g>
        <g className={styles.recordFooter}>
          <path d="M18 307H342" className={styles.hairline} />
          <text x="18" y="332" className={styles.mobileNote}>
            Budget · Team · Next review
          </text>
        </g>
      </>
    );

  if (kind === "enterprise")
    return (
      <>
        <text x="18" y="31" className={styles.mobileHeading}>
          A shared release review
        </text>
        <path d="M18 44H342" className={styles.hairline} />
        {[
          { y: 61, label: "Product", item: "Pilot scope", className: styles.productStream },
          {
            y: 106,
            label: "Technology",
            item: "Existing systems",
            className: styles.technologyStream
          },
          { y: 151, label: "Operations", item: "Readiness", className: styles.operationsStream }
        ].map((item) => (
          <g key={item.label}>
            <text x="18" y={item.y + 24} className={styles.mobileLabel}>
              {item.label}
            </text>
            <g className={`${styles.workstream} ${item.className}`}>
              <rect x="128" y={item.y} width="214" height="34" className={styles.slip} />
              <text x="142" y={item.y + 23} className={styles.mobileLabel}>
                {item.item}
              </text>
            </g>
          </g>
        ))}
        <g className={styles.reviewBracket}>
          <path d="M128 194V202H342V194M235 202V217" className={styles.fineInk} />
        </g>
        <g className={styles.reviewSheet}>
          <path d="M18 217H342V294H18Z" className={styles.paper} />
          <text x="33" y="243" className={styles.mobileHeading}>
            A named owner.
          </text>
          <g className={styles.reviewDecision}>
            <text x="33" y="277" className={styles.mobileLabel}>
              Pilot → Review → Expand or revise
            </text>
          </g>
        </g>
        <g className={styles.recordFooter}>
          <text x="18" y="332" className={styles.mobileNote}>
            Readiness stays part of the decision.
          </text>
        </g>
      </>
    );

  return (
    <>
      <text x="18" y="31" className={styles.mobileHeading}>
        A useful product record
      </text>
      <path d="M18 44H342" className={styles.hairline} />
      <g className={styles.folioSheet}>
        <path d="M24 69H342V257H24Z" className={styles.backPaper} />
        <path d="M18 62H336V250H18Z" className={styles.paper} />
        <path d="M57 62V250" className={styles.hairline} />
      </g>
      {[
        { label: "Code", note: "Working source", className: styles.codeRecord },
        { label: "Decisions", note: "The reasoning", className: styles.decisionRecord },
        { label: "Runbook", note: "How to operate it", className: styles.runbookRecord },
        { label: "Team", note: "Shared knowledge", className: styles.teamRecord }
      ].map((item, i) => (
        <g key={item.label} className={`${styles.ownershipRecord} ${item.className}`}>
          <text x="28" y={94 + i * 43} className={styles.mobileNumber}>
            {String(i + 1).padStart(2, "0")}
          </text>
          <text x="70" y={94 + i * 43} className={styles.mobileLabel}>
            {item.label}
          </text>
          <text x="172" y={94 + i * 43} className={styles.mobileNote}>
            {item.note}
          </text>
          {i < 3 && <path d={`M70 ${107 + i * 43}H320`} className={styles.hairline} />}
        </g>
      ))}
      <g className={styles.ownerTab}>
        <path d="M18 266H162V296H18Z" className={styles.darkPaper} />
        <text x="30" y="286" className={styles.mobileInverse}>
          Your team owns it.
        </text>
      </g>
      <g className={styles.recordFooter}>
        <text x="18" y="332" className={styles.mobileNote}>
          Continue together, by agreement.
        </text>
      </g>
    </>
  );
}

/** A short illustrative record, assembled once in view and always useful at rest. */
export function ProcessVignette({ kind }: { kind: VignetteKind }) {
  const figureRef = useRef<HTMLElement>(null);
  const elapsed = useRef(0);
  const seen = useRef(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const captionId = useId();
  const descriptionId = useId();
  const story = stories[kind];
  const running = started && !finished && !paused && inView && pageVisible && !reducedMotion;
  const animate = started && !finished && !reducedMotion;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches && seen.current) setFinished(true);
    };
    const syncVisibility = () => setPageVisible(document.visibilityState === "visible");
    syncPreference();
    syncVisibility();
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.32);
      },
      { threshold: [0, 0.32] }
    );
    if (figureRef.current) observer.observe(figureRef.current);
    preference.addEventListener("change", syncPreference);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", syncPreference);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (inView && !reducedMotion && !seen.current) {
      seen.current = true;
      setStarted(true);
    }
  }, [inView, reducedMotion]);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let previous: number | undefined;
    const tick = (time: number) => {
      if (previous !== undefined) elapsed.current += time - previous;
      previous = time;
      if (elapsed.current >= DURATION) {
        setFinished(true);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, cycle]);

  const togglePlayback = () => {
    if (reducedMotion) return;
    if (!started || finished) {
      elapsed.current = 0;
      seen.current = true;
      setCycle((value) => value + 1);
      setStarted(true);
      setFinished(false);
      setPaused(false);
    } else setPaused((value) => !value);
  };
  const playbackLabel = finished ? "Replay" : !started || paused ? "Play" : "Pause";

  return (
    <figure
      ref={figureRef}
      className={styles.figure}
      data-kind={kind}
      data-animate={animate}
      data-running={running}
      aria-labelledby={captionId}
      aria-describedby={descriptionId}
    >
      <div className={styles.artworkWrap}>
        <svg
          key={`${kind}-${cycle}-desktop`}
          viewBox="0 0 560 342"
          className={`${styles.artwork} ${styles.desktopArtwork}`}
          aria-hidden="true"
          focusable="false"
        >
          {kind === "startup" ? (
            <StartupArtwork />
          ) : kind === "enterprise" ? (
            <EnterpriseArtwork />
          ) : (
            <OwnershipArtwork />
          )}
        </svg>
        <svg
          key={`${kind}-${cycle}-mobile`}
          viewBox="0 0 360 354"
          className={`${styles.artwork} ${styles.mobileArtwork}`}
          aria-hidden="true"
          focusable="false"
        >
          <MobileArtwork kind={kind} />
        </svg>
      </div>
      <figcaption className={styles.caption}>
        <div>
          <span className={styles.captionIndex}>Illustrative sequence / {story.index}</span>
          <p id={captionId} className={styles.captionTitle}>
            {story.title}
          </p>
        </div>
        {!reducedMotion && (
          <button
            type="button"
            className={styles.playback}
            onClick={togglePlayback}
            aria-label={`${playbackLabel} ${kind} illustration`}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              {finished ? (
                <path d="M3.5 5.5A5 5 0 1 1 3 10M3.5 2.5V5.5H6.5" />
              ) : playbackLabel === "Pause" ? (
                <path d="M6 4V12M10 4V12" />
              ) : (
                <path d="M5 3.5L12 8L5 12.5Z" />
              )}
            </svg>
            <span>{playbackLabel}</span>
          </button>
        )}
      </figcaption>
      <p id={descriptionId} className={styles.srOnly}>
        {story.detail}
      </p>
    </figure>
  );
}
