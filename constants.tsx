
// Constantes et taux de cotisations sociales (estimations 2025)
import { StatusType, RegimeType } from './types';

export const CHARGES_RATES: Record<StatusType, number> = {
  'non-cadre': 0.22,
  'cadre': 0.25,
  'public': 0.15,
  'profession-liberale': 0.22,
};

export const STATUS_LABELS: Record<StatusType, string> = {
  'non-cadre': 'Salarié non-cadre',
  'cadre': 'Salarié cadre',
  'public': 'Fonctionnaire / Public',
  'profession-liberale': 'Profession Libérale',
};

export const ENTREPRENEUR_RATES: Record<RegimeType, number> = {
  'bnc': 0.211,
  'bic-vente': 0.123,
  'bic-service': 0.212,
};

export const REGIME_LABELS: Record<RegimeType, string> = {
  'bnc': 'Prestations de services (BNC)',
  'bic-service': 'Prestations de services (BIC)',
  'bic-vente': 'Vente de marchandises (BIC)',
};
