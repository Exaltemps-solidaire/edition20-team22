import type { CSSProperties } from "react";
import { donateurs } from "../donateurs/donnees";
import { donsParDonateur } from "../donateurs/dons";
import { calculerKpis } from "./kpis";
import styles from "../donateurs/liste-donateurs.module.css";

function formatMontant(centimes: number): string {
  return (centimes / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

function IconeUtilisateurPlus() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
      <path d="M18 8v5M15.5 10.5h5" />
    </svg>
  );
}

function IconeUtilisateurs() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="8.5" cy="8" r="3.2" />
      <circle cx="16" cy="9" r="2.6" />
      <path d="M3 20v-1a4.5 4.5 0 0 1 4.5-4.5h2A4.5 4.5 0 0 1 14 19v1" />
      <path d="M15 14.2a3.5 3.5 0 0 1 6 2.3V18" />
    </svg>
  );
}

function IconeAlerte() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 2 20h20L12 3z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconeCycle() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 11A8 8 0 1 0 17.6 17" />
      <path d="M20 5v6h-6" />
    </svg>
  );
}

function IconeBarres() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" stroke="none">
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="17" y="2" width="4" height="19" rx="1" />
    </svg>
  );
}

export default function Dashboard() {
  const kpis = calculerKpis(donateurs, donsParDonateur);

  const tuiles = [
    { label: "Nouveaux donateurs", valeur: kpis.nouveauxDonateurs.toString(), couleur: "#2563eb", icone: <IconeUtilisateurPlus /> },
    { label: "Donateurs actifs", valeur: kpis.donateursActifs.toString(), couleur: "#16a34a", icone: <IconeUtilisateurs /> },
    { label: "À réactiver", valeur: kpis.aReactiver.toString(), couleur: "#d97706", icone: <IconeAlerte /> },
    { label: "Engagements actifs", valeur: kpis.engagementsActifs.toString(), couleur: "#7c3aed", icone: <IconeCycle /> },
    { label: "Montant collecté", valeur: formatMontant(kpis.montantTotalCentimes), couleur: "#0f766e", icone: <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>€</span> },
    { label: "Don moyen", valeur: formatMontant(kpis.donMoyenCentimes), couleur: "#be185d", icone: <IconeBarres /> },
  ];

  return (
    <div className={styles.conteneur}>
      <h1>Dashboard</h1>
      <p className={styles.soustitre}>
        Vue d&apos;ensemble sur {kpis.totalDonateurs} donateurs et {kpis.nombreDonsTotal} dons enregistrés.
      </p>

      <div className={styles.grilleKpi}>
        {tuiles.map((tuile) => (
          <div
            className={styles.tuile}
            key={tuile.label}
            style={{ "--couleur-tuile": tuile.couleur } as CSSProperties}
          >
            <span className={styles.tuileIcone}>{tuile.icone}</span>
            <span className={styles.tuileContenu}>
              <span className={styles.tuileValeur}>{tuile.valeur}</span>
              <span className={styles.tuileLabel}>{tuile.label}</span>
            </span>
          </div>
        ))}
      </div>

      <section className={styles.carte}>
        <h2>Répartition par persona</h2>
        <div className={styles.listeBarres}>
          {kpis.repartitionParPersona.map((ligne) => (
            <div className={styles.barre} key={ligne.persona}>
              <span className={styles.barreLabel}>
                {ligne.persona} <strong>{ligne.nombre}</strong>
              </span>
              <div className={styles.barreTrack}>
                <div className={styles.barreRemplissage} style={{ width: `${ligne.pourcentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
