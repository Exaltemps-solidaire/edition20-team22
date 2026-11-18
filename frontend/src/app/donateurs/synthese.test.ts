import { describe, expect, it } from "vitest";
import { scoreCompletude, syntheseDons } from "./synthese";
import type { Don } from "./dons";
import type { Donateur } from "./donnees";

describe("syntheseDons", () => {
  it("additionne uniquement les dons réussis et calcule le don moyen", () => {
    const dons: Don[] = [
      { date: "2026-01-01", montantCentimes: 1000, canal: "En ligne", statut: "Réussi" },
      { date: "2026-02-01", montantCentimes: 3000, canal: "En ligne", statut: "Réussi" },
      { date: "2026-03-01", montantCentimes: 9999, canal: "En ligne", statut: "Échoué" },
    ];

    const resultat = syntheseDons(dons);

    expect(resultat.totalCentimes).toBe(4000);
    expect(resultat.nombreDons).toBe(2);
    expect(resultat.donMoyenCentimes).toBe(2000);
    expect(resultat.premierDon).toBe("2026-01-01");
    expect(resultat.dernierDon).toBe("2026-02-01");
  });

  it("retourne une synthèse vide quand il n'y a aucun don", () => {
    expect(syntheseDons([])).toEqual({
      totalCentimes: 0,
      nombreDons: 0,
      donMoyenCentimes: 0,
      premierDon: null,
      dernierDon: null,
    });
  });
});

describe("scoreCompletude", () => {
  const base: Donateur = {
    id: "1",
    nom: "Test",
    prenom: "Donateur",
    email: "test@example.org",
    statut: "Nouveau",
    persona: "Nouveau donateur",
    dernierDon: { date: "2026-01-01", montantCentimes: 1000 },
  };

  it("vaut 0 quand aucun champ optionnel n'est renseigné", () => {
    expect(scoreCompletude(base)).toBe(0);
  });

  it("vaut 100 quand tous les champs clés sont renseignés", () => {
    expect(
      scoreCompletude({ ...base, telephone: "+33600000000", dateNaissance: "1990-01-01", ville: "Paris" }),
    ).toBe(100);
  });
});
