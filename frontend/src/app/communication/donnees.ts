export type Etape = {
  ordre: number;
  declencheur: string;
  delai: string;
  typeEnvoi: "Email" | "SMS";
};

export type Envoi = {
  date: string;
  donateur: string;
  canal: "Email" | "SMS";
  statut: "Envoyé" | "Ouvert" | "Échec";
};

// Parcours et journal simulés : lecture seule, aucune automatisation réelle.
export const parcours = {
  nom: "Nouveau donateur",
  etapes: [
    { ordre: 2, declencheur: "+7 jours après le 1er don", delai: "7 jours", typeEnvoi: "Email" as const },
    { ordre: 1, declencheur: "1er don reçu", delai: "immédiat", typeEnvoi: "Email" as const },
    { ordre: 3, declencheur: "+30 jours après le 1er don", delai: "30 jours", typeEnvoi: "SMS" as const },
  ] satisfies Etape[],
};

export const journalEnvois: Envoi[] = [
  { date: "2026-11-01", donateur: "Julien Moreau", canal: "Email", statut: "Ouvert" },
  { date: "2026-10-28", donateur: "Alice Lefèvre", canal: "Email", statut: "Envoyé" },
  { date: "2026-09-12", donateur: "Sophie Girard", canal: "SMS", statut: "Échec" },
];
