import { describe, expect, it } from "vitest";
import { trierDonsDecroissant } from "./trier";
import type { Don } from "./dons";

describe("trierDonsDecroissant", () => {
  it("trie les dons du plus récent au plus ancien", () => {
    const dons: Don[] = [
      { date: "2024-01-01", montantCentimes: 1000, canal: "En ligne" },
      { date: "2026-01-01", montantCentimes: 2000, canal: "En ligne" },
      { date: "2025-01-01", montantCentimes: 1500, canal: "En ligne" },
    ];

    expect(trierDonsDecroissant(dons).map((don) => don.date)).toEqual([
      "2026-01-01",
      "2025-01-01",
      "2024-01-01",
    ]);
  });
});
