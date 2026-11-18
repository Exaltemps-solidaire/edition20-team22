import ListeDonateurs from "./donateurs/ListeDonateurs";
import { donateurs } from "./donateurs/donnees";
import styles from "./donateurs/liste-donateurs.module.css";

export default function Home() {
  return (
    <div className={styles.conteneur}>
      <h1>Donateurs</h1>
      <p className={styles.soustitre}>Vue d&apos;ensemble des donateurs enregistrés.</p>
      <ListeDonateurs donateurs={donateurs} />
    </div>
  );
}
