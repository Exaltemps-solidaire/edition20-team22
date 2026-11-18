"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthContext";
import styles from "../donateurs/liste-donateurs.module.css";

export default function Connexion() {
  const { connecter } = useAuth();
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");

  function soumettre(evenement: FormEvent) {
    evenement.preventDefault();
    if (!nom.trim() || !email.trim()) return;
    connecter({ nom: nom.trim(), email: email.trim() });
    router.push("/dashboard");
  }

  return (
    <div className={styles.conteneur} style={{ maxWidth: "420px" }}>
      <h1>Connexion</h1>
      <p className={styles.soustitre}>
        Session simulée pour le prototype — aucun mot de passe n&apos;est vérifié.
      </p>
      <form className={`${styles.carte} ${styles.formulaire}`} onSubmit={soumettre}>
        <label className={styles.champFormulaire}>
          Nom
          <input
            type="text"
            value={nom}
            onChange={(evenement) => setNom(evenement.target.value)}
            className={styles.saisie}
            placeholder="Camille Dupuis"
            required
          />
        </label>
        <label className={styles.champFormulaire}>
          Email
          <input
            type="email"
            value={email}
            onChange={(evenement) => setEmail(evenement.target.value)}
            className={styles.saisie}
            placeholder="camille@imagineformargo.org"
            required
          />
        </label>
        <button type="submit" className={styles.bouton}>
          Se connecter
        </button>
      </form>
    </div>
  );
}
