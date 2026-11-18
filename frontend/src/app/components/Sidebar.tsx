"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

const liens = [
  { href: "/dashboard", label: "Dashboard", actif: (p: string) => p.startsWith("/dashboard") },
  { href: "/", label: "Donateurs", actif: (p: string) => p === "/" || p.startsWith("/donateurs") },
  { href: "/communication", label: "Communication", actif: (p: string) => p.startsWith("/communication") },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.marque}>
        Imagine for Margo
        <small>CRM Donateurs</small>
      </div>
      <nav className={styles.nav}>
        {liens.map((lien) => (
          <Link
            key={lien.href}
            href={lien.href}
            className={`${styles.lien} ${lien.actif(pathname) ? styles.actif : ""}`}
          >
            {lien.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
