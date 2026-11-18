import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./components/Sidebar";
import styles from "./shell.module.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imagine for Margo — CRM Donateurs",
  description: "Prototype CRM donateurs pour l'association Imagine for Margo",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className={styles.shell}>
          <Sidebar />
          <div className={styles.contenu}>{children}</div>
        </div>
      </body>
    </html>
  );
}
