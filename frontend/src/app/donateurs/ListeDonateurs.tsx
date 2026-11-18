"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import type { Donateur } from "./donnees";
import { donsParDonateur } from "./dons";
import { filtrerDonateurs } from "./filtrer";
import { syntheseDons } from "./synthese";
import { badgeClasse } from "../badge";
import styles from "./liste-donateurs.module.css";

function formatMontant(centimes: number): string {
  return (centimes / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR");
}

function initiales(donateur: Donateur): string {
  return `${donateur.prenom[0] ?? ""}${donateur.nom[0] ?? ""}`.toUpperCase();
}

const TOUS = "Tous";

type ColonneTri = "nom" | "dernierDon" | "totalCumule";

function echapperCsv(valeur: string): string {
  return `"${valeur.replace(/"/g, '""')}"`;
}

function telechargerCsv(donateurs: Donateur[]) {
  const entetes = ["Nom", "Prénom", "Email", "Statut", "Persona", "Dernier don", "Total cumulé"];
  const lignes = donateurs.map((donateur) => {
    const synthese = syntheseDons(donsParDonateur[donateur.id] ?? []);
    return [
      donateur.nom,
      donateur.prenom,
      donateur.email,
      donateur.statut,
      donateur.persona,
      formatMontant(donateur.dernierDon.montantCentimes),
      formatMontant(synthese.totalCentimes),
    ]
      .map(echapperCsv)
      .join(",");
  });
  const csv = [entetes.map(echapperCsv).join(","), ...lignes].join("\n");
  const blob = new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const lien = document.createElement("a");
  lien.href = url;
  lien.download = "donateurs.csv";
  lien.click();
  URL.revokeObjectURL(url);
}

export default function ListeDonateurs({ donateurs: donateursInitiaux }: { donateurs: Donateur[] }) {
  const [donateursAjoutes, setDonateursAjoutes] = useState<Donateur[]>([]);
  const [panneauOuvert, setPanneauOuvert] = useState(false);
  const [nouveauNom, setNouveauNom] = useState("");
  const [nouveauPrenom, setNouveauPrenom] = useState("");
  const [nouvelEmail, setNouvelEmail] = useState("");
  const [nouveauPersonaChamp, setNouveauPersonaChamp] = useState("Nouveau donateur");

  const [recherche, setRecherche] = useState("");
  const [persona, setPersona] = useState(TOUS);
  const [statut, setStatut] = useState(TOUS);
  const [frequence, setFrequence] = useState(TOUS);
  const [colonneTri, setColonneTri] = useState<ColonneTri | null>(null);
  const [ordreDescendant, setOrdreDescendant] = useState(true);

  const donateurs = useMemo(
    () => [...donateursAjoutes, ...donateursInitiaux],
    [donateursAjoutes, donateursInitiaux],
  );

  const personas = useMemo(() => [...new Set(donateurs.map((d) => d.persona))].sort(), [donateurs]);
  const statuts = useMemo(() => [...new Set(donateurs.map((d) => d.statut))].sort(), [donateurs]);
  const frequences = useMemo(
    () =>
      [...new Set(donateurs.map((d) => d.engagement?.frequence).filter(Boolean))].sort() as string[],
    [donateurs],
  );

  function ajouterDonateur(evenement: FormEvent) {
    evenement.preventDefault();
    if (!nouveauNom.trim() || !nouveauPrenom.trim() || !nouvelEmail.trim()) return;
    const nouveauDonateur: Donateur = {
      id: `local-${Date.now()}`,
      nom: nouveauNom.trim(),
      prenom: nouveauPrenom.trim(),
      email: nouvelEmail.trim(),
      statut: "Nouveau",
      persona: nouveauPersonaChamp,
      dernierDon: { date: new Date().toISOString().slice(0, 10), montantCentimes: 0 },
    };
    setDonateursAjoutes((precedents) => [nouveauDonateur, ...precedents]);
    setNouveauNom("");
    setNouveauPrenom("");
    setNouvelEmail("");
    setPanneauOuvert(false);
  }

  const resultats = filtrerDonateurs(donateurs, recherche, {
    persona: persona === TOUS ? undefined : persona,
    statut: statut === TOUS ? undefined : statut,
    frequence: frequence === TOUS ? undefined : frequence,
  });

  const resultatsTries = useMemo(() => {
    if (!colonneTri) return resultats;
    const avecSynthese = resultats.map((donateur) => ({
      donateur,
      synthese: syntheseDons(donsParDonateur[donateur.id] ?? []),
    }));
    avecSynthese.sort((a, b) => {
      let comparaison = 0;
      if (colonneTri === "nom") {
        comparaison = `${a.donateur.nom} ${a.donateur.prenom}`.localeCompare(`${b.donateur.nom} ${b.donateur.prenom}`);
      } else if (colonneTri === "dernierDon") {
        comparaison = a.donateur.dernierDon.date.localeCompare(b.donateur.dernierDon.date);
      } else {
        comparaison = a.synthese.totalCentimes - b.synthese.totalCentimes;
      }
      return ordreDescendant ? -comparaison : comparaison;
    });
    return avecSynthese.map((e) => e.donateur);
  }, [resultats, colonneTri, ordreDescendant]);

  function trierPar(colonne: ColonneTri) {
    if (colonneTri === colonne) {
      setOrdreDescendant(!ordreDescendant);
    } else {
      setColonneTri(colonne);
      setOrdreDescendant(true);
    }
  }

  function indicateurTri(colonne: ColonneTri): string {
    if (colonneTri !== colonne) return "";
    return ordreDescendant ? " ▼" : " ▲";
  }

  return (
    <div className={`${styles.carte} ${styles.liste}`}>
      <div className={styles.barreFiltres}>
        <button
          type="button"
          className={styles.bouton}
          onClick={() => setPanneauOuvert((ouvert) => !ouvert)}
        >
          {panneauOuvert ? "Annuler" : "+ Nouveau donateur"}
        </button>
      </div>

      {panneauOuvert && (
        <form className={`${styles.panneauAjout} ${styles.formulaire}`} onSubmit={ajouterDonateur}>
          <div className={styles.grilleFormulaire}>
            <label className={styles.champFormulaire}>
              Prénom
              <input
                type="text"
                value={nouveauPrenom}
                onChange={(evenement) => setNouveauPrenom(evenement.target.value)}
                className={styles.saisie}
                required
              />
            </label>
            <label className={styles.champFormulaire}>
              Nom
              <input
                type="text"
                value={nouveauNom}
                onChange={(evenement) => setNouveauNom(evenement.target.value)}
                className={styles.saisie}
                required
              />
            </label>
            <label className={styles.champFormulaire}>
              Email
              <input
                type="email"
                value={nouvelEmail}
                onChange={(evenement) => setNouvelEmail(evenement.target.value)}
                className={styles.saisie}
                required
              />
            </label>
            <label className={styles.champFormulaire}>
              Persona
              <select
                value={nouveauPersonaChamp}
                onChange={(evenement) => setNouveauPersonaChamp(evenement.target.value)}
                className={styles.filtre}
              >
                {(personas.length > 0 ? personas : ["Nouveau donateur"]).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit" className={styles.bouton}>
            Ajouter
          </button>
          <p className={styles.soustitre} style={{ margin: 0, fontSize: "0.8rem" }}>
            Ajout simulé côté navigateur : non persisté, il disparaît si la page est rechargée.
          </p>
        </form>
      )}

      <div className={styles.barreFiltres}>
        <input
          type="search"
          placeholder="Rechercher un nom ou un email…"
          value={recherche}
          onChange={(evenement) => setRecherche(evenement.target.value)}
          className={styles.recherche}
          aria-label="Rechercher un donateur"
        />
        <select
          value={persona}
          onChange={(evenement) => setPersona(evenement.target.value)}
          className={styles.filtre}
          aria-label="Filtrer par persona"
        >
          <option value={TOUS}>Tous les personas</option>
          {personas.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={statut}
          onChange={(evenement) => setStatut(evenement.target.value)}
          className={styles.filtre}
          aria-label="Filtrer par statut"
        >
          <option value={TOUS}>Tous les statuts</option>
          {statuts.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={frequence}
          onChange={(evenement) => setFrequence(evenement.target.value)}
          className={styles.filtre}
          aria-label="Filtrer par fréquence"
        >
          <option value={TOUS}>Toutes les fréquences</option>
          {frequences.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <button type="button" className={styles.bouton} onClick={() => telechargerCsv(resultatsTries)}>
          Exporter CSV
        </button>
        <span className={styles.compteur}>
          {resultats.length} donateur{resultats.length > 1 ? "s" : ""}
        </span>
      </div>
      <table className={styles.tableau}>
        <thead>
          <tr>
            <th>
              <button type="button" className={styles.entetetriable} onClick={() => trierPar("nom")}>
                Nom{indicateurTri("nom")}
              </button>
            </th>
            <th>Email</th>
            <th>Statut</th>
            <th>Persona</th>
            <th>
              <button type="button" className={styles.entetetriable} onClick={() => trierPar("dernierDon")}>
                Dernier don{indicateurTri("dernierDon")}
              </button>
            </th>
            <th>
              <button type="button" className={styles.entetetriable} onClick={() => trierPar("totalCumule")}>
                Total cumulé{indicateurTri("totalCumule")}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {resultatsTries.map((donateur) => {
            const synthese = syntheseDons(donsParDonateur[donateur.id] ?? []);
            return (
              <tr key={donateur.id}>
                <td>
                  <Link href={`/donateurs/${donateur.id}`} className={styles.nomAvecAvatar}>
                    <span className={styles.avatar}>{initiales(donateur)}</span>
                    {donateur.prenom} {donateur.nom}
                  </Link>
                </td>
                <td>{donateur.email}</td>
                <td>
                  <span className={badgeClasse(styles, "statutDonateur", donateur.statut)}>{donateur.statut}</span>
                </td>
                <td>
                  <span className={badgeClasse(styles, "persona", donateur.persona)}>{donateur.persona}</span>
                </td>
                <td>
                  {formatMontant(donateur.dernierDon.montantCentimes)} le {formatDate(donateur.dernierDon.date)}
                </td>
                <td>{formatMontant(synthese.totalCentimes)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {resultats.length === 0 && <p className={styles.vide}>Aucun donateur ne correspond à la recherche.</p>}
    </div>
  );
}
