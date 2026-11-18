"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../auth/AuthContext";
import styles from "./sidebar.module.css";

function IconeDashboard() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function IconeDonateurs() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21v-1.5A5.5 5.5 0 0 1 10.5 14h3A5.5 5.5 0 0 1 19 19.5V21" />
    </svg>
  );
}

function IconeCommunication() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function IconeParametres() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

const liens = [
  { href: "/dashboard", label: "Dashboard", icone: <IconeDashboard />, actif: (p: string) => p.startsWith("/dashboard") },
  { href: "/", label: "Donateurs", icone: <IconeDonateurs />, actif: (p: string) => p === "/" || p.startsWith("/donateurs") },
  { href: "/communication", label: "Communication", icone: <IconeCommunication />, actif: (p: string) => p.startsWith("/communication") },
  { href: "/parametres", label: "Paramètres", icone: <IconeParametres />, actif: (p: string) => p.startsWith("/parametres") },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { utilisateur, deconnecter } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.marque}>
        <span className={styles.logo}>IM</span>
        <span>
          Imagine for Margo
          <small>CRM Donateurs</small>
        </span>
      </div>
      <nav className={styles.nav}>
        {liens.map((lien) => (
          <Link
            key={lien.href}
            href={lien.href}
            className={`${styles.lien} ${lien.actif(pathname) ? styles.actif : ""}`}
          >
            {lien.icone}
            {lien.label}
          </Link>
        ))}
      </nav>
      <div className={styles.compte}>
        {utilisateur ? (
          <>
            <div className={styles.compteInfo}>
              <span className={styles.compteAvatar}>{utilisateur.nom[0]?.toUpperCase() ?? "?"}</span>
              <span>
                {utilisateur.nom}
                <small>{utilisateur.email}</small>
              </span>
            </div>
            <button type="button" className={styles.boutonDeconnexion} onClick={deconnecter}>
              Se déconnecter
            </button>
          </>
        ) : (
          <Link href="/connexion" className={styles.lien}>
            Se connecter
          </Link>
        )}
      </div>
    </aside>
  );
}
