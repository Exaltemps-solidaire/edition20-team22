"use client";

import { useState } from "react";
import { badgeClasse } from "../../badge";
import styles from "../liste-donateurs.module.css";

const PERSONAS_DISPONIBLES = [
  "Nouveau donateur",
  "Mensuel fidèle",
  "Mensuel récent",
  "Ponctuel engagé",
  "Ponctuel occasionnel",
  "Grand donateur",
  "À réactiver",
];

export default function ForcerPersona({ personaInitial }: { personaInitial: string }) {
  const [persona, setPersona] = useState(personaInitial);
  const [choix, setChoix] = useState(personaInitial);
  const [force, setForce] = useState(false);

  function appliquer() {
    setPersona(choix);
    setForce(choix !== personaInitial);
  }

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <span className={badgeClasse(styles, "persona", persona)}>{persona}</span>
      {force && <span className={styles.badgePartagee}>forcé manuellement</span>}
      <select
        value={choix}
        onChange={(evenement) => setChoix(evenement.target.value)}
        className={styles.filtre}
        aria-label="Changer le persona"
        style={{ fontSize: "0.8rem", padding: "0.3rem 0.5rem" }}
      >
        {PERSONAS_DISPONIBLES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <button type="button" className={styles.boutonSecondaire} onClick={appliquer}>
        Forcer
      </button>
    </span>
  );
}
