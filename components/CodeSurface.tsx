"use client";

import { useCallback, useRef, useState } from "react";
import CopyButton, { copyText } from "./CopyButton";

export default function CodeSurface({
  code,
  html,
  accent,
}: {
  code: string;
  html: string;
  accent: string;
}) {
  const [flash, setFlash] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ping = useCallback((ok: boolean) => {
    if (!ok) return;
    setFlash(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlash(false), 600);
  }, []);

  const onSurfaceClick = useCallback(async () => {
    const sel = window.getSelection()?.toString();
    if (sel && sel.length > 0) return;
    ping(await copyText(code));
  }, [code, ping]);

  return (
    <div
      className="copy-target group relative overflow-hidden rounded-xl transition-shadow"
      style={{ boxShadow: `0 0 0 3px ${flash ? "#22a06b" : accent}` }}
      onClick={onSurfaceClick}
      title="Click to copy"
    >
      <div className="absolute top-2.5 right-2.5 z-10">
        <CopyButton text={code} accent={accent} onResult={ping} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
