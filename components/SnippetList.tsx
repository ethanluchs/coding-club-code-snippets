"use client";

import { useState } from "react";
import type { Snippet } from "@/lib/types";
import CodeSurface from "./CodeSurface";

type Item = Snippet & { html: string };

const ROW_ONE = [1, 2, 3, 4, 5, 6];
const ROW_TWO = [7, 8, 9, 10];

export default function SnippetList({
  items,
  weekColors,
  comingSoon,
}: {
  items: Item[];
  weekColors: Record<number, string>;
  comingSoon: number[];
}) {
  const [week, setWeek] = useState<number>(1);
  const shown = items.filter((s) => s.week === week);
  const color = weekColors[week];
  const soon = comingSoon.includes(week);

  const tab = (n: number) => {
    const active = n === week;
    const c = weekColors[n];
    const pending = comingSoon.includes(n);
    return (
      <button
        key={n}
        type="button"
        onClick={() => setWeek(n)}
        aria-pressed={active}
        style={{
          background: active ? c : "transparent",
          color: active ? "#fff" : c,
          boxShadow: `inset 0 0 0 3px ${c}`,
          opacity: pending && !active ? 0.45 : 1,
        }}
        className="h-12 flex-1 rounded-xl text-lg font-extrabold transition-transform active:scale-95"
      >
        {n}
      </button>
    );
  };

  return (
    <>
      <nav className="no-print sticky top-0 z-30 -mx-4 flex flex-col gap-2 bg-bg/95 px-4 pt-1 pb-3 backdrop-blur">
        <div className="flex gap-2">{ROW_ONE.map(tab)}</div>
        <div className="flex gap-2">
          {ROW_TWO.map(tab)}
          {/* keep row two aligned to the same column width as row one */}
          <span className="flex-1" aria-hidden="true" />
          <span className="flex-1" aria-hidden="true" />
        </div>
      </nav>

      {soon ? (
        <div
          className="mt-4 rounded-xl px-6 py-14 text-center"
          style={{ background: `${color}18`, boxShadow: `inset 0 0 0 3px ${color}` }}
        >
          <p className="text-2xl font-extrabold" style={{ color }}>
            Coming soon
          </p>
          <p className="mt-1 text-[15px] text-muted">
            Week {week} code will show up here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8 pt-2">
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
      )}
    </>
  );
}
