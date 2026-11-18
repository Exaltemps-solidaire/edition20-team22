"use client";

import { useState } from "react";
import { parcoursListe, journalEnvois } from "./donnees";
import { templates } from "./templates";
import { trierEtapes } from "./trierEtapes";
import { badgeClasse } from "../badge";
import styles from "../donateurs/liste-donateurs.module.css";

type Onglet = "parcours" | "templates" | "envois";

function formatPourcentage(valeur: number): string {
  return valeur.toLocaleString("fr-FR", { style: "percent", maximumFractionDigits: 0 });
}

export default function Communication() {
  const [onglet, setOnglet] = useState<Onglet>("parcours");

  return (
    <div className={styles.conteneur}>
      <h1>Communication</h1>
      <p className={styles.soustitre}>Parcours automatisés, bibliothèque de templates et historique des envois.</p>

      <div className={styles.onglets}>
        <button
          type="button"
          className={onglet === "parcours" ? `${styles.onglet} ${styles.ongletActif}` : styles.onglet}
          onClick={() => setOnglet("parcours")}
        >
          Parcours
        </button>
        <button
          type="button"
          className={onglet === "templates" ? `${styles.onglet} ${styles.ongletActif}` : styles.onglet}
          onClick={() => setOnglet("templates")}
        >
          Templates
        </button>
        <button
          type="button"
          className={onglet === "envois" ? `${styles.onglet} ${styles.ongletActif}` : styles.onglet}
          onClick={() => setOnglet("envois")}
        >
          Envois
        </button>
      </div>

      {onglet === "parcours" &&
        parcoursListe.map((parcours) => (
          <section className={styles.carte} key={parcours.id}>
            <h2>
              {parcours.nom} <span className={badgeClasse(styles, "persona", parcours.persona)}>{parcours.persona}</span>
            </h2>
            <table className={styles.tableau}>
              <thead>
                <tr>
                  <th>Étape</th>
                  <th>Déclencheur</th>
                  <th>Délai</th>
                  <th>Type d&apos;envoi</th>
                </tr>
              </thead>
              <tbody>
                {trierEtapes(parcours.etapes).map((etape) => (
                  <tr key={etape.id}>
                    <td>{etape.ordre}</td>
                    <td>
                      {etape.declencheur}{" "}
                      {etape.partagee && <span className={styles.badgePartagee}>partagée</span>}
                    </td>
                    <td>{etape.delai}</td>
                    <td>{etape.typeEnvoi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}

      {onglet === "templates" && (
        <section className={styles.carte}>
          <h2>Bibliothèque de templates</h2>
          <table className={styles.tableau}>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Canal</th>
                <th>Catégorie</th>
                <th>Personas</th>
                <th>Version</th>
                <th>Dernière modification</th>
                <th>Taux d&apos;ouverture</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr key={template.id}>
                  <td>{template.nom}</td>
                  <td>{template.canal}</td>
                  <td>{template.categorie}</td>
                  <td>
                    {template.personas.map((p) => (
                      <span key={p} className={badgeClasse(styles, "persona", p)} style={{ marginRight: "0.3rem" }}>
                        {p}
                      </span>
                    ))}
                  </td>
                  <td>v{template.version}</td>
                  <td>{template.derniereModification}</td>
                  <td>{formatPourcentage(template.tauxOuverture)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {onglet === "envois" && (
        <section className={styles.carte}>
          <h2>Journal d&apos;envois</h2>
          <table className={styles.tableau}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Donateur</th>
                <th>Canal</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {journalEnvois.map((envoi, index) => (
                <tr key={index}>
                  <td>{envoi.date}</td>
                  <td>{envoi.donateur}</td>
                  <td>{envoi.canal}</td>
                  <td>
                    <span className={badgeClasse(styles, "statutEnvoi", envoi.statut)}>{envoi.statut}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
