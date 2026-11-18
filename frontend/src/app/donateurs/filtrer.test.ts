import { describe, expect, it } from "vitest";
import { filtrerDonateurs } from "./filtrer";
import type { Donateur } from "./donnees";

const donateurs: Donateur[] = [
  {
    id: "1",
    nom: "Lefèvre",
    prenom: "Alice",
    email: "alice.lefevre@example.org",
    statut: "Nouveau",
    persona: "Nouveau donateur",
    dernierDon: { date: "2026-10-28", montantCentimes: 2000 },
  },
  {
    id: "2",
    nom: "Moreau",
    prenom: "Julien",
    email: "julien.moreau@example.org",
    statut: "Actif régulier",
    persona: "Mensuel fidèle",
    dernierDon: { date: "2026-11-01", montantCentimes: 1500 },
  },
];

describe("filtrerDonateurs", () => {
  it("retourne tous les donateurs quand la recherche est vide", () => {
    expect(filtrerDonateurs(donateurs, "")).toHaveLength(2);
  });

  it("filtre sur le nom, insensible à la casse et aux accents", () => {
    expect(filtrerDonateurs(donateurs, "lefevre")).toEqual([donateurs[0]]);
  });

  it("filtre sur l'email", () => {
    expect(filtrerDonateurs(donateurs, "julien.moreau")).toEqual([donateurs[1]]);
  });
});
