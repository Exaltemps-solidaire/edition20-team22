import Link from "next/link";
import ListeDonateurs from "./donateurs/ListeDonateurs";
import { donateurs } from "./donateurs/donnees";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Donateurs</h1>
        <p>
          <Link href="/communication">Communication →</Link>
        </p>
        <ListeDonateurs donateurs={donateurs} />
      </main>
    </div>
  );
}
