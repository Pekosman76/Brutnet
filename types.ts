
export type StatusType = 'non-cadre' | 'cadre' | 'public' | 'portage';

export interface SalaryData {
  brut: number;
  period: 'mensuel' | 'annuel';
  status: StatusType;
  tempsTravail: number;
  mois: number;
  tauxPrelevement: number;
}

export type RegimeType = 'bnc' | 'bic-services' | 'bic-vente' | 'liberal';

export interface EntrepreneurData {
  ca: number;
  period: 'mensuel' | 'annuel';
  regime: RegimeType;
  tauxPersonnalise?: number;
}
