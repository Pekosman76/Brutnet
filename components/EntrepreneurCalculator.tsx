
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

    const estimateTaxRate = data.regime === 'bic-vente' ? 0.01 : 0.022; 
    const apresImpotMensuel = netMensuel * (1 - estimateTaxRate);

    return {
      cotisationsMensuelles,
      netMensuel,
      netAnnuel,
      apresImpotMensuel,
      ratePercent: (rate * 100).toFixed(1)
    };
  }, [data]);

  const copyResult = () => {
    const text = `Revenu Net Mensuel Estimé: ${Math.round(results.netMensuel).toLocaleString()}€ - via CalculRevenuNet.fr`;
    navigator.clipboard.writeText(text);
    alert('Résultat copié !');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-6 text-slate-900">Chiffre d'Affaires</h2>
        
        <div className="space-y-6">
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button 
              onClick={() => setData({ ...data, period: 'mensuel' })}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${data.period === 'mensuel' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Mensuel
            </button>
            <button 
              onClick={() => setData({ ...data, period: 'annuel' })}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${data.period === 'annuel' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Annuel
            </button>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Montant du CA ({data.period === 'annuel' ? '€/an' : '€/mois'})</label>
            <input
              type="number"
              className="w-full border-2 border-slate-200 rounded-2xl px-5 py-4 focus:border-indigo-500 focus:outline-none font-bold text-xl transition-colors shadow-sm"
              value={data.ca}
              onChange={(e) => setData({ ...data, ca: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Régime / Activité</label>
            <select
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none font-semibold text-slate-700 bg-white"
              value={data.regime}
              onChange={(e) => setData({ ...data, regime: e.target.value as RegimeType })}
            >
              {Object.entries(REGIME_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={data.tauxPersonnalise !== undefined}
                  onChange={(e) => setData({ ...data, tauxPersonnalise: e.target.checked ? 26.1 : undefined })}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${data.tauxPersonnalise !== undefined ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${data.tauxPersonnalise !== undefined ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Modifier le taux URSSAF</span>
            </label>
            
            {data.tauxPersonnalise !== undefined && (
              <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex justify-between items-center mb-3">
                   <span className="text-sm font-bold text-slate-700">Taux personnalisé (%)</span>
                   <input 
                    type="number" 
                    step="0.1"
                    className="w-20 border-2 border-slate-200 rounded-lg px-2 py-1 text-sm text-right font-bold focus:border-indigo-500 outline-none"
                    value={data.tauxPersonnalise}
                    onChange={(e) => setData({ ...data, tauxPersonnalise: Number(e.target.value) })}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.1"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={data.tauxPersonnalise}
                  onChange={(e) => setData({ ...data, tauxPersonnalise: Number(e.target.value) })}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-indigo-600 text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[400px]">
          <div className="relative z-10">
            <p className="text-indigo-100 font-bold mb-2 uppercase tracking-widest text-xs">Revenu Net {data.period} Estimé</p>
            <div className="text-6xl font-black">
              {Math.round(data.period === 'mensuel' ? results.netMensuel : results.netAnnuel).toLocaleString()} €
            </div>
            <p className="text-indigo-200 text-sm mt-3 font-medium">Après cotisations sociales URSSAF</p>

            <div className="grid grid-cols-2 gap-6 border-t border-indigo-400/30 pt-8 mt-10">
              <div>
                <p className="text-xs text-indigo-200 font-bold uppercase tracking-widest mb-1">Charges</p>
                <p className="text-2xl font-black text-white">-{results.ratePercent}%</p>
              </div>
              <div>
                <p className="text-xs text-indigo-200 font-bold uppercase tracking-widest mb-1">Cotisations</p>
                <p className="text-2xl font-black text-white">{Math.round(results.cotisationsMensuelles).toLocaleString()} €/m</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10">
             <button
              onClick={copyResult}
              className="w-full bg-white text-indigo-600 font-black py-4 rounded-2xl hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center gap-3 transform active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copier ce résultat
            </button>
            <p className="text-center text-[10px] text-indigo-200 mt-4 italic">
              Estimation indicative – les montants réels peuvent varier selon votre situation.
            </p>
          </div>
          
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-indigo-400 rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurCalculator;
