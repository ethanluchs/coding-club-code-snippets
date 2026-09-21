"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "failed";

/**
 * Copy text to the clipboard, trying the modern API first and falling back
 * to the old execCommand trick. The async clipboard API needs a secure
 * context (https or localhost) and can be switched off by browser policy,
 * so the fallback is not optional.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function CopyButton({
  text,
  accent,
  onResult,
}: {
  text: string;
  accent: string;
  onResult?: (ok: boolean) => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handle = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      const ok = await copyText(text);
      setStatus(ok ? "copied" : "failed");
      onResult?.(ok);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus("idle"), 2200);
    },
    [text, onResult],
  );

  const bg =
    status === "copied" ? "#22a06b" : status === "failed" ? "#c40000" : accent;

  return (
    <button
      type="button"
      onClick={handle}
      aria-live="polite"
      style={{ background: bg }}
      className="no-print h-9 shrink-0 rounded-lg px-4 text-sm font-extrabold text-white transition-transform active:scale-95"
    >
      {status === "copied"
        ? "Copied!"
        : status === "failed"
          ? "Ctrl+C"
          : "Copy"}
    </button>
  );
}
