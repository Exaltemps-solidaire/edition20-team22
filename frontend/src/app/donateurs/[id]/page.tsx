import { notFound } from "next/navigation";
import Link from "next/link";
import { donateurs } from "../donnees";
import { donsParDonateur } from "../dons";
import { trierDonsDecroissant } from "../trier";
import styles from "../liste-donateurs.module.css";

export function generateStaticParams() {
  return donateurs.map((donateur) => ({ id: donateur.id }));
}

function formatMontant(centimes: number): string {
  return (centimes / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR");
}

export default async function FicheDonateur({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donateur = donateurs.find((d) => d.id === id);
  if (!donateur) notFound();

  const dons = trierDonsDecroissant(donsParDonateur[id] ?? []);

  return (
    <div className={styles.conteneur}>
      <p>
        <Link href="/">← Retour à la liste</Link>
      </p>
      <h1>
        {donateur.prenom} {donateur.nom}
      </h1>
      <p>{donateur.email}</p>
      <p>
        <span className={styles.badge}>{donateur.statut}</span>{" "}
        <span className={styles.badge}>{donateur.persona}</span>
      </p>

      <h2>Historique des dons</h2>
      <table className={styles.tableau}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Montant</th>
            <th>Canal</th>
          </tr>
        </thead>
        <tbody>
          {dons.map((don, index) => (
            <tr key={index}>
              <td>{formatDate(don.date)}</td>
              <td>{formatMontant(don.montantCentimes)}</td>
              <td>{don.canal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
