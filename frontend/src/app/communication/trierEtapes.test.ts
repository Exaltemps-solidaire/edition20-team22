import { describe, expect, it } from "vitest";
import { trierEtapes } from "./trierEtapes";
import type { Etape } from "./donnees";

describe("trierEtapes", () => {
  it("affiche les étapes dans l'ordre du parcours", () => {
    const etapes: Etape[] = [
      { ordre: 3, declencheur: "c", delai: "30 jours", typeEnvoi: "SMS" },
      { ordre: 1, declencheur: "a", delai: "immédiat", typeEnvoi: "Email" },
      { ordre: 2, declencheur: "b", delai: "7 jours", typeEnvoi: "Email" },
    ];

    expect(trierEtapes(etapes).map((e) => e.declencheur)).toEqual(["a", "b", "c"]);
  });
});
