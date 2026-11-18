import type { Donateur } from "./donnees";

// Recherche sur nom, prénom et email, insensible à la casse et aux accents.
export function filtrerDonateurs(donateurs: Donateur[], recherche: string): Donateur[] {
  const normalise = (texte: string) =>
    texte
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();

  const terme = normalise(recherche.trim());
  if (terme === "") return donateurs;

  return donateurs.filter((donateur) =>
    [donateur.nom, donateur.prenom, donateur.email].some((champ) => normalise(champ).includes(terme)),
  );
}
