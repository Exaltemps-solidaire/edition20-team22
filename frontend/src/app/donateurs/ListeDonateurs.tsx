"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Donateur } from "./donnees";
import { donsParDonateur } from "./dons";
import { filtrerDonateurs } from "./filtrer";
import { syntheseDons } from "./synthese";
import styles from "./liste-donateurs.module.css";

function formatMontant(centimes: number): string {
  return (centimes / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR");
}

const TOUS = "Tous";

export default function ListeDonateurs({ donateurs }: { donateurs: Donateur[] }) {
  const [recherche, setRecherche] = useState("");
  const [persona, setPersona] = useState(TOUS);
  const [statut, setStatut] = useState(TOUS);

  const personas = useMemo(() => [...new Set(donateurs.map((d) => d.persona))].sort(), [donateurs]);
  const statuts = useMemo(() => [...new Set(donateurs.map((d) => d.statut))].sort(), [donateurs]);

  const resultats = filtrerDonateurs(donateurs, recherche, {
    persona: persona === TOUS ? undefined : persona,
    statut: statut === TOUS ? undefined : statut,
  });

  return (
    <div className={`${styles.carte} ${styles.liste}`}>
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
        <span className={styles.compteur}>
          {resultats.length} donateur{resultats.length > 1 ? "s" : ""}
        </span>
      </div>
      <table className={styles.tableau}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Statut</th>
            <th>Persona</th>
            <th>Dernier don</th>
            <th>Total cumulé</th>
          </tr>
        </thead>
        <tbody>
          {resultats.map((donateur) => {
            const synthese = syntheseDons(donsParDonateur[donateur.id] ?? []);
            return (
              <tr key={donateur.id}>
                <td>
                  <Link href={`/donateurs/${donateur.id}`}>
                    {donateur.prenom} {donateur.nom}
                  </Link>
                </td>
                <td>{donateur.email}</td>
                <td>
                  <span className={styles.badge}>{donateur.statut}</span>
                </td>
                <td>
                  <span className={styles.badge}>{donateur.persona}</span>
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
