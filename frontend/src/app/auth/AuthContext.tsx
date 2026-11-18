"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";

type Utilisateur = {
  nom: string;
  email: string;
};

type AuthContextValue = {
  utilisateur: Utilisateur | null;
  connecter: (utilisateur: Utilisateur) => void;
  deconnecter: () => void;
};

const CLE_STOCKAGE = "crm-donateurs-session";
const EVENEMENT_LOCAL = "crm-donateurs-session-changee";

const AuthContext = createContext<AuthContextValue | null>(null);

function lireSnapshot(): string | null {
  return window.localStorage.getItem(CLE_STOCKAGE);
}

function lireSnapshotServeur(): string | null {
  return null;
}

function sAbonner(gererChangement: () => void) {
  window.addEventListener("storage", gererChangement);
  window.addEventListener(EVENEMENT_LOCAL, gererChangement);
  return () => {
    window.removeEventListener("storage", gererChangement);
    window.removeEventListener(EVENEMENT_LOCAL, gererChangement);
  };
}

// Session simulée : aucun backend, aucun mot de passe vérifié. Sert uniquement à démontrer
// le flux de connexion/déconnexion dans le prototype ; se réinitialise si on vide le localStorage.
// useSyncExternalStore synchronise l'état avec localStorage sans déclencher de setState dans un effet.
export function AuthProvider({ children }: { children: ReactNode }) {
  const brut = useSyncExternalStore(sAbonner, lireSnapshot, lireSnapshotServeur);
  const utilisateur: Utilisateur | null = brut ? JSON.parse(brut) : null;

  const connecter = useCallback((nouvelUtilisateur: Utilisateur) => {
    window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(nouvelUtilisateur));
    window.dispatchEvent(new Event(EVENEMENT_LOCAL));
  }, []);

  const deconnecter = useCallback(() => {
    window.localStorage.removeItem(CLE_STOCKAGE);
    window.dispatchEvent(new Event(EVENEMENT_LOCAL));
  }, []);

  return <AuthContext.Provider value={{ utilisateur, connecter, deconnecter }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const contexte = useContext(AuthContext);
  if (!contexte) throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  return contexte;
}
