import React, { useEffect } from 'react';

interface SEOSectionProps {
  type: 'salarie' | 'entrepreneur';
}

const SEOSection: React.FC<SEOSectionProps> = ({ type }) => {
  useEffect(() => {
    const existingScript = document.getElementById('faq-schema');
    if (existingScript) existingScript.remove();

    const faqData = type === 'salarie' ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Comment calculer le salaire net à partir du brut ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pour calculer votre net sur CalculRevenuNet.fr, vous devez soustraire de votre brut les cotisations sociales (sécurité sociale, chômage, retraite) et le prélèvement à la source. Notre outil intègre les barèmes 2025."
          }
        },
        {
          "@type": "Question",
          "name": "Pourquoi utiliser un calculateur brut en net gratuit ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Un calculateur permet d'anticiper son budget réel, de mieux négocier un salaire annuel et de comprendre l'impact des charges sociales sur sa rémunération finale."
          }
        }
      ]
    } : {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Comment calculer le net d'un auto-entrepreneur ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Il faut déduire du chiffre d'affaires les cotisations sociales URSSAF et éventuellement le versement libératoire de l'impôt sur le revenu. Les taux dépendent de votre catégorie (BNC ou BIC)."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.id = 'faq-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('faq-schema');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [type]);

  if (type === 'salarie') {
    return (
      <article className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm mt-12">
        <h2 className="text-3xl font-bold mb-6 text-slate-900 border-l-4 border-blue-600 pl-4">Comprendre le calcul du salaire net en 2025</h2>
        
        <p className="text-slate-600 leading-relaxed mb-6">
          Pour calculer son brut en net, vous devez soustraire de votre salaire brut plusieurs éléments essentiels que <strong>CalculRevenuNet.fr</strong> prend en compte automatiquement :
        </p>
        
        <ul className="list-disc pl-5 text-slate-600 mb-8 space-y-2">
          <li><strong>Les cotisations sociales :</strong> sécurité sociale, assurance chômage, retraite (base et complémentaire).</li>
          <li><strong>Le prélèvement à la source :</strong> l'impôt sur le revenu collecté directement par l'employeur.</li>
          <li><strong>Les avantages :</strong> déduction potentielle de la mutuelle ou ajout des tickets restaurant (non simulés ici pour rester généraliste).</li>
        </ul>

        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8">
          <p className="text-blue-800 font-semibold mb-2">Définitions clés :</p>
          <ul className="space-y-2">
            <li><span className="font-bold">Salaire brut :</span> Montant total avant toute déduction de cotisations et impôts. C'est la base de négociation de votre contrat.</li>
            <li><span className="font-bold">Salaire net :</span> Montant réellement perçu sur votre compte après toutes les déductions obligatoires.</li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Pourquoi utiliser un calculateur brut en net gratuit ?</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Notre simulateur effectue automatiquement ces calculs complexes en tenant compte des <strong>barèmes 2025</strong>. Que vous soyez cadre ou non-cadre, l'outil ajuste les taux pour vous fournir une estimation fiable en quelques secondes. C'est un allié précieux pour vos entretiens annuels ou vos recherches d'emploi.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4 pt-8">FAQ CalculRevenuNet.fr</h2>
        <div className="space-y-6">
          <div className="group">
            <h4 className="font-bold text-slate-800 text-lg mb-2">Comment passer du brut annuel au net mensuel ?</h4>
            <p className="text-slate-600">Entrez votre brut annuel, choisissez votre statut et l'outil divisera le résultat net par votre nombre de mois (12 par défaut) pour obtenir votre reste à vivre mensuel.</p>
          </div>
          <div className="group">
            <h4 className="font-bold text-slate-800 text-lg mb-2">Le simulateur inclut-il l'impôt sur le revenu ?</h4>
            <p className="text-slate-600">Oui, en sélectionnant "Net après impôt", vous pouvez ajuster votre taux personnalisé pour voir l'impact réel du prélèvement à la source sur votre paie.</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm mt-12">
      <h2 className="text-3xl font-bold mb-6 text-slate-900 border-l-4 border-indigo-600 pl-4">Guide Entrepreneur : Du CA au revenu net</h2>
      
      <p className="text-slate-600 leading-relaxed mb-6">
        Si vous êtes indépendant ou micro-entrepreneur, vous devez soustraire de votre chiffre d'affaires (CA) encaissé :
      </p>

      <ul className="list-disc pl-5 text-slate-600 mb-8 space-y-2">
        <li><strong>Les cotisations sociales (URSSAF) :</strong> retraite, santé, prévoyance.</li>
        <li><strong>Les cotisations patronales :</strong> incluses dans le forfait social de la micro-entreprise.</li>
        <li><strong>L'impôt sur le revenu :</strong> via le versement libératoire ou l'imposition classique.</li>
      </ul>

      <p className="text-slate-600 leading-relaxed mb-6">
        Notre calculateur sur <strong>CalculRevenuNet.fr</strong> applique les taux spécifiques (BNC, BIC) à jour des dernières réformes de 2025 pour vous donner une vision claire de votre rémunération réelle.
      </p>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-8">
        <p className="text-indigo-800 font-semibold mb-2">Points d'attention :</p>
        <p className="text-indigo-900 text-sm">Le revenu net d'un entrepreneur n'est pas comparable à celui d'un salarié car il ne comprend pas de congés payés ni les mêmes droits au chômage. Anticiper vos charges est vital pour la pérennité de votre activité.</p>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4 pt-8">FAQ Entrepreneur</h2>
      <div className="space-y-6">
        <div className="group">
          <h4 className="font-bold text-slate-800 text-lg mb-2">BNC ou BIC : quelles charges ?</h4>
          <p className="text-slate-600">Les professions libérales relèvent généralement du BNC (Bénéfices Non Commerciaux). Les activités artisanales ou commerciales relèvent du BIC. Les taux de cotisations diffèrent pour refléter la nature de l'activité.</p>
        </div>
      </div>
    </article>
  );
};

export default SEOSection;