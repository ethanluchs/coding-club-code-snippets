"use client";

import { useState } from "react";
import type { Snippet } from "@/lib/types";
import CodeSurface from "./CodeSurface";

type Item = Snippet & { html: string };

const WEEKS = [1, 2, 3, 4, 5, 6, 7];

export default function SnippetList({
  items,
  weekColors,
  weekLabels,
}: {
  items: Item[];
  weekColors: Record<number, string>;
  weekLabels: Record<number, string>;
}) {
  const [week, setWeek] = useState<number>(1);
  const shown = items.filter((s) => s.week === week);
  const color = weekColors[week];

  return (
    <>
      <nav className="no-print sticky top-0 z-30 -mx-4 bg-bg/95 px-4 pt-1 pb-3 backdrop-blur">
        <div className="flex gap-2">
          {WEEKS.map((n) => {
            const active = n === week;
            const c = weekColors[n];
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
                }}
                className={`h-12 rounded-xl font-extrabold transition-transform active:scale-95 ${
                  n === 7 ? "flex-[1.6] text-base" : "flex-1 text-lg"
                }`}
              >
                {weekLabels[n]}
              </button>
            );
          })}
        </div>
      </nav>

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
    </>
  );
}
