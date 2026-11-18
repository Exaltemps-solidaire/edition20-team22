import { describe, expect, it } from "vitest";
import { calculerKpis } from "./kpis";
import type { Donateur } from "../donateurs/donnees";
import type { Don } from "../donateurs/dons";

const donateurs: Donateur[] = [
  { id: "1", nom: "A", prenom: "A", email: "a@example.org", statut: "Nouveau", persona: "Nouveau donateur", dernierDon: { date: "2026-01-01", montantCentimes: 1000 } },
  {
    id: "2",
    nom: "B",
    prenom: "B",
    email: "b@example.org",
    statut: "Actif régulier",
    persona: "Mensuel fidèle",
    dernierDon: { date: "2026-01-01", montantCentimes: 2000 },
    engagement: {
      montantCentimes: 2000,
      frequence: "Mensuelle",
      moyenPaiement: "Prélèvement SEPA",
      dateDebut: "2025-01-01",
      echeancesReussies: 12,
      statut: "Actif",
    },
  },
  { id: "3", nom: "C", prenom: "C", email: "c@example.org", statut: "Inactif", persona: "À réactiver", dernierDon: { date: "2024-01-01", montantCentimes: 500 } },
];

const dons: Record<string, Don[]> = {
  "1": [{ date: "2026-01-01", montantCentimes: 1000, canal: "En ligne", statut: "Réussi" }],
  "2": [{ date: "2026-01-01", montantCentimes: 2000, canal: "En ligne", statut: "Réussi" }],
  "3": [{ date: "2024-01-01", montantCentimes: 500, canal: "En ligne", statut: "Réussi" }],
};

describe("calculerKpis", () => {
  it("compte les donateurs par statut et calcule le montant total", () => {
    const kpis = calculerKpis(donateurs, dons);

    expect(kpis.totalDonateurs).toBe(3);
    expect(kpis.nouveauxDonateurs).toBe(1);
    expect(kpis.donateursActifs).toBe(1);
    expect(kpis.aReactiver).toBe(1);
    expect(kpis.engagementsActifs).toBe(1);
    expect(kpis.montantTotalCentimes).toBe(3500);
    expect(kpis.nombreDonsTotal).toBe(3);
  });

  it("calcule la répartition par persona en pourcentage", () => {
    const kpis = calculerKpis(donateurs, dons);

    expect(kpis.repartitionParPersona).toEqual([
      { persona: "Nouveau donateur", nombre: 1, pourcentage: 33 },
      { persona: "Mensuel fidèle", nombre: 1, pourcentage: 33 },
      { persona: "À réactiver", nombre: 1, pourcentage: 33 },
    ]);
  });
});
