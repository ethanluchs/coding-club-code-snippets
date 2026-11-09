# Coding Club Code Snippets

Arduino code for a six-week kids' coding club that builds an obstacle-avoiding
robot car. Kids open the site, pick their week, hit Copy, and paste into the
Arduino IDE.

## Run it

```bash
npm install
npm run dev
```

## Editing the code snippets

All fourteen snippets live in [`content/snippets.ts`](content/snippets.ts).
Each one is a title, an optional pin list, and the code. Weeks 1-6 are the
electronics course; weeks 7-10 are the programming course. Weeks listed in
`comingSoon` render a "Coming soon" panel instead of code.

**Pin numbers are never hardcoded.** They come from
[`content/pins.ts`](content/pins.ts) and are interpolated into the sketches, so
the code a kid copies and the pins shown next to it can never disagree.

`npm run check-pins` enforces this and runs as part of `npm run build`. It
fails the build if a snippet hardcodes a pin, reuses a pin within one sketch,
or references a pin that isn't in the map.

## Pulaski

A one-off 3-hour session, on its own **Pulaski** tab. Those cars have no
distance sensor and no servo, so the tab carries just the two week-7 sketches
(the same `items`, selected by id in `app/page.tsx`) and three wiring diagrams
of its own in `public/pulaski/`.

The pin map is identical to the regular car, so the week-7 code runs unchanged.
The session deck tells kids to "copy the second block of code", so the tab
labels its code blocks **Block 1** and **Block 2**.

## Wiring diagrams

The site has a **Wiring** tab with four diagrams: motors to driver, driver to
Arduino, power, and the distance sensor. Each shows the picture alongside a
connection table with a colour swatch per wire, and the picture enlarges on
click (the source images are small and hard to read inline).

Images live in `public/wiring/`; the tables are in
[`content/wiring.ts`](content/wiring.ts) and pull their pin numbers from
`pins.ts` like the sketches do. To swap a diagram, overwrite the PNG with the
same filename and update `width`/`height` if the size changed.

**Left and right are deliberately never named.** Some drivers get mounted
upside down, so the tables say "IN1/IN2 side" and tell kids to test and swap.

## Wiring

One pin map covers all six weeks, matching the wiring diagrams in the
curriculum deck. The servo is the only component that moves — pin 9 in weeks
2 and 5, pin 4 in week 6, because pin 9 becomes a motor pin in the finished
car.

See [`docs/PINMAP.md`](docs/PINMAP.md) for the full map and the two slides in
the deck that need correcting.

## Docs

| File | What's in it |
|---|---|
| [`docs/PINMAP.md`](docs/PINMAP.md) | The pin map, week by week, and why |
| [`docs/SNIPPETS.md`](docs/SNIPPETS.md) | Every snippet traced back to its slide |
| [`docs/SPEC.md`](docs/SPEC.md) | What the site is and isn't |

## Stack

Next.js (App Router) · TypeScript · Tailwind · Shiki for build-time syntax
highlighting. Fully static — no database, no server.
