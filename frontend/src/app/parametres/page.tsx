import { donateurs } from "../donateurs/donnees";
import { reglesPersonas } from "./personas";
import { badgeClasse } from "../badge";
import styles from "../donateurs/liste-donateurs.module.css";

export default function Parametres() {
  const reglesTriees = [...reglesPersonas].sort((a, b) => a.priorite - b.priorite);

  return (
    <div className={styles.conteneur}>
      <h1>Paramètres</h1>
      <p className={styles.soustitre}>Personas et règles d&apos;attribution automatique (lecture seule).</p>

      <section className={styles.carte}>
        <h2>Personas</h2>
        <table className={styles.tableau}>
          <thead>
            <tr>
              <th>Priorité</th>
              <th>Persona</th>
              <th>Règle d&apos;attribution</th>
              <th>Donateurs</th>
              <th>Actif</th>
            </tr>
          </thead>
          <tbody>
            {reglesTriees.map((regle) => {
              const nombreDonateurs = donateurs.filter((d) => d.persona === regle.nom).length;
              return (
                <tr key={regle.nom}>
                  <td>{regle.priorite}</td>
                  <td>
                    <span className={badgeClasse(styles, "persona", regle.nom)}>{regle.nom}</span>
                  </td>
                  <td>{regle.regle}</td>
                  <td>{nombreDonateurs}</td>
                  <td>{regle.actif ? "Oui" : "Non"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
