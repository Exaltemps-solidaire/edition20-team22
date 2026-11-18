import Link from "next/link";
import { parcours, journalEnvois } from "./donnees";
import { trierEtapes } from "./trierEtapes";
import styles from "../donateurs/liste-donateurs.module.css";

export default function Communication() {
  const etapes = trierEtapes(parcours.etapes);

  return (
    <div className={styles.conteneur}>
      <p>
        <Link href="/">← Donateurs</Link>
      </p>
      <h1>Communication</h1>

      <h2>Parcours : {parcours.nom}</h2>
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
          {etapes.map((etape) => (
            <tr key={etape.ordre}>
              <td>{etape.ordre}</td>
              <td>{etape.declencheur}</td>
              <td>{etape.delai}</td>
              <td>{etape.typeEnvoi}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
                <span className={styles.badge}>{envoi.statut}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
