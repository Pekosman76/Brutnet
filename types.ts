
// Définitions des types pour les calculs de salaire et revenus entrepreneur
export type StatusType = 'non-cadre' | 'cadre' | 'public' | 'profession-liberale';

export type RegimeType = 'bnc' | 'bic-vente' | 'bic-service';

export interface EntrepreneurData {
  ca: number;
  period: 'mensuel' | 'annuel';
  regime: RegimeType;
  tauxPersonnalise?: number;
}
