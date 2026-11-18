export type Template = {
  id: string;
  nom: string;
  canal: "Email" | "SMS";
  categorie: "Remerciement" | "Impact" | "Anniversaire" | "Relance" | "Newsletter";
  personas: string[];
  version: number;
  derniereModification: string;
  tauxOuverture: number;
};

// Bibliothèque de templates simulée (Spec 3, partie B) : lecture seule, pas d'éditeur dans ce prototype.
export const templates: Template[] = [
  {
    id: "remerciement-premier-don",
    nom: "Merci pour votre premier don",
    canal: "Email",
    categorie: "Remerciement",
    personas: ["Nouveau donateur"],
    version: 3,
    derniereModification: "2026-10-02",
    tauxOuverture: 0.68,
  },
  {
    id: "impact-grace-a-vous",
    nom: "Grâce à vous — message d'impact",
    canal: "Email",
    categorie: "Impact",
    personas: ["À réactiver", "Ponctuel engagé"],
    version: 2,
    derniereModification: "2026-09-18",
    tauxOuverture: 0.41,
  },
  {
    id: "anniversaire-premier-don",
    nom: "1 an avec nous",
    canal: "Email",
    categorie: "Anniversaire",
    personas: ["Nouveau donateur", "À réactiver"],
    version: 1,
    derniereModification: "2026-07-11",
    tauxOuverture: 0.55,
  },
  {
    id: "relance-30-jours",
    nom: "Relance à 30 jours",
    canal: "SMS",
    categorie: "Relance",
    personas: ["Nouveau donateur"],
    version: 2,
    derniereModification: "2026-10-29",
    tauxOuverture: 0.22,
  },
  {
    id: "newsletter-mensuelle",
    nom: "Newsletter mensuelle",
    canal: "Email",
    categorie: "Newsletter",
    personas: ["Mensuel fidèle", "Mensuel récent", "Grand donateur"],
    version: 5,
    derniereModification: "2026-11-01",
    tauxOuverture: 0.37,
  },
  {
    id: "remerciement-grand-don",
    nom: "Merci pour votre générosité",
    canal: "Email",
    categorie: "Remerciement",
    personas: ["Grand donateur"],
    version: 1,
    derniereModification: "2026-08-04",
    tauxOuverture: 0.74,
  },
];
