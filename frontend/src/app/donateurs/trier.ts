import type { Don } from "./dons";

export function trierDonsDecroissant(dons: Don[]): Don[] {
  return [...dons].sort((a, b) => b.date.localeCompare(a.date));
}
