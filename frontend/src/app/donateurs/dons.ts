export type Don = {
  date: string;
  montantCentimes: number;
  canal: "En ligne" | "Chèque" | "Virement";
  moyenPaiement?: "CB" | "Prélèvement SEPA" | "Virement" | "Chèque" | "Espèces" | "PayPal";
  type?: "Ponctuel" | "Récurrent";
  statut?: "Réussi" | "Échoué" | "Remboursé";
  campagne?: string;
};

// Historique fictif de dons par donateur, pour le prototype.
export const donsParDonateur: Record<string, Don[]> = {
  "1": [
    {
      date: "2026-10-28",
      montantCentimes: 2000,
      canal: "En ligne",
      moyenPaiement: "CB",
      type: "Ponctuel",
      statut: "Réussi",
      campagne: "Course Enfants sans Cancer 2026",
    },
  ],
  "2": [
    { date: "2026-11-01", montantCentimes: 1500, canal: "En ligne", moyenPaiement: "Prélèvement SEPA", type: "Récurrent", statut: "Réussi" },
    { date: "2026-10-01", montantCentimes: 1500, canal: "En ligne", moyenPaiement: "Prélèvement SEPA", type: "Récurrent", statut: "Réussi" },
    { date: "2026-09-01", montantCentimes: 1500, canal: "En ligne", moyenPaiement: "Prélèvement SEPA", type: "Récurrent", statut: "Réussi" },
  ],
  "3": [
    { date: "2025-09-12", montantCentimes: 3000, canal: "Virement", moyenPaiement: "Virement", type: "Ponctuel", statut: "Réussi", campagne: "Rallye du Cœur 2025" },
    { date: "2024-12-03", montantCentimes: 2000, canal: "Chèque", moyenPaiement: "Chèque", type: "Ponctuel", statut: "Réussi", campagne: "Septembre en or 2024" },
  ],
  "4": [
    { date: "2026-08-15", montantCentimes: 5000, canal: "Virement", moyenPaiement: "Virement", type: "Ponctuel", statut: "Réussi", campagne: "Septembre en or 2026" },
    { date: "2025-09-10", montantCentimes: 4000, canal: "Virement", moyenPaiement: "Virement", type: "Ponctuel", statut: "Réussi", campagne: "Septembre en or 2025" },
  ],
  "5": [
    { date: "2024-11-02", montantCentimes: 1000, canal: "En ligne", moyenPaiement: "CB", type: "Ponctuel", statut: "Réussi", campagne: "Course Enfants sans Cancer 2024" },
    { date: "2023-11-02", montantCentimes: 1000, canal: "En ligne", moyenPaiement: "CB", type: "Ponctuel", statut: "Réussi", campagne: "Course Enfants sans Cancer 2023" },
  ],
  "6": [
    { date: "2026-11-05", montantCentimes: 1000, canal: "En ligne", moyenPaiement: "Prélèvement SEPA", type: "Récurrent", statut: "Réussi" },
    { date: "2026-10-05", montantCentimes: 1000, canal: "En ligne", moyenPaiement: "Prélèvement SEPA", type: "Récurrent", statut: "Réussi" },
    { date: "2026-09-05", montantCentimes: 1000, canal: "En ligne", moyenPaiement: "Prélèvement SEPA", type: "Récurrent", statut: "Échoué" },
  ],
  "7": [
    { date: "2026-09-20", montantCentimes: 500000, canal: "Virement", moyenPaiement: "Virement", type: "Ponctuel", statut: "Réussi", campagne: "Colloque FAST 2026" },
    { date: "2025-09-21", montantCentimes: 300000, canal: "Virement", moyenPaiement: "Virement", type: "Ponctuel", statut: "Réussi", campagne: "Colloque FAST 2025" },
  ],
  "8": [
    { date: "2026-02-10", montantCentimes: 2500, canal: "En ligne", moyenPaiement: "PayPal", type: "Ponctuel", statut: "Réussi" },
  ],
};
