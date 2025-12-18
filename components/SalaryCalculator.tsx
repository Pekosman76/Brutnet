
import React, { useState, useEffect, useCallback } from 'react';
import { StatusType } from '../types';
import { CHARGES_RATES, STATUS_LABELS } from '../constants';

const SalaryCalculator: React.FC = () => {
  // États de base pour les calculs
  const [brut, setBrut] = useState<number>(35000);
  const [netSocial, setNetSocial] = useState<number>(27300);
  const [status, setStatus] = useState<StatusType>('non-cadre');
  const [period, setPeriod] = useState<'mensuel' | 'annuel'>('annuel');
  const [tempsTravail, setTempsTravail] = useState<number>(100);
  const [mois, setMois] = useState<number>(12);
  const [tauxPrelevement, setTauxPrelevement] = useState<number>(5.0);

  // Fonction utilitaire pour obtenir le taux de charges
  const getChargeRate = useCallback(() => CHARGES_RATES[status], [status]);

  // Calcul du Net à partir du Brut
  const calcNetFromBrut = useCallback((brutVal: number) => {
    const chargeRate = CHARGES_RATES[status];
    const prorata = tempsTravail / 100;
    return brutVal * (1 - chargeRate) * prorata;
  }, [status, tempsTravail]);

  // Calcul du Brut à partir du Net
  const calcBrutFromNet = useCallback((netVal: number) => {
    const chargeRate = CHARGES_RATES[status];
    const prorata = tempsTravail / 100;
    if (prorata === 0) return 0;
    return netVal / ((1 - chargeRate) * prorata);
  }, [status, tempsTravail]);

  // Synchronisation lors du changement de paramètres globaux
  useEffect(() => {
    const newNet = calcNetFromBrut(brut);
    setNetSocial(Number(newNet.toFixed(2)));
  }, [status, tempsTravail, calcNetFromBrut]);

  // Handlers pour les inputs bidirectionnels
  const handleBrutChange = (val: number) => {
    setBrut(val);
    const newNet = calcNetFromBrut(val);
    setNetSocial(Number(newNet.toFixed(2)));
  };

  const handleNetChange = (val: number) => {
    setNetSocial(val);
    const newBrut = calcBrutFromNet(val);
    setBrut(Number(newBrut.toFixed(2)));
  };

  const resetFields = () => {
    setBrut(35000);
    setNetSocial(calcNetFromBrut(35000));
    setTauxPrelevement(5.0);
    setTempsTravail(100);
    setPeriod('annuel');
    setStatus('non-cadre');
    setMois(12);
  };

  // Calculs pour les différentes estimations de la carte bleue
  const brutAnnuel = period === 'annuel' ? brut : brut * mois;
  const brutMensuel = brutAnnuel / mois;
  
  const netAnnuel = period === 'annuel' ? netSocial : netSocial * mois;
  const netMensuel = netAnnuel / mois;
  
  const netApresImpotMensuel = netMensuel * (1 - tauxPrelevement / 100);
  const netApresImpotAnnuel = netAnnuel * (1 - tauxPrelevement / 100);

  const copyResult = () => {
    const text = `Salaire net mensuel après impôt : ${Math.round(netApresImpotMensuel).toLocaleString()} €`;
    navigator.clipboard.writeText(text);
    alert('Résultat copié !');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Formulaire à gauche */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Formulaire de calcul</h2>
          <button 
            onClick={resetFields}
            className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-wider"
          >
            Réinitialiser
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
            <p className="text-xs text-blue-700 font-medium">
              💡 Remplissez soit le brut, soit le net. L'autre sera calculé automatiquement.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Salaire Brut</label>
            <div className="flex">
              <input
                type="number"
                className="flex-1 border-2 border-slate-200 rounded-l-2xl px-5 py-4 focus:border-blue-500 focus:outline-none font-bold text-xl transition-colors shadow-sm"
                value={brut || ''}
                onChange={(e) => handleBrutChange(Number(e.target.value))}
                placeholder="Ex: 35000"
              />
              <select
                className="bg-slate-50 border-2 border-l-0 border-slate-200 rounded-r-2xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-blue-500"
                value={period}
                onChange={(e) => setPeriod(e.target.value as 'mensuel' | 'annuel')}
              >
                <option value="annuel">€ / an</option>
                <option value="mensuel">€ / mois</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Salaire Net</label>
            <div className="flex">
              <input
                type="number"
                className="flex-1 border-2 border-slate-200 rounded-l-2xl px-5 py-4 focus:border-blue-500 focus:outline-none font-bold text-xl transition-colors shadow-sm bg-slate-50/30"
                value={netSocial || ''}
                onChange={(e) => handleNetChange(Number(e.target.value))}
                placeholder="Ex: 27000"
              />
              <div className="bg-slate-50 border-2 border-l-0 border-slate-200 rounded-r-2xl px-3 py-2 text-sm font-bold flex items-center text-slate-400">
                {period === 'annuel' ? '€ / an' : '€ / mois'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Statut</label>
              <select
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none font-semibold text-slate-700 bg-white"
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusType)}
              >
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Mois payés</label>
              <input
                type="number"
                min="1"
                max="16"
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 font-semibold focus:border-blue-500 outline-none"
                value={mois}
                onChange={(e) => setMois(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-700">Temps de travail (%)</label>
              <input 
                type="number" 
                className="w-20 border-2 border-slate-200 rounded-lg px-2 py-1 text-sm text-right font-bold focus:border-blue-500 outline-none"
                value={tempsTravail}
                onChange={(e) => setTempsTravail(Math.min(100, Math.max(0, Number(e.target.value))))}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              value={tempsTravail}
              onChange={(e) => setTempsTravail(Number(e.target.value))}
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-slate-700">Taux de prélèvement à la source (%)</label>
              <input 
                type="number" 
                step="0.1"
                className="w-20 border-2 border-slate-200 rounded-lg px-2 py-1 text-sm text-right font-bold focus:border-blue-500 outline-none"
                value={tauxPrelevement}
                onChange={(e) => setTauxPrelevement(Math.min(50, Math.max(0, Number(e.target.value))))}
              />
            </div>
            <input
              type="range"
              min="0"
              max="45"
              step="0.1"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              value={tauxPrelevement}
              onChange={(e) => setTauxPrelevement(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Carte bleue à droite - Focus UX */}
      <div className="flex flex-col gap-6 sticky top-24">
        <div className="bg-blue-600 text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden flex flex-col">
          <div className="relative z-10">
            
            {/* SECTION 1 - Résultat Principal */}
            <div className="mb-10 text-center lg:text-left">
              <p className="text-blue-100 font-bold mb-2 uppercase tracking-widest text-[11px]">
                SALAIRE NET MENSUEL APRÈS IMPÔT
              </p>
              <div className="text-6xl md:text-7xl font-black mb-4">
                {Math.round(netApresImpotMensuel).toLocaleString()} €
              </div>
              <p className="text-blue-100/70 text-[11px] italic">
                Estimation indicative – peut varier selon votre situation.
              </p>
            </div>
            
            <div className="h-px bg-white/20 w-full mb-8"></div>

            {/* SECTION 2 - Détails Mensuels Secondaires */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="text-center lg:text-left">
                <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-1">BRUT</p>
                <p className="text-lg font-extrabold text-white">{Math.round(brutMensuel).toLocaleString()} €</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-1">NET AVANT IMPÔT</p>
                <p className="text-lg font-extrabold text-white">{Math.round(netMensuel).toLocaleString()} €</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-1">COTISATIONS</p>
                <p className="text-lg font-extrabold text-white">-{getChargeRate() * 100}%</p>
              </div>
            </div>

            {/* SECTION 3 - Équivalent Annuel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-10 border border-white/10 text-center">
                <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest mb-1">ÉQUIVALENT NET ANNUEL</p>
                <p className="text-3xl font-black text-white">{Math.round(netApresImpotAnnuel).toLocaleString()} € / an</p>
            </div>

            <button
              onClick={copyResult}
              className="w-full bg-white text-blue-600 font-black py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-3 transform active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copier ce résultat
            </button>
          </div>
          
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-blue-500/30 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
