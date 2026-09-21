import { createHighlighter, type Highlighter } from "shiki";

let cached: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!cached) {
    cached = createHighlighter({
      themes: ["github-dark"],
      langs: ["cpp"],
    });
  }
  return cached;
}

/**
 * Highlight Arduino code at build time. Arduino sketches are C++, so the
 * cpp grammar handles them, including the Serial/pinMode calls.
 */
export async function highlightCpp(code: string): Promise<string> {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, {
    lang: "cpp",
    theme: "github-dark",
  });
}
