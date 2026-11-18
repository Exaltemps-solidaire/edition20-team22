export type ReglePersona = {
  nom: string;
  regle: string;
  priorite: number;
  actif: boolean;
};

// Personas proposés au lancement (Spec 3, partie A) : règles lisibles, pas de moteur réel dans ce prototype.
export const reglesPersonas: ReglePersona[] = [
  { nom: "Grand donateur", regle: "Total des dons sur 12 mois ≥ seuil paramétrable", priorite: 1, actif: true },
  { nom: "À réactiver", regle: "Statut « À risque » ou « Inactif »", priorite: 2, actif: true },
  { nom: "Nouveau donateur", regle: "Premier don il y a moins de 90 jours", priorite: 3, actif: true },
  {
    nom: "Mensuel fidèle",
    regle: "Engagement mensuel actif avec 12 échéances réussies ou plus",
    priorite: 4,
    actif: true,
  },
  {
    nom: "Mensuel récent",
    regle: "Engagement actif avec moins de 12 échéances réussies",
    priorite: 5,
    actif: true,
  },
  {
    nom: "Ponctuel engagé",
    regle: "Au moins 2 dons ponctuels sur 24 mois, sans engagement",
    priorite: 6,
    actif: true,
  },
  { nom: "Ponctuel occasionnel", regle: "Un seul don ponctuel sur 24 mois", priorite: 7, actif: true },
];
