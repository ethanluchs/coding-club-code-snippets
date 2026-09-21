# Coding Club Code Snippets — Spec

A small website where kids in the club can find the code for each week,
copy it with one tap, and paste it into the Arduino IDE (desktop).

Audience: kids, on laptops running the Arduino IDE, in a noisy room,
possibly having missed a week. The site has to work without anyone
explaining it.

---

## 1. The one job

A kid sits down, opens the site, finds this week's code, hits Copy, switches
to the Arduino IDE, pastes, uploads. That is the whole product. Everything
below serves that path.

Design consequences:
- Copy button is big, always visible, and confirms it worked.
- Paste instructions are at the top of every page, not hidden in a FAQ.
- No login, no accounts, no saving. Nothing to forget.
- Works on a phone (some will look on their phone while typing on the laptop).

---

## 2. Stack

| Choice | Value | Why |
|---|---|---|
| Framework | Next.js 15, App Router | Asked for |
| Language | TypeScript, strict | Asked for |
| Styling | Tailwind v4 | Fast, no CSS files to manage |
| Content | TypeScript files in `content/snippets/` | Type-checked, no CMS, no DB |
| Highlighting | Shiki, at build time | Zero JS shipped for highlighting |
| Hosting | Vercel, free tier | Push to deploy |
| Rendering | Fully static (SSG) | No server, instant loads on club wifi |

**No database.** Content is code. To add a snippet you add a `.ts` file and
push. This keeps it genuinely simple and free forever.

---

## 3. Routes

| Route | Purpose |
|---|---|
| `/` | Home. Paste instructions + the six week buttons. |
| `/week/[n]` | One week. All snippets for that week, full code, copy buttons. |
| `/wiring` | Pin map per week. The page you point at when a kid asks "which pin?" |
| `/help` | Troubleshooting: upload fails, no port, missing library. |

**Week 1-6 buttons sit at the top of every page.** They are real links to
`/week/[n]`, always visible, with the current week highlighted. A kid clicks
"3" and sees Week 3's code — from anywhere on the site, without going home
first.

Real routes (not tabs) so each week has a shareable URL, loads fast as a
static page, and the back button behaves. Next.js prefetches them on hover,
so clicking between weeks feels instant.

## 4. Page layouts

### Home `/`

```
┌──────────────────────────────────────────┐
│  THE ROBOT CAR                           │
│  Code for coding club                    │
├──────────────────────────────────────────┤
│  ┌────────────────────────────────────┐  │
│  │ HOW TO USE THIS                    │  │
│  │ 1. Open the Arduino IDE            │  │
│  │ 2. File > New Sketch               │  │
│  │ 3. Click in the code, Ctrl+A,      │  │
│  │    then Delete (clear it out)      │  │
│  │ 4. Come back here, hit Copy        │  │
│  │ 5. Paste in the IDE (Ctrl+V)       │  │
│  │ 6. Tools > Board > Arduino Uno     │  │
│  │ 7. Tools > Port > pick the COM     │  │
│  │ 8. Click → (Upload)                │  │
│  └────────────────────────────────────┘  │
├──────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐     │
│  │ WEEK 1  │ │ WEEK 2  │ │ WEEK 3  │     │
│  │ 💻      │ │ ⚙️      │ │ 📡      │     │
│  │ Getting │ │ Servo   │ │ Distance│     │
│  │ Started │ │ Motor   │ │ Sensor  │     │
│  │ 3 bits  │ │ 2 bits  │ │ 3 bits  │     │
│  └─────────┘ └─────────┘ └─────────┘     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐     │
│  │ WEEK 4  │ │ WEEK 5  │ │ WEEK 6  │     │
│  │ Motors  │ │ Build   │ │ THE CAR │     │
│  └─────────┘ └─────────┘ └─────────┘     │
└──────────────────────────────────────────┘
```

The step 4 "delete what is already there" instruction matters. Without it
kids paste on top of the default `setup()`/`loop()` and get a compile error
about redefinition, which is a confusing first failure.

### Week page `/week/3`

```
┌──────────────────────────────────────────┐
│  ← All weeks                             │
│  WEEK 3 — Distance Sensor                │
├──────────────────────────────────────────┤
│  [ Reminder: paste steps ▾ ] (collapsed) │
├──────────────────────────────────────────┤
│  Distance Sensor                         │
│  Measures how far away an object is...   │
│                                          │
│  🔌 Trig → pin 3   Echo → pin 2          │
│     Vcc → 5V       Gnd → GND             │
│                                          │
│  ┌────────────────────────┬───────────┐  │
│  │ long duration;         │  [📋 Copy]│  │
│  │ int distance;          │           │  │
│  │ ...                    │           │  │
│  └────────────────────────┴───────────┘  │
│                                          │
│  💡 Speed of sound is 0.034 cm per       │
│     microsecond. We divide by 2 because  │
│     the sound goes there AND back.       │
├──────────────────────────────────────────┤
│  ... next snippet ...                    │
├──────────────────────────────────────────┤
│           Week 2 ←  |  → Week 4          │
└──────────────────────────────────────────┘
```

Prev/next week links at the bottom matter more than you would think — a kid
who is behind will walk backwards through them.

---

## 5. Components

| Component | Notes |
|---|---|
| `CodeBlock` | Highlighted code + copy button. The core component. |
| `CopyButton` | See detail below. |
| `SnippetCard` | Title, blurb, wiring, code, note. |
| `WiringNote` | Blue box. Which pin goes where. |
| `TeachNote` | Yellow box. The "why" — physics, what `&&` means. |
| `WarnNote` | Red box. Things that will fry the board (e.g. motors on Arduino 5V). |
| `PasteSteps` | The numbered instructions. Expanded on home, collapsed elsewhere. |
| `WeekCard` | Home page grid tile. |
| `ChallengeCard` | Amber-tinted SnippetCard. Shows the task, not the answer. |
| `PinTable` | Renders the canonical map from `content/pins.ts`. Used on `/wiring`. |
| `UnscrambleChallenge` | Special case for 5.1. Jumbled lines, each individually copyable. No answer shown. |

### CopyButton detail

This is the single most-used element on the site. Get it right.

- Minimum 44x44px tap target. Fingers, not mice.
- Default: `📋 Copy`. On success: `✓ Copied!` in green for 2 seconds.
- Also make the **entire code block clickable** to copy. Kids will tap the
  code itself; let that work.
- Use `navigator.clipboard.writeText`, with a `document.execCommand('copy')`
  fallback. The async clipboard API needs HTTPS (or localhost) and can be
  blocked by browser settings, so the fallback is not optional.
- If both fail, select the code text so Ctrl+C works, and say so.
- Sticky variant: on long snippets (the full car sketch is ~60 lines), the
  copy button should stick to the top of the code block while scrolling.

---

## 6. Content model

`content/snippets/week-3.ts`:

```ts
import type { Snippet } from "@/lib/types";

export const week3: Snippet[] = [
  {
    id: "ultrasonic-distance",
    title: "Distance Sensor",
    week: 3,
    kind: "snippet",            // "snippet" | "challenge" | "unscramble"
    blurb: "Measures how far away an object is and prints it in centimetres.",
    wiring: [
      { from: "Vcc",  to: "5V"     },
      { from: "Trig", to: "pin 3"  },
      { from: "Echo", to: "pin 2"  },
      { from: "Gnd",  to: "GND"    },
    ],
    note: "Speed of sound is 0.034 cm per microsecond. We divide by 2 because the sound goes there AND back.",
    warn: null,
    code: `long duration;
int distance;
...`,
  },
];
```

Types in `lib/types.ts`. A registry in `content/index.ts` exports
`allSnippets` and `weeks` (week number, title, emoji, description).

Rules:
- `code` is a template literal. **Never indent it to match surrounding code** —
  what is in the string is what lands in the kid's editor.
- **Never hardcode a pin number in `code`.** Interpolate from `PINS`
  (`content/pins.ts`), which is grouped by stage: `servoSolo`, `sonar`,
  `motors`, `servoCar`. One edit updates the sketch and its wiring table
  together. See `docs/PINMAP.md`.
- `wiring` entries are generated from `PINS` too, not typed by hand.
- One file per week. Predictable to edit.
- `npm run check-pins` fails the build if a snippet hardcodes a pin or lists a
  wire that is not in `PINS`. Wire it into `npm run build`.

---

## 7. Content to load

All snippets are extracted and transcribed in **`docs/SNIPPETS.md`**.
12 items across 6 weeks:

| Week | Snippets |
|---|---|
| 1 | Hello World · Blink LED · Print Your Name (challenge) |
| 2 | Servo Sweep · Servo Full Sweep (challenge) |
| 3 | Distance Sensor · Distance Sensor explained · Explain the boxes (challenge) |
| 4 | Two Motors Forward/Backward |
| 5 | Unscramble the Servo Code (challenge) |
| 6 | If Statement · **THE ROBOT CAR** (full sketch) |

Read `docs/SNIPPETS.md` before writing any content file — it has the exact
code for each snippet as it appears in the deck.

Read `docs/PINMAP.md` too. **Each week's code matches that week's own wiring
diagram.** Two slides (p.34 and p.71/72) disagreed with their diagrams and are
corrected; everything else is the deck verbatim.

---

## 8. Things worth considering

You asked what else to think about. In rough priority order:

**Should do**

1. **Wiring labels on every snippet.** Code alone is not enough — the servo
   moves from pin 9 (Weeks 2 & 5) to pin 4 (Week 6), because pin 9 becomes a
   motor. Every snippet states its pins, and the Week 6 page calls the move
   out explicitly. See `docs/PINMAP.md`.
2. **A "delete what's there first" step.** Named above. Prevents the most
   common first error.
3. **Kid-readable language.** No "instantiate", no "declare". "Make a servo",
   "the code that runs once at the start". Reading age ~10.
4. **Works with zero JS.** Code is highlighted at build time and present in
   the HTML. If JS fails, kids can still select and Ctrl+C.
5. **Big text.** 16px minimum, and code at 15–16px. Laptop screens in a club
   room are small, bright, and often smudged.

**Nice to have**

6. **A `/help` page.** The failures you will actually get with the desktop
   IDE: **no port listed** (cable is charge-only, or driver missing — CH340
   on clone boards), **"board at COMx is not available"** (Serial Monitor
   holding the port, or wrong port picked), **nothing on Serial Monitor**
   (baud not set to 9600), **red error text** (usually pasted on top of the
   existing `setup()`/`loop()`), and **`Servo.h: No such file`** (library not
   installed — Tools > Manage Libraries > Servo).
7. **Copy-count, anonymous.** Even a simple counter tells you which week
   people get stuck on. Only if it is free and needs no cookie banner.
8. **Dark mode.** Follow `prefers-color-scheme`. One extra Tailwind variant.
9. **Print stylesheet.** So you can print a week as a handout for kids
   without a device.

**Deliberately not doing**

- Accounts, progress tracking, saving work.
- In-browser code editing or simulation. The Arduino IDE is the editor.
- A CMS. Editing a TS file and pushing is less work than running a CMS.
- Search. Fifteen snippets across six pages does not need search.

**Settled**

- **Desktop Arduino IDE.** Paste steps and `/help` are written for it.
- **Code matches each week's wiring diagram.** See `docs/PINMAP.md`.
- **No answers on the site.** Challenges state the task; the finished code is
  not shown. You are in the room if someone is stuck.
- **Example name stays "Ian Yu" / "blue"** in the Week 1 challenge.

**Still open**

- Domain name? Short and sayable-out-loud is worth more than clever.
- Are kids on shared club laptops or their own? Only matters if you ever want
  per-kid anything, which currently you do not.

---

## 9. Build order

1. `create-next-app` — TS, Tailwind, App Router, no `src/`.
2. `lib/types.ts` + `content/` with Week 1 only.
3. `CodeBlock` + `CopyButton`, including the fallback path.
4. Home page and `/week/[n]`.
5. Load Weeks 2–6 from `docs/SNIPPETS.md`.
6. `/snippet/[id]` and `/help`.
7. Deploy to Vercel.
8. **Test on a club laptop before club.** Copy from the site, paste into the
   real Arduino IDE, upload to a real Uno. The clipboard fallback and the
   exact IDE menu names are what to confirm.

---

## 10. Success test

Hand the URL to a kid who missed a week, say nothing, and watch. If they get
code into the Arduino editor without asking a question, the site works.
