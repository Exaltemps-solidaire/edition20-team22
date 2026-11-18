export type Donateur = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  statut: "Nouveau" | "Actif régulier" | "Actif ponctuel" | "À risque" | "Inactif";
  persona: string;
  dernierDon: { date: string; montantCentimes: number };
};

// Données fictives pour le prototype : aucune donnée réelle de donateur (cf. passation).
export const donateurs: Donateur[] = [
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
  {
    id: "3",
    nom: "Girard",
    prenom: "Sophie",
    email: "sophie.girard@example.org",
    statut: "À risque",
    persona: "À réactiver",
    dernierDon: { date: "2025-09-12", montantCentimes: 3000 },
  },
  {
    id: "4",
    nom: "Bernard",
    prenom: "Marc",
    email: "marc.bernard@example.org",
    statut: "Actif ponctuel",
    persona: "Ponctuel engagé",
    dernierDon: { date: "2026-08-15", montantCentimes: 5000 },
  },
  {
    id: "5",
    nom: "Dubois",
    prenom: "Claire",
    email: "claire.dubois@example.org",
    statut: "Inactif",
    persona: "À réactiver",
    dernierDon: { date: "2024-11-02", montantCentimes: 1000 },
  },
  {
    id: "6",
    nom: "Petit",
    prenom: "Hugo",
    email: "hugo.petit@example.org",
    statut: "Actif régulier",
    persona: "Mensuel récent",
    dernierDon: { date: "2026-11-05", montantCentimes: 1000 },
  },
];
