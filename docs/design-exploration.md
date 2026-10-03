# Adra: design exploration

This branch implements **Monochrome Decision Room**.

## The problem

The previous page had a strong leadership proposition and one useful visual story in the hero. Below it, repeated cards and bullet lists gave strategy, architecture, delivery, and contact details similar visual weight. A neutral palette alone did not create an identity or help explain the work.

This exploration treats the working document as the visual language: a brief, a first-phase plan, a release decision, and a handover record. These are illustrations of a way of working, not client evidence or promises of results.

## Research and interpretation

Live page imagery and primary project descriptions informed the exploration. These are design references, not templates or assets reused in this site.

| Reference                                                                   | Principle taken forward                                                                                                                                   |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Work & Co](https://work.co/)                                               | A narrow label column, broad reading column, and fine rules establish hierarchy without a wall of cards.                                                  |
| [Work & Co's process](https://work.co/process/)                             | Make the operating relationship concrete: goals, team composition, architectural decisions, validation, and continued improvement.                        |
| [Instrument's services](https://www.instrument.com/services/)               | Give a proposition room to breathe, then place a substantial visual beside it. Vary the scale and rhythm between chapters.                                |
| [AREA 17](https://area17.com/)                                              | A sparse header and confident opening statement can communicate seniority with little ornament.                                                           |
| [Linear Plan](https://linear.app/plan)                                      | Explain abstract coordination through legible documents, ownership, milestones, and updates.                                                              |
| [Metalab](https://www.metalab.com/)                                         | Deliberate asymmetry and a strong change in typographic scale create character. Its theatrical presentation is not a model for the whole Adra experience. |
| [Pentagram](https://www.pentagram.com/)                                     | Give the visual material a clear focal role and keep supporting captions concise.                                                                         |
| [PORTO ROCHA: Kunsthalle Basel](https://www.portorocha.com/kunsthallebasel) | Restraint still needs a recognizable idea. Their case study connects typography, structure, and motion to the underlying identity.                        |
| [Studio Dumbar: Instagram](https://studiodumbar.com/work/instagram)         | Use a coherent family of motion behaviors that supports the content. Avoid unrelated effects applied component by component.                              |

## Two alternatives

**Editorial Working Brief** uses paper-like space, a clear margin, open service rows, and a composed sequence of working records. Its navigation behaves like a compact contents index.

**Monochrome Decision Room** is more systematic: a strong sans-serif hierarchy, question/decision/output relationships, precise chapter markers, and an engagement comparison. Its navigation makes the current chapter explicit.

Both preserve the existing product-story concept, concise executive positioning, real client names, and the distinction between responsibility for delivery and a guarantee of business outcomes. Both stay close to black, white, and grey.

## Motion storyboards

1. **Prioritize a first phase.** Questions become a plan. Work is deliberately deferred; an assumption remains to test. The message is judgment under uncertainty.
2. **Coordinate a rollout.** Product, technology, and operations align around ownership and a review. A pilot leads to a decision to expand or revise. Existing systems remain in the picture.
3. **Keep context with the team.** Code, decisions, a runbook, and team knowledge form a useful ownership record, with room for continued partnership.

Each new illustration plays once when in view and settles into a useful final composition. Pause/replay and reduced-motion behavior keep control with the reader. Essential page copy does not depend on an animation playing.

## Review criteria

- Is the leadership proposition clear before the capability inventory?
- Does each section have one obvious focal point?
- Does the page alternate composition without feeling like several unrelated websites?
- Do the animations reveal a decision or relationship, rather than simply moving a shape?
- Are the illustrations legible on a small phone and in dark mode?
- Can navigation be interrupted, reached by keyboard, and understood without motion?
- Can a reader compare the engagement models without opening every detail?
- Does the final contact moment stay direct and uncluttered?

## Pull request structure

The two new pull requests are complete alternatives against `main`. Review and choose one; they are not intended to be merged together. Their common starting point includes the reviewed refinement, neutral-palette, and navigation work from PRs 18, 19, and 21. Those existing PRs are left unchanged. PR 20 remains closed.

## Validation for this branch

Production build and TypeScript checks passed. The browser audit passed 70 checks across desktop, tablet, and phone widths, light/dark themes, and reduced motion, with no runtime errors or missing assets. It covers navigation and history, keyboard focus, readable layouts, and the three illustrations’ pause, replay, completion, and offscreen behavior. The numbered mobile contents apply current-section state as soon as they open; Escape restores the trigger and a selected destination receives focus after the menu closes. Native and enhanced navigation share the measured header inset.
