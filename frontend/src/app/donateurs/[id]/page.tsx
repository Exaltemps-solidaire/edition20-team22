import { notFound } from "next/navigation";
import Link from "next/link";
import { donateurs } from "../donnees";
import { donsParDonateur } from "../dons";
import { trierDonsDecroissant } from "../trier";
import { scoreCompletude, syntheseDons } from "../synthese";
import { journalModifications } from "../modifications";
import { journalEnvois } from "../../communication/donnees";
import { badgeClasse } from "../../badge";
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
  const synthese = syntheseDons(dons);
  const completude = scoreCompletude(donateur);
  const nomComplet = `${donateur.prenom} ${donateur.nom}`;
  const communicationsRecues = journalEnvois.filter((envoi) => envoi.donateur === nomComplet);
  const modifications = journalModifications.filter((m) => m.donateurId === donateur.id);

  return (
    <div className={styles.conteneur}>
      <p className={styles.nav}>
        <Link href="/">← Retour à la liste</Link>
      </p>

      <section className={styles.carte}>
        <div className={styles.enTeteFiche}>
          <div>
            <h1>
              <span className={`${styles.avatar} ${styles.avatarGrand}`}>
                {donateur.prenom[0]}
                {donateur.nom[0]}
              </span>{" "}
              {donateur.civilite ? `${donateur.civilite} ` : ""}
              {donateur.prenom} {donateur.nom}
            </h1>
            <p className={styles.soustitre}>{donateur.email}</p>
            <p>
              <span className={badgeClasse(styles, "statutDonateur", donateur.statut)}>{donateur.statut}</span>{" "}
              <span className={badgeClasse(styles, "persona", donateur.persona)}>{donateur.persona}</span>
            </p>
          </div>
          <div className={styles.scoreCompletude}>
            <span className={styles.scoreValeur}>{completude}%</span>
            <span className={styles.scoreLabel}>Fiche complète</span>
          </div>
        </div>
      </section>

      <section className={styles.carte}>
        <h2>Informations personnelles</h2>
        <dl className={styles.grilleInfos}>
          <div>
            <dt>Téléphone</dt>
            <dd>{donateur.telephone ?? "—"}</dd>
          </div>
          <div>
            <dt>Date de naissance</dt>
            <dd>{donateur.dateNaissance ? formatDate(donateur.dateNaissance) : "—"}</dd>
          </div>
          <div>
            <dt>Ville</dt>
            <dd>{donateur.ville ?? "—"}</dd>
          </div>
          <div>
            <dt>Source d&apos;acquisition</dt>
            <dd>{donateur.sourceAcquisition ?? "—"}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.carte}>
        <h2>Adresse et consentements</h2>
        <dl className={styles.grilleInfos}>
          <div>
            <dt>Adresse</dt>
            <dd>{donateur.adresse ?? "—"}</dd>
          </div>
          <div>
            <dt>Code postal</dt>
            <dd>{donateur.codePostal ?? "—"}</dd>
          </div>
          <div>
            <dt>Ville</dt>
            <dd>{donateur.ville ?? "—"}</dd>
          </div>
          <div>
            <dt>Pays</dt>
            <dd>{donateur.pays ?? "—"}</dd>
          </div>
          <div>
            <dt>Consentement e-mail</dt>
            <dd>
              <span
                className={badgeClasse(
                  styles,
                  "statutEngagement",
                  donateur.consentements?.email ? "Actif" : "Arrêté",
                )}
              >
                {donateur.consentements?.email ? "Autorisé" : "Refusé"}
              </span>
            </dd>
          </div>
          <div>
            <dt>Consentement SMS</dt>
            <dd>
              <span
                className={badgeClasse(
                  styles,
                  "statutEngagement",
                  donateur.consentements?.sms ? "Actif" : "Arrêté",
                )}
              >
                {donateur.consentements?.sms ? "Autorisé" : "Refusé"}
              </span>
            </dd>
          </div>
          <div>
            <dt>Consentement courrier</dt>
            <dd>
              <span
                className={badgeClasse(
                  styles,
                  "statutEngagement",
                  donateur.consentements?.courrier ? "Actif" : "Arrêté",
                )}
              >
                {donateur.consentements?.courrier ? "Autorisé" : "Refusé"}
              </span>
            </dd>
          </div>
        </dl>
      </section>

      {donateur.engagement && (
        <section className={styles.carte}>
          <h2>Engagement en cours</h2>
          <dl className={styles.grilleInfos}>
            <div>
              <dt>Montant</dt>
              <dd>{formatMontant(donateur.engagement.montantCentimes)}</dd>
            </div>
            <div>
              <dt>Fréquence</dt>
              <dd>{donateur.engagement.frequence}</dd>
            </div>
            <div>
              <dt>Moyen de paiement</dt>
              <dd>{donateur.engagement.moyenPaiement}</dd>
            </div>
            <div>
              <dt>Début</dt>
              <dd>{formatDate(donateur.engagement.dateDebut)}</dd>
            </div>
            <div>
              <dt>Échéances réussies</dt>
              <dd>{donateur.engagement.echeancesReussies}</dd>
            </div>
            <div>
              <dt>Statut</dt>
              <dd>
                <span className={badgeClasse(styles, "statutEngagement", donateur.engagement.statut)}>
                  {donateur.engagement.statut}
                </span>
              </dd>
            </div>
          </dl>
        </section>
      )}

      <section className={styles.carte}>
        <h2>Synthèse des dons</h2>
        <dl className={styles.grilleInfos}>
          <div>
            <dt>Total cumulé</dt>
            <dd>{formatMontant(synthese.totalCentimes)}</dd>
          </div>
          <div>
            <dt>Nombre de dons</dt>
            <dd>{synthese.nombreDons}</dd>
          </div>
          <div>
            <dt>Don moyen</dt>
            <dd>{formatMontant(synthese.donMoyenCentimes)}</dd>
          </div>
          <div>
            <dt>Premier don</dt>
            <dd>{synthese.premierDon ? formatDate(synthese.premierDon) : "—"}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.carte}>
        <h2>Historique des dons</h2>
        <table className={styles.tableau}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Montant</th>
              <th>Moyen de paiement</th>
              <th>Statut</th>
              <th>Campagne</th>
            </tr>
          </thead>
          <tbody>
            {dons.map((don, index) => (
              <tr key={index}>
                <td>{formatDate(don.date)}</td>
                <td>{formatMontant(don.montantCentimes)}</td>
                <td>{don.moyenPaiement ?? don.canal}</td>
                <td>
                  <span className={badgeClasse(styles, "statutDon", don.statut ?? "Réussi")}>
                    {don.statut ?? "Réussi"}
                  </span>
                </td>
                <td>{don.campagne ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.carte}>
        <h2>Historique des communications</h2>
        {communicationsRecues.length === 0 ? (
          <p className={styles.vide}>Aucune communication envoyée pour l&apos;instant.</p>
        ) : (
          <table className={styles.tableau}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Canal</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {communicationsRecues.map((envoi, index) => (
                <tr key={index}>
                  <td>{formatDate(envoi.date)}</td>
                  <td>{envoi.canal}</td>
                  <td>
                    <span className={badgeClasse(styles, "statutEnvoi", envoi.statut)}>{envoi.statut}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className={styles.carte}>
        <h2>Journal des modifications</h2>
        {modifications.length === 0 ? (
          <p className={styles.vide}>Aucune modification enregistrée.</p>
        ) : (
          <table className={styles.tableau}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Champ</th>
                <th>Ancienne valeur</th>
                <th>Nouvelle valeur</th>
                <th>Auteur</th>
              </tr>
            </thead>
            <tbody>
              {modifications.map((modification, index) => (
                <tr key={index}>
                  <td>{formatDate(modification.date)}</td>
                  <td>{modification.champ}</td>
                  <td>{modification.ancienneValeur}</td>
                  <td>{modification.nouvelleValeur}</td>
                  <td>{modification.auteur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
