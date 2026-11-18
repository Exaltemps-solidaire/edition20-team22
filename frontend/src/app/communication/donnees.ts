export type Etape = {
  id?: string;
  ordre: number;
  declencheur: string;
  delai: string;
  typeEnvoi: "Email" | "SMS";
  partagee?: boolean;
};

export type Parcours = {
  id: string;
  nom: string;
  persona: string;
  statut: "Actif" | "En pause" | "Brouillon";
  etapes: Etape[];
};

export type Envoi = {
  date: string;
  donateur: string;
  canal: "Email" | "SMS";
  statut: "Envoyé" | "Ouvert" | "Échec";
};

// Parcours et journal simulés : lecture seule, aucune automatisation réelle.
// L'étape "anniversaire" est partagée entre les deux parcours (cf. passation/cadrage/3-solution.md).
export const parcoursListe: Parcours[] = [
  {
    id: "nouveau",
    nom: "Nouveau donateur",
    persona: "Nouveau donateur",
    statut: "Actif",
    etapes: [
      { id: "n1", ordre: 2, declencheur: "+7 jours après le 1er don", delai: "7 jours", typeEnvoi: "Email" },
      { id: "n0", ordre: 1, declencheur: "1er don reçu", delai: "immédiat", typeEnvoi: "Email" },
      { id: "n2", ordre: 3, declencheur: "+30 jours après le 1er don", delai: "30 jours", typeEnvoi: "SMS" },
      {
        id: "anniversaire",
        ordre: 4,
        declencheur: "Anniversaire du 1er don (+1 an)",
        delai: "365 jours",
        typeEnvoi: "Email",
        partagee: true,
      },
    ],
  },
  {
    id: "reactivation",
    nom: "Donateur à réactiver",
    persona: "À réactiver",
    statut: "Actif",
    etapes: [
      { id: "r0", ordre: 1, declencheur: "Passage au statut À risque", delai: "immédiat", typeEnvoi: "Email" },
      { id: "r1", ordre: 2, declencheur: "Message d'impact (« grâce à vous… »)", delai: "15 jours", typeEnvoi: "Email" },
      {
        id: "anniversaire",
        ordre: 3,
        declencheur: "Anniversaire du 1er don (+1 an)",
        delai: "365 jours",
        typeEnvoi: "Email",
        partagee: true,
      },
    ],
  },
];

export const journalEnvois: Envoi[] = [
  { date: "2026-11-01", donateur: "Julien Moreau", canal: "Email", statut: "Ouvert" },
  { date: "2026-10-28", donateur: "Alice Lefèvre", canal: "Email", statut: "Envoyé" },
  { date: "2026-11-04", donateur: "Alice Lefèvre", canal: "Email", statut: "Ouvert" },
  { date: "2026-09-12", donateur: "Sophie Girard", canal: "SMS", statut: "Échec" },
  { date: "2026-09-26", donateur: "Sophie Girard", canal: "Email", statut: "Envoyé" },
  { date: "2026-08-20", donateur: "Marc Bernard", canal: "Email", statut: "Ouvert" },
  { date: "2026-11-06", donateur: "Hugo Petit", canal: "Email", statut: "Ouvert" },
  { date: "2026-09-25", donateur: "Nathalie Rousseau", canal: "Email", statut: "Ouvert" },
  { date: "2026-02-15", donateur: "Thomas Faure", canal: "Email", statut: "Envoyé" },
];
