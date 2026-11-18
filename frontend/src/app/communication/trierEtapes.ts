import type { Etape } from "./donnees";

export function trierEtapes(etapes: Etape[]): Etape[] {
  return [...etapes].sort((a, b) => a.ordre - b.ordre);
}
