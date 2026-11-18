"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const liens = [
  { href: "/dashboard", label: "Dashboard", icone: <IconeDashboard />, actif: (p: string) => p.startsWith("/dashboard") },
  { href: "/", label: "Donateurs", icone: <IconeDonateurs />, actif: (p: string) => p === "/" || p.startsWith("/donateurs") },
  { href: "/communication", label: "Communication", icone: <IconeCommunication />, actif: (p: string) => p.startsWith("/communication") },
];

export default function Sidebar() {
  const pathname = usePathname();

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
    </aside>
  );
}
