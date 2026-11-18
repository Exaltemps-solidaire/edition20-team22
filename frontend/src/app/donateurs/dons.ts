export type Don = {
  date: string;
  montantCentimes: number;
  canal: "En ligne" | "Chèque" | "Virement";
};

// Historique fictif de dons par donateur, pour le prototype.
export const donsParDonateur: Record<string, Don[]> = {
  "1": [{ date: "2026-10-28", montantCentimes: 2000, canal: "En ligne" }],
  "2": [
    { date: "2026-11-01", montantCentimes: 1500, canal: "En ligne" },
    { date: "2026-10-01", montantCentimes: 1500, canal: "En ligne" },
    { date: "2026-09-01", montantCentimes: 1500, canal: "En ligne" },
  ],
  "3": [
    { date: "2025-09-12", montantCentimes: 3000, canal: "Virement" },
    { date: "2024-12-03", montantCentimes: 2000, canal: "Chèque" },
  ],
  "4": [{ date: "2026-08-15", montantCentimes: 5000, canal: "Virement" }],
  "5": [
    { date: "2024-11-02", montantCentimes: 1000, canal: "En ligne" },
    { date: "2023-11-02", montantCentimes: 1000, canal: "En ligne" },
  ],
  "6": [
    { date: "2026-11-05", montantCentimes: 1000, canal: "En ligne" },
    { date: "2026-10-05", montantCentimes: 1000, canal: "En ligne" },
  ],
};
