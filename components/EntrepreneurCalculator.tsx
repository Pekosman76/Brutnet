
import React, { useState, useMemo } from 'react';
import { EntrepreneurData, RegimeType } from '../types';
import { ENTREPRENEUR_RATES, REGIME_LABELS } from '../constants';

const EntrepreneurCalculator: React.FC = () => {
  const [data, setData] = useState<EntrepreneurData>({
    ca: 3000,
    period: 'mensuel',
    regime: 'bnc'
  });

  const results = useMemo(() => {
    const rate = data.tauxPersonnalise ? data.tauxPersonnalise / 100 : ENTREPRENEUR_RATES[data.regime];
    const caAnnuel = data.period === 'annuel' ? data.ca : data.ca * 12;
    const caMensuel = data.period === 'mensuel' ? data.ca : data.ca / 12;

    const cotisationsAnnuelles = caAnnuel * rate;
    const cotisationsMensuelles = caMensuel * rate;

    const netAnnuel = caAnnuel - cotisationsAnnuelles;
    const netMensuel = caMensuel - cotisationsMensuelles;

    // Estimation simple d'impôt (versement libératoire ou progressif simplifié)
    const estimateTaxRate = data.regime === 'bic-vente' ? 0.01 : 0.022; 
    const apresImpotMensuel = netMensuel * (1 - estimateTaxRate);

    return {
      cotisationsMensuelles,
      netMensuel,
      apresImpotMensuel,
      ratePercent: (rate * 100).toFixed(1)
    };
  }, [data]);

  const copyResult = () => {
    const text = `Revenu Net Mensuel: ${results.netMensuel.toFixed(0)}€ (après cotisations)`;
    navigator.clipboard.writeText(text);
    alert('Copié !');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-6">Simulation Indépendant</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Chiffre d'Affaires (CA)</label>
            <div className="flex">
              <input
                type="number"
                className="flex-1 border border-slate-300 rounded-l-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={data.ca}
                onChange={(e) => setData({ ...data, ca: Number(e.target.value) })}
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Régime / Activité</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={data.regime}
              onChange={(e) => setData({ ...data, regime: e.target.value as RegimeType })}
            >
              {Object.entries(REGIME_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!data.tauxPersonnalise}
                onChange={(e) => setData({ ...data, tauxPersonnalise: e.target.checked ? 26.1 : undefined })}
                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-slate-700">Taux de cotisations personnalisé ?</span>
            </label>
            
            {data.tauxPersonnalise !== undefined && (
              <div className="mt-2">
                <input
                  type="number"
                  step="0.1"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2"
                  value={data.tauxPersonnalise}
                  onChange={(e) => setData({ ...data, tauxPersonnalise: Number(e.target.value) })}
                  placeholder="Ex: 26.1"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-indigo-600 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-indigo-100 font-medium mb-1 uppercase tracking-wider text-xs">Revenu Net Mensuel Estimé</p>
            <div className="text-5xl font-bold mb-4">{Math.round(results.netMensuel).toLocaleString()} €</div>
            <p className="text-indigo-200 text-sm mb-6 italic">*CA moins cotisations sociales obligatoires</p>
            
            <div className="grid grid-cols-2 gap-4 border-t border-indigo-400 pt-6">
              <div>
                <p className="text-xs text-indigo-100 uppercase">Cotisations / mois</p>
                <p className="text-xl font-semibold">{Math.round(results.cotisationsMensuelles).toLocaleString()} €</p>
              </div>
              <div>
                <p className="text-xs text-indigo-100 uppercase">Net après impôt (est.)</p>
                <p className="text-xl font-semibold">{Math.round(results.apresImpotMensuel).toLocaleString()} €</p>
              </div>
            </div>

            <button
              onClick={copyResult}
              className="mt-8 w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 11-4 0h-2a2 2 0 01-2-2V9z" />
                <path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v2H7a2 2 0 00-2 2v2H3a2 2 0 01-2-2V7a2 2 0 012-2h2V5z" />
              </svg>
              Copier mon revenu net
            </button>
          </div>
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase mb-4">Informations fiscales</h3>
          <div className="flex justify-between items-center py-3 border-b border-slate-100">
            <span className="text-slate-600">Taux URSSAF appliqué</span>
            <span className="font-semibold text-red-500">{results.ratePercent}%</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-slate-600">Type d'activité</span>
            <span className="font-semibold text-right max-w-[200px]">{REGIME_LABELS[data.regime]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurCalculator;
