import type { Don } from "../donateurs/dons";
import type { Donateur } from "../donateurs/donnees";
import { syntheseDons } from "../donateurs/synthese";

export type RepartitionPersona = { persona: string; nombre: number; pourcentage: number };

export type Kpis = {
  totalDonateurs: number;
  nouveauxDonateurs: number;
  donateursActifs: number;
  aReactiver: number;
  engagementsActifs: number;
  montantTotalCentimes: number;
  nombreDonsTotal: number;
  donMoyenCentimes: number;
  repartitionParPersona: RepartitionPersona[];
};

export function calculerKpis(donateurs: Donateur[], donsParDonateur: Record<string, Don[]>): Kpis {
  const tousLesDons = Object.values(donsParDonateur).flat();
  const synthese = syntheseDons(tousLesDons);

  const totalDonateurs = donateurs.length;
  const nouveauxDonateurs = donateurs.filter((d) => d.statut === "Nouveau").length;
  const donateursActifs = donateurs.filter(
    (d) => d.statut === "Actif régulier" || d.statut === "Actif ponctuel",
  ).length;
  const aReactiver = donateurs.filter((d) => d.statut === "À risque" || d.statut === "Inactif").length;
  const engagementsActifs = donateurs.filter((d) => d.engagement?.statut === "Actif").length;

  const parPersona = new Map<string, number>();
  for (const donateur of donateurs) {
    parPersona.set(donateur.persona, (parPersona.get(donateur.persona) ?? 0) + 1);
  }
  const repartitionParPersona: RepartitionPersona[] = [...parPersona.entries()]
    .map(([persona, nombre]) => ({
      persona,
      nombre,
      pourcentage: totalDonateurs === 0 ? 0 : Math.round((nombre / totalDonateurs) * 100),
    }))
    .sort((a, b) => b.nombre - a.nombre);

  return {
    totalDonateurs,
    nouveauxDonateurs,
    donateursActifs,
    aReactiver,
    engagementsActifs,
    montantTotalCentimes: synthese.totalCentimes,
    nombreDonsTotal: synthese.nombreDons,
    donMoyenCentimes: synthese.donMoyenCentimes,
    repartitionParPersona,
  };
}
