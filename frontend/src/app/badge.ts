type Categorie = "statutDonateur" | "persona" | "statutEngagement" | "statutDon" | "statutEnvoi";

// Une couleur par valeur métier, pour que statut/persona se distinguent d'un coup d'œil
// au lieu d'un badge indigo unique partout.
const PALETTES: Record<Categorie, Record<string, string>> = {
  statutDonateur: {
    Nouveau: "Bleu",
    "Actif régulier": "Vert",
    "Actif ponctuel": "Vert",
    "À risque": "Ambre",
    Inactif: "Gris",
  },
  persona: {
    "Nouveau donateur": "Bleu",
    "Mensuel fidèle": "Violet",
    "Mensuel récent": "Violet",
    "Ponctuel engagé": "Teal",
    "Ponctuel occasionnel": "Teal",
    "À réactiver": "Ambre",
    "Grand donateur": "Rose",
  },
  statutEngagement: {
    Actif: "Vert",
    Suspendu: "Ambre",
    Arrêté: "Gris",
  },
  statutDon: {
    Réussi: "Vert",
    Échoué: "Rouge",
    Remboursé: "Gris",
  },
  statutEnvoi: {
    Ouvert: "Vert",
    Envoyé: "Bleu",
    Échec: "Rouge",
  },
};

export function badgeClasse(styles: Record<string, string>, categorie: Categorie, valeur: string): string {
  const couleur = PALETTES[categorie][valeur] ?? "Gris";
  return `${styles.badge} ${styles[`badge${couleur}`] ?? ""}`;
}
