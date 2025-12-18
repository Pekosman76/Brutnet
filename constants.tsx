
import React from 'react';

export const CHARGES_RATES = {
  'non-cadre': 0.22,
  'cadre': 0.25,
  'public': 0.15,
  'portage': 0.48, // Estimation moyenne incluant frais de gestion
};

export const ENTREPRENEUR_RATES = {
  'bnc': 0.261, // Actualisé à 26,1% selon demande
  'bic-services': 0.212,
  'bic-vente': 0.123,
  'liberal': 0.45, // Estimation libéral classique (hors auto-entrepreneur)
};

export const REGIME_LABELS = {
  'bnc': 'Auto-Entrepreneur BNC (Libéral)',
  'bic-services': 'Auto-Entrepreneur BIC Services',
  'bic-vente': 'Auto-Entrepreneur BIC Vente',
  'liberal': 'Profession Libérale (Estimation)'
};

export const STATUS_LABELS = {
  'non-cadre': 'Salarié Non-Cadre',
  'cadre': 'Salarié Cadre',
  'public': 'Fonction Publique',
  'portage': 'Portage Salarial'
};
