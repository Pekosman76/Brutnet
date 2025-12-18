
import React, { useState, useMemo } from 'react';
import { SalaryData, StatusType } from '../types';
import { CHARGES_RATES, STATUS_LABELS } from '../constants';

const SalaryCalculator: React.FC = () => {
  const [data, setData] = useState<SalaryData>({
    brut: 35000,
    period: 'annuel',
    status: 'non-cadre',
    tempsTravail: 100,
    mois: 12,
    tauxPrelevement: 5.0
  });

  const results = useMemo(() => {
    const chargeRate = CHARGES_RATES[data.status];
    const brutAnnuel = data.period === 'annuel' ? data.brut : data.brut * data.mois;
    const prorata = data.tempsTravail / 100;
    
    const netAnnuelAvantImpot = brutAnnuel * (1 - chargeRate) * prorata;
    const netMensuelAvantImpot = netAnnuelAvantImpot / data.mois;
    
    const netAnnuelApresImpot = netAnnuelAvantImpot * (1 - data.tauxPrelevement / 100);
    const netMensuelApresImpot = netAnnuelApresImpot / data.mois;

    return {
      netAnnuelAvantImpot,
      netMensuelAvantImpot,
      netAnnuelApresImpot,
      netMensuelApresImpot,
      chargeRatePercent: (chargeRate * 100).toFixed(1)
    };
  }, [data]);

  const copyResult = () => {
    const text = `Salaire Net Mensuel (Avant Impôt): ${results.netMensuelAvantImpot.toFixed(0)}€`;
    navigator.clipboard.writeText(text);
    alert('Copié dans le presse-papier !');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-6">Paramètres de simulation</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Salaire Brut</label>
            <div className="flex">
              <input
                type="number"
                className="flex-1 border border-slate-300 rounded-l-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={data.brut}
                onChange={(e) => setData({ ...data, brut: Number(e.target.value) })}
              />
              <select
                className="bg-slate-50 border border-l-0 border-slate-300 rounded-r-lg px-3 py-2 text-sm"
                value={data.period}
                onChange={(e) => setData({ ...data, period: e.target.value as 'mensuel' | 'annuel' })}
              >
                <option value="annuel">€ / an</option>
                <option value="mensuel">€ / mois</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Statut Professionnel</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={data.status}
              onChange={(e) => setData({ ...data, status: e.target.value as StatusType })}
            >
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Temps de travail: {data.tempsTravail}%</label>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              value={data.tempsTravail}
              onChange={(e) => setData({ ...data, tempsTravail: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mois de salaire (Primes incluses)</label>
            <input
              type="number"
              min="12"
              max="16"
              className="w-full border border-slate-300 rounded-lg px-4 py-2"
              value={data.mois}
              onChange={(e) => setData({ ...data, mois: Number(e.target.value) })}
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Taux prélèvement à la source: {data.tauxPrelevement}%</label>
            </div>
            <input
              type="range"
              min="0"
              max="45"
              step="0.1"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              value={data.tauxPrelevement}
              onChange={(e) => setData({ ...data, tauxPrelevement: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-blue-100 font-medium mb-1 uppercase tracking-wider text-xs">Estimation Salaire Net Mensuel</p>
            <div className="text-5xl font-bold mb-4">{Math.round(results.netMensuelAvantImpot).toLocaleString()} €</div>
            <p className="text-blue-200 text-sm mb-6 italic">*Net avant impôt sur le revenu</p>
            
            <div className="grid grid-cols-2 gap-4 border-t border-blue-400 pt-6">
              <div>
                <p className="text-xs text-blue-100 uppercase">Mensuel après impôt</p>
                <p className="text-xl font-semibold">{Math.round(results.netMensuelApresImpot).toLocaleString()} €</p>
              </div>
              <div>
                <p className="text-xs text-blue-100 uppercase">Annuel après impôt</p>
                <p className="text-xl font-semibold">{Math.round(results.netAnnuelApresImpot).toLocaleString()} €</p>
              </div>
            </div>

            <button
              onClick={copyResult}
              className="mt-8 w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Copier le résultat
            </button>
          </div>
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase mb-4">Détail des charges</h3>
          <div className="flex justify-between items-center py-3 border-b border-slate-100">
            <span className="text-slate-600">Taux de cotisations sociales</span>
            <span className="font-semibold text-red-500">-{results.chargeRatePercent}%</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-slate-600">Statut sélectionné</span>
            <span className="font-semibold">{STATUS_LABELS[data.status]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
