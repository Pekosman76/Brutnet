import React, { useState, useEffect } from 'react';
import SalaryCalculator from './components/SalaryCalculator';
import EntrepreneurCalculator from './components/EntrepreneurCalculator';
import AdPlaceholder from './components/AdPlaceholder';
import SEOSection from './components/SEOSection';

type ViewType = 'calculator' | 'info';
type TabType = 'salarie' | 'entrepreneur';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('salarie');
  const [currentView, setCurrentView] = useState<ViewType>('calculator');

  useEffect(() => {
    const isSalarie = activeTab === 'salarie';
    const siteName = "CalculRevenuNet.fr";
    const title = isSalarie 
      ? `Salaire Brut en Net - ${siteName}` 
      : `Revenu Auto-Entrepreneur - ${siteName}`;
    
    const description = isSalarie
      ? `Convertissez votre salaire brut en net facilement sur ${siteName}. Simulateur pour cadres, non-cadres et fonction publique.`
      : `Estimez votre revenu net d'auto-entrepreneur sur ${siteName}. Simulation BNC et BIC gratuite et rapide.`;

    document.title = currentView === 'info' ? `Aide & Guide - ${title}` : title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [activeTab, currentView]);

  const handleTabSwitch = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleViewSwitch = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      {/* GitHub Pages Custom Domain Note: Uses CNAME file at root */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => handleViewSwitch('calculator')}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">Calcul<span className="text-blue-600">RevenuNet</span>.fr</span>
            </div>
            <nav className="flex gap-8 text-sm font-semibold">
              <button 
                onClick={() => handleViewSwitch('calculator')}
                className={`transition-colors py-2 border-b-2 ${currentView === 'calculator' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-blue-600'}`}
              >
                Accueil
              </button>
              <button 
                onClick={() => handleViewSwitch('info')}
                className={`transition-colors py-2 border-b-2 ${currentView === 'info' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-blue-600'}`}
              >
                Information
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <AdPlaceholder className="mb-10 h-24" />

        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {activeTab === 'salarie' 
              ? 'Calculateur Salaire Brut en Net' 
              : 'Calculateur Revenu Auto-Entrepreneur Net'}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {currentView === 'calculator' 
              ? `L'outil gratuit de CalculRevenuNet.fr pour estimer vos revenus réels après charges sociales.`
              : "Retrouvez toutes les informations sur les charges sociales et l'imposition en France."}
          </p>
        </div>

        <div className="flex p-1 bg-slate-200/50 rounded-2xl w-full max-w-md mx-auto mb-12 shadow-inner">
          <button
            onClick={() => handleTabSwitch('salarie')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-200 ${
              activeTab === 'salarie' 
                ? 'bg-white text-blue-600 shadow-md' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Salarié
          </button>
          <button
            onClick={() => handleTabSwitch('entrepreneur')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-200 ${
              activeTab === 'entrepreneur' 
                ? 'bg-white text-indigo-600 shadow-md' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
            Entrepreneur
          </button>
        </div>

        <div className="transition-all duration-300">
          {currentView === 'calculator' ? (
            <>
              {activeTab === 'salarie' ? <SalaryCalculator /> : <EntrepreneurCalculator />}
              <AdPlaceholder className="my-16 h-32" />
              <SEOSection type={activeTab} />
            </>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SEOSection type={activeTab} />
              <div className="mt-12 text-center">
                <button 
                  onClick={() => handleViewSwitch('calculator')}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all transform hover:-translate-y-1"
                >
                  Retour au simulateur
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm font-medium">
            © 2024 CalculRevenuNet.fr - Simulateur de revenus gratuit en France.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-slate-400 text-xs">
            <a href="#" className="hover:text-slate-600">Mentions Légales</a>
            <a href="#" className="hover:text-slate-600">Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;