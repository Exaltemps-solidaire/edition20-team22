export type Modification = {
  donateurId: string;
  champ: string;
  ancienneValeur: string;
  nouvelleValeur: string;
  auteur: string;
  date: string;
};

// Journal fictif : trace les changements de champs clés, pour le prototype (Spec 1, écran B.7).
export const journalModifications: Modification[] = [
  {
    donateurId: "1",
    champ: "Téléphone",
    ancienneValeur: "—",
    nouvelleValeur: "+33612345601",
    auteur: "Camille (Relation donateurs)",
    date: "2026-10-29T09:12:00",
  },
  {
    donateurId: "2",
    champ: "Statut",
    ancienneValeur: "Nouveau",
    nouvelleValeur: "Actif régulier",
    auteur: "Automatique",
    date: "2026-09-01T02:00:00",
  },
  {
    donateurId: "2",
    champ: "Persona",
    ancienneValeur: "Nouveau donateur",
    nouvelleValeur: "Mensuel fidèle",
    auteur: "Automatique",
    date: "2026-09-01T02:00:00",
  },
  {
    donateurId: "3",
    champ: "Statut",
    ancienneValeur: "Actif ponctuel",
    nouvelleValeur: "À risque",
    auteur: "Automatique",
    date: "2026-09-13T02:00:00",
  },
  {
    donateurId: "6",
    champ: "Adresse",
    ancienneValeur: "—",
    nouvelleValeur: "22 rue Nationale, 59800 Lille",
    auteur: "Hugo Petit (en ligne)",
    date: "2026-08-06T18:40:00",
  },
  {
    donateurId: "7",
    champ: "Persona",
    ancienneValeur: "Ponctuel engagé",
    nouvelleValeur: "Grand donateur",
    auteur: "Automatique",
    date: "2026-09-21T02:00:00",
  },
];
