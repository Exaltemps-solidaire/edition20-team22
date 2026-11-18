import type { Don } from "./dons";
import type { Donateur } from "./donnees";

export type SyntheseDons = {
  totalCentimes: number;
  nombreDons: number;
  donMoyenCentimes: number;
  premierDon: string | null;
  dernierDon: string | null;
};

export function syntheseDons(dons: Don[]): SyntheseDons {
  const reussis = dons.filter((don) => don.statut !== "Échoué" && don.statut !== "Remboursé");
  const totalCentimes = reussis.reduce((somme, don) => somme + don.montantCentimes, 0);
  const dates = reussis.map((don) => don.date).sort();

  return {
    totalCentimes,
    nombreDons: reussis.length,
    donMoyenCentimes: reussis.length === 0 ? 0 : Math.round(totalCentimes / reussis.length),
    premierDon: dates[0] ?? null,
    dernierDon: dates[dates.length - 1] ?? null,
  };
}

const CHAMPS_COMPLETUDE: (keyof Donateur)[] = ["telephone", "dateNaissance", "ville"];

// Pourcentage des champs clés renseignés, hors champs obligatoires (nom, prénom, email).
export function scoreCompletude(donateur: Donateur): number {
  const renseignes = CHAMPS_COMPLETUDE.filter((champ) => Boolean(donateur[champ])).length;
  return Math.round((renseignes / CHAMPS_COMPLETUDE.length) * 100);
}
