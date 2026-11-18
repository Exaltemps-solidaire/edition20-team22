export type Engagement = {
  montantCentimes: number;
  frequence: "Mensuelle" | "Trimestrielle" | "Semestrielle" | "Annuelle";
  moyenPaiement: "Prélèvement SEPA" | "CB";
  dateDebut: string;
  echeancesReussies: number;
  statut: "Actif" | "Suspendu" | "Arrêté";
};

export type Consentements = {
  email: boolean;
  sms: boolean;
  courrier: boolean;
};

export type Donateur = {
  id: string;
  civilite?: "M." | "Mme";
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateNaissance?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  pays?: string;
  sourceAcquisition?: string;
  consentements?: Consentements;
  statut: "Nouveau" | "Actif régulier" | "Actif ponctuel" | "À risque" | "Inactif";
  persona: string;
  dernierDon: { date: string; montantCentimes: number };
  engagement?: Engagement;
};

// Données fictives pour le prototype : aucune donnée réelle de donateur (cf. passation).
export const donateurs: Donateur[] = [
  {
    id: "1",
    civilite: "Mme",
    nom: "Lefèvre",
    prenom: "Alice",
    email: "alice.lefevre@example.org",
    telephone: "+33612345601",
    dateNaissance: "1991-03-14",
    adresse: "12 rue des Lices",
    codePostal: "35000",
    ville: "Rennes",
    pays: "France",
    sourceAcquisition: "Course Enfants sans Cancer",
    consentements: { email: true, sms: true, courrier: false },
    statut: "Nouveau",
    persona: "Nouveau donateur",
    dernierDon: { date: "2026-10-28", montantCentimes: 2000 },
  },
  {
    id: "2",
    civilite: "M.",
    nom: "Moreau",
    prenom: "Julien",
    email: "julien.moreau@example.org",
    telephone: "+33612345602",
    dateNaissance: "1985-07-02",
    adresse: "4 quai Saint-Antoine",
    codePostal: "69002",
    ville: "Lyon",
    pays: "France",
    sourceAcquisition: "Site web",
    consentements: { email: true, sms: false, courrier: false },
    statut: "Actif régulier",
    persona: "Mensuel fidèle",
    dernierDon: { date: "2026-11-01", montantCentimes: 1500 },
    engagement: {
      montantCentimes: 1500,
      frequence: "Mensuelle",
      moyenPaiement: "Prélèvement SEPA",
      dateDebut: "2025-09-01",
      echeancesReussies: 14,
      statut: "Actif",
    },
  },
  {
    id: "3",
    civilite: "Mme",
    nom: "Girard",
    prenom: "Sophie",
    email: "sophie.girard@example.org",
    telephone: "+33612345603",
    dateNaissance: "1978-12-20",
    adresse: "8 rue de Strasbourg",
    codePostal: "44000",
    ville: "Nantes",
    pays: "France",
    sourceAcquisition: "Rallye du Cœur",
    consentements: { email: true, sms: false, courrier: true },
    statut: "À risque",
    persona: "À réactiver",
    dernierDon: { date: "2025-09-12", montantCentimes: 3000 },
  },
  {
    id: "4",
    civilite: "M.",
    nom: "Bernard",
    prenom: "Marc",
    email: "marc.bernard@example.org",
    ville: "Toulouse",
    pays: "France",
    sourceAcquisition: "Septembre en or",
    consentements: { email: true, sms: false, courrier: false },
    statut: "Actif ponctuel",
    persona: "Ponctuel engagé",
    dernierDon: { date: "2026-08-15", montantCentimes: 5000 },
  },
  {
    id: "5",
    civilite: "Mme",
    nom: "Dubois",
    prenom: "Claire",
    email: "claire.dubois@example.org",
    telephone: "+33612345605",
    ville: "Bordeaux",
    pays: "France",
    sourceAcquisition: "Course Enfants sans Cancer",
    consentements: { email: false, sms: false, courrier: false },
    statut: "Inactif",
    persona: "À réactiver",
    dernierDon: { date: "2024-11-02", montantCentimes: 1000 },
  },
  {
    id: "6",
    civilite: "M.",
    nom: "Petit",
    prenom: "Hugo",
    email: "hugo.petit@example.org",
    telephone: "+33612345606",
    dateNaissance: "1996-05-30",
    adresse: "22 rue Nationale",
    codePostal: "59800",
    ville: "Lille",
    pays: "France",
    sourceAcquisition: "Colloque FAST",
    consentements: { email: true, sms: true, courrier: false },
    statut: "Actif régulier",
    persona: "Mensuel récent",
    dernierDon: { date: "2026-11-05", montantCentimes: 1000 },
    engagement: {
      montantCentimes: 1000,
      frequence: "Mensuelle",
      moyenPaiement: "Prélèvement SEPA",
      dateDebut: "2026-08-05",
      echeancesReussies: 3,
      statut: "Actif",
    },
  },
  {
    id: "7",
    civilite: "Mme",
    nom: "Rousseau",
    prenom: "Nathalie",
    email: "nathalie.rousseau@example.org",
    telephone: "+33612345607",
    dateNaissance: "1969-01-18",
    adresse: "3 avenue Montaigne",
    codePostal: "75008",
    ville: "Paris",
    pays: "France",
    sourceAcquisition: "Colloque FAST",
    consentements: { email: true, sms: false, courrier: true },
    statut: "Actif ponctuel",
    persona: "Grand donateur",
    dernierDon: { date: "2026-09-20", montantCentimes: 500000 },
  },
  {
    id: "8",
    civilite: "M.",
    nom: "Faure",
    prenom: "Thomas",
    email: "thomas.faure@example.org",
    ville: "Marseille",
    pays: "France",
    sourceAcquisition: "Site web",
    consentements: { email: true, sms: false, courrier: false },
    statut: "Actif ponctuel",
    persona: "Ponctuel occasionnel",
    dernierDon: { date: "2026-02-10", montantCentimes: 2500 },
  },
];
