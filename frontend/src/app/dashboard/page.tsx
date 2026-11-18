import { donateurs } from "../donateurs/donnees";
import { donsParDonateur } from "../donateurs/dons";
import { calculerKpis } from "./kpis";
import styles from "../donateurs/liste-donateurs.module.css";

function formatMontant(centimes: number): string {
  return (centimes / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

export default function Dashboard() {
  const kpis = calculerKpis(donateurs, donsParDonateur);

  const tuiles = [
    { label: "Nouveaux donateurs", valeur: kpis.nouveauxDonateurs.toString() },
    { label: "Donateurs actifs", valeur: kpis.donateursActifs.toString() },
    { label: "À réactiver", valeur: kpis.aReactiver.toString() },
    { label: "Engagements actifs", valeur: kpis.engagementsActifs.toString() },
    { label: "Montant collecté", valeur: formatMontant(kpis.montantTotalCentimes) },
    { label: "Don moyen", valeur: formatMontant(kpis.donMoyenCentimes) },
  ];

  return (
    <div className={styles.conteneur}>
      <h1>Dashboard</h1>
      <p className={styles.soustitre}>
        Vue d&apos;ensemble sur {kpis.totalDonateurs} donateurs et {kpis.nombreDonsTotal} dons enregistrés.
      </p>

      <div className={styles.grilleKpi}>
        {tuiles.map((tuile) => (
          <div className={styles.tuile} key={tuile.label}>
            <span className={styles.tuileValeur}>{tuile.valeur}</span>
            <span className={styles.tuileLabel}>{tuile.label}</span>
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
