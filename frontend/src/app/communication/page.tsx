import { parcoursListe, journalEnvois } from "./donnees";
import { trierEtapes } from "./trierEtapes";
import { badgeClasse } from "../badge";
import styles from "../donateurs/liste-donateurs.module.css";

export default function Communication() {
  return (
    <div className={styles.conteneur}>
      <h1>Communication</h1>
      <p className={styles.soustitre}>Parcours automatisés par persona et historique des envois.</p>

      {parcoursListe.map((parcours) => (
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
    </div>
  );
}
