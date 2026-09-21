export interface Snippet {
  id: string;
  title: string;
  week: number;
  /** Short pin list, shown as a chip. Omit when nothing needs wiring. */
  pins?: string;
  code: string;
}
