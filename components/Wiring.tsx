"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { WiringDiagram } from "@/content/wiring";

export default function Wiring({
  diagrams,
  color,
}: {
  diagrams: WiringDiagram[];
  color: string;
}) {
  const [zoom, setZoom] = useState<WiringDiagram | null>(null);

  // Escape closes the lightbox, and the page must not scroll behind it.
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoom]);

  const close = useCallback(() => setZoom(null), []);

  return (
    <>
      <p className="mt-3 mb-5 text-[15px] text-muted">
        Tap any picture to make it bigger.
      </p>

      <div className="flex flex-col gap-7">
        {diagrams.map((d) => (
          <section key={d.id}>
            <h2
              className="mb-2 text-2xl font-extrabold tracking-tight"
              style={{ color }}
            >
              <span className="opacity-50">{d.n}.</span> {d.title}
            </h2>

            <div
              className="overflow-hidden rounded-xl"
              style={{ boxShadow: `inset 0 0 0 3px ${color}` }}
            >
              <div className="grid gap-0 sm:grid-cols-[1.15fr_1fr]">
                {/* table first on phones, image first on wide screens */}
                <button
                  type="button"
                  onClick={() => setZoom(d)}
                  aria-label={`Enlarge: ${d.title}`}
                  className="order-2 cursor-zoom-in bg-white p-3 transition hover:brightness-95 sm:order-1"
                >
                  <Image
                    src={d.img}
                    alt={`Wiring diagram: ${d.title}`}
                    width={d.width}
                    height={d.height}
                    className="h-auto w-full"
                    priority={d.n === 1}
                  />
                </button>

                <div
                  className="order-1 flex flex-col justify-center gap-3 p-4 sm:order-2"
                  style={{ background: `${color}12` }}
                >
                  {d.groups.map((g, gi) => (
                    <div key={gi}>
                      {g.heading && (
                        <p className="mb-1 text-xs font-extrabold tracking-wide uppercase opacity-60">
                          {g.heading}
                        </p>
                      )}
                      <ul className="flex flex-col gap-1">
                        {g.rows.map((r) => (
                          <li
                            key={`${r.from}-${r.to}`}
                            className="flex items-center gap-2 text-[15px]"
                          >
                            {r.swatch && (
                              <span
                                aria-hidden="true"
                                className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-black/20"
                                style={{ background: r.swatch }}
                              />
                            )}
                            <span className="font-semibold">{r.from}</span>
                            <span aria-hidden="true" className="opacity-40">
                              →
                            </span>
                            <span className="font-mono font-bold">{r.to}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {d.note && (
                    <p className="text-[13px] leading-snug text-muted">
                      {d.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoom.title}
          onClick={close}
          className="fixed inset-0 z-50 cursor-zoom-out"
        >
          {/* solid backdrop: the sticky nav's blur makes a translucent one leak */}
          <div className="absolute inset-0 bg-[#0b0d0e]" />

          <div className="relative flex h-full flex-col items-center justify-center gap-3 p-4">
            <div className="flex w-full max-w-5xl items-center justify-between gap-4">
              <p className="text-lg font-extrabold text-white">{zoom.title}</p>
              <button
                type="button"
                onClick={close}
                className="h-10 shrink-0 rounded-lg bg-white/15 px-4 font-bold text-white hover:bg-white/25"
              >
                Close
              </button>
            </div>
            <Image
              src={zoom.img}
              alt={`Wiring diagram: ${zoom.title}`}
              width={zoom.width}
              height={zoom.height}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[78vh] w-auto max-w-full rounded-lg bg-white object-contain p-2"
            />
          </div>
        </div>
      )}
    </>
  );
}
