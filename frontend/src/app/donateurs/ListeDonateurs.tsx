"use client";

import { useState } from "react";
import Link from "next/link";
import type { Donateur } from "./donnees";
import { filtrerDonateurs } from "./filtrer";
import styles from "./liste-donateurs.module.css";

function formatMontant(centimes: number): string {
  return (centimes / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR");
}

export default function ListeDonateurs({ donateurs }: { donateurs: Donateur[] }) {
  const [recherche, setRecherche] = useState("");
  const resultats = filtrerDonateurs(donateurs, recherche);

  return (
    <div className={styles.conteneur}>
      <input
        type="search"
        placeholder="Rechercher un nom ou un email…"
        value={recherche}
        onChange={(evenement) => setRecherche(evenement.target.value)}
        className={styles.recherche}
        aria-label="Rechercher un donateur"
      />
      <table className={styles.tableau}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Statut</th>
            <th>Persona</th>
            <th>Dernier don</th>
          </tr>
        </thead>
        <tbody>
          {resultats.map((donateur) => (
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
            </tr>
          ))}
        </tbody>
      </table>
      {resultats.length === 0 && <p className={styles.vide}>Aucun donateur ne correspond à la recherche.</p>}
    </div>
  );
}
