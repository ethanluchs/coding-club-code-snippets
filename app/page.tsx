import { snippets, weekColors, weekLabels } from "@/content/snippets";
import { highlightCpp } from "@/lib/highlight";
import SnippetList from "@/components/SnippetList";

export default async function Home() {
  // Highlight every snippet at build time, then hand the HTML to the client
  // component that does the week filtering.
  const items = await Promise.all(
    snippets.map(async (s) => ({
      ...s,
      html: await highlightCpp(s.code),
    })),
  );

  return (
    <>
      <header className="mb-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          The Robot Car
        </h1>
        <p className="mt-1 text-[15px] text-muted">
          Tap <strong>Copy</strong>, then paste into the Arduino IDE with
          Ctrl+V. Clear the editor first: Ctrl+A, then Delete.
        </p>
      </header>

      <SnippetList
        items={items}
        weekColors={weekColors}
        weekLabels={weekLabels}
      />
    </>
  );
}
