import type { Donateur } from "./donnees";

export type CriteresFiltre = {
  persona?: string;
  statut?: string;
  frequence?: string;
};

// Recherche sur nom, prénom et email, insensible à la casse et aux accents,
// combinée aux filtres persona / statut / fréquence (vide ou "Tous" = pas de filtre).
export function filtrerDonateurs(
  donateurs: Donateur[],
  recherche: string,
  criteres: CriteresFiltre = {},
): Donateur[] {
  const normalise = (texte: string) =>
    texte
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();

  const terme = normalise(recherche.trim());

  return donateurs.filter((donateur) => {
    const correspondRecherche =
      terme === "" || [donateur.nom, donateur.prenom, donateur.email].some((champ) => normalise(champ).includes(terme));
    const correspondPersona = !criteres.persona || donateur.persona === criteres.persona;
    const correspondStatut = !criteres.statut || donateur.statut === criteres.statut;
    const correspondFrequence = !criteres.frequence || donateur.engagement?.frequence === criteres.frequence;

    return correspondRecherche && correspondPersona && correspondStatut && correspondFrequence;
  });
}
