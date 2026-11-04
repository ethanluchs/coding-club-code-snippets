"use client";

import { useState } from "react";
import type { Snippet } from "@/lib/types";
import type { WiringDiagram } from "@/content/wiring";
import CodeSurface from "./CodeSurface";
import Wiring from "./Wiring";

type Item = Snippet & { html: string };

const ROW_ONE = [1, 2, 3, 4, 5, 6];
const ROW_TWO = [7, 8, 9, 10];

/** Not a week — the wiring tab rides in the same nav. */
const WIRING = -1;
const WIRING_COLOR = "#4a5056";

const GREY = "#9aa0a6";

/** Rotates so it is not the same joke every time you click. */
const SOON_LINES = [
  "Still being built",
  "Not written yet",
  "Nothing here yet",
  "Under construction",
];

const SOON_SUB = "Come back when we get to this week.";

export default function SnippetList({
  items,
  weekColors,
  comingSoon,
  done,
  currentWeek,
  diagrams,
}: {
  items: Item[];
  weekColors: Record<number, string>;
  comingSoon: number[];
  done: number[];
  currentWeek: number;
  diagrams: WiringDiagram[];
}) {
  const [week, setWeek] = useState<number>(currentWeek);
  const shown = items.filter((s) => s.week === week);
  const soon = comingSoon.includes(week);
  const isDone = done.includes(week);
  const onWiring = week === WIRING;
  // A finished week reads in grey; the current week keeps its colour.
  const color = onWiring ? WIRING_COLOR : isDone ? GREY : weekColors[week];

  const tab = (n: number) => {
    const active = n === week;
    const finished = done.includes(n);
    const pending = comingSoon.includes(n);
    const c = finished ? GREY : weekColors[n];

    return (
      <button
        key={n}
        type="button"
        onClick={() => setWeek(n)}
        aria-pressed={active}
        aria-label={
          finished
            ? `Week ${n}, done`
            : pending
              ? `Week ${n}, coming soon`
              : `Week ${n}`
        }
        style={{
          background: active ? c : "transparent",
          color: active ? "#fff" : c,
          boxShadow: `inset 0 0 0 3px ${c}`,
          opacity: pending && !active ? 0.4 : 1,
          borderStyle: pending ? "dashed" : undefined,
        }}
        className="relative h-12 flex-1 rounded-xl text-lg font-extrabold transition-transform active:scale-95"
      >
        {n}
        {finished && (
          <span
            aria-hidden="true"
            className="absolute top-1 right-1.5 text-[11px] leading-none font-black"
            style={{ color: active ? "#fff" : GREY }}
          >
            ✓
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      <nav className="no-print sticky top-0 z-30 -mx-4 flex flex-col gap-2 bg-bg/95 px-4 pt-1 pb-3 backdrop-blur">
        <div className="flex gap-2">{ROW_ONE.map(tab)}</div>
        <div className="flex gap-2">
          {ROW_TWO.map(tab)}
          <button
            type="button"
            onClick={() => setWeek(WIRING)}
            aria-pressed={onWiring}
            style={{
              background: onWiring ? WIRING_COLOR : "transparent",
              color: onWiring ? "#fff" : WIRING_COLOR,
              boxShadow: `inset 0 0 0 3px ${WIRING_COLOR}`,
            }}
            className="h-12 flex-[2] rounded-xl text-base font-extrabold transition-transform active:scale-95"
          >
            Wiring
          </button>
        </div>
      </nav>

      {onWiring ? (
        <Wiring diagrams={diagrams} color={WIRING_COLOR} />
      ) : soon ? (
        <ComingSoon week={week} color={weekColors[week]} />
      ) : (
        <>
          {isDone && (
            <p className="mt-3 text-[15px] font-semibold" style={{ color: GREY }}>
              ✓ We already did this week — the code is still here.
            </p>
          )}
          <div className="flex flex-col gap-8 pt-3">
            {shown.map((s) => (
              <section key={s.id}>
                <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2
                    className="text-2xl font-extrabold tracking-tight"
                    style={{ color }}
                  >
                    {s.title}
                  </h2>
                  {s.pins && (
                    <span
                      className="rounded-full px-2.5 py-1 font-mono text-xs font-bold"
                      style={{ background: `${color}22`, color }}
                    >
                      {s.pins}
                    </span>
                  )}
                </div>
                <CodeSurface code={s.code} html={s.html} accent={color} />
              </section>
            ))}
          </div>
        </>
      )}
    </>
  );
}

/** Playful placeholder for a week that has no code yet. */
function ComingSoon({ week, color }: { week: number; color: string }) {
  const line = SOON_LINES[week % SOON_LINES.length];

  return (
    <div
      className="mt-4 overflow-hidden rounded-2xl px-6 py-12 text-center"
      style={{
        background: `${color}14`,
        boxShadow: `inset 0 0 0 3px ${color}`,
      }}
    >
      <RobotPeeking color={color} />

      <p className="mt-4 text-3xl font-extrabold" style={{ color }}>
        {line}
      </p>
      <p className="mt-1 text-[15px] text-muted">{SOON_SUB}</p>

      <div
        className="mx-auto mt-6 max-w-sm rounded-xl p-4 text-left font-mono text-[13px] leading-relaxed"
        style={{ background: "#16191c", color: "#e6edf3" }}
      >
        <span style={{ color: "#7d8590" }}>{"// week_" + week + ".ino"}</span>
        <br />
        <span style={{ color }}>void</span> loop() {"{"}
        <br />
        &nbsp;&nbsp;<span style={{ color: "#7d8590" }}>{"// coming soon"}</span>
        <span className="animate-pulse" style={{ color }}>
          ▌
        </span>
        <br />
        {"}"}
      </div>
    </div>
  );
}

/** Little robot car, wheels and all, peering out of the empty week. */
function RobotPeeking({ color }: { color: string }) {
  return (
    <svg
      width="96"
      height="72"
      viewBox="0 0 96 72"
      fill="none"
      aria-hidden="true"
      className="mx-auto"
    >
      {/* sensor mast */}
      <rect x="44" y="6" width="8" height="12" rx="2" fill={color} />
      <circle cx="48" cy="6" r="4" fill={color} />
      {/* body */}
      <rect x="14" y="18" width="68" height="30" rx="8" fill={color} />
      {/* eyes */}
      <circle cx="35" cy="32" r="6" fill="#fff" />
      <circle cx="61" cy="32" r="6" fill="#fff" />
      <circle cx="36" cy="33" r="2.8" fill="#16191c" />
      <circle cx="62" cy="33" r="2.8" fill="#16191c" />
      {/* wheels */}
      <rect x="10" y="46" width="18" height="18" rx="6" fill="#16191c" />
      <rect x="68" y="46" width="18" height="18" rx="6" fill="#16191c" />
      <circle cx="19" cy="55" r="4" fill={color} />
      <circle cx="77" cy="55" r="4" fill={color} />
    </svg>
  );
}
