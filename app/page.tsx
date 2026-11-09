import {
  snippets,
  weekColors,
  comingSoon,
  done,
  currentWeek,
} from "@/content/snippets";
import { diagrams, pulaskiDiagrams } from "@/content/wiring";
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

  // Pulaski runs the week-7 course sketch only — no wheels test.
  const pulaskiItems = ["course-challenge"]
    .map((id) => items.find((s) => s.id === id))
    .filter((s): s is (typeof items)[number] => s !== undefined);

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
        comingSoon={comingSoon}
        done={done}
        currentWeek={currentWeek}
        diagrams={diagrams}
        pulaskiItems={pulaskiItems}
        pulaskiDiagrams={pulaskiDiagrams}
      />
    </>
  );
}
