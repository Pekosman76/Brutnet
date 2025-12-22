
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
            "text": "Pour calculer votre net sur CalculRevenuNet.fr, vous devez soustraire de votre brut les cotisations sociales (sécurité sociale, chômage, retraite) et le prélèvement à la source. Notre outil intègre les barèmes 2026."
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
        <h2 className="text-3xl font-bold mb-6 text-slate-900 border-l-4 border-blue-600 pl-4">Comprendre le calcul du salaire net en 2026</h2>
        
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

        {/* NOUVELLES SECTIONS SALARIÉ */}
        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Pourquoi s’agit-il d’une estimation ?</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Le simulateur de <strong>CalculRevenuNet.fr</strong> utilise les taux de cotisations moyens nationaux. Cependant, votre bulletin de paie réel peut varier selon votre convention collective, les accords d'entreprise ou les contrats de prévoyance spécifiques à votre employeur. Ces paramètres peuvent faire fluctuer le net de quelques dizaines d'euros.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Cas particuliers : pourquoi votre paie peut varier</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Plusieurs facteurs impactent le calcul final : la présence d'un 13ème mois, le versement de primes exceptionnelles, le remboursement des frais de transport (50% minimum obligatoire) ou encore la part salariale de la mutuelle santé. Tous ces éléments s'ajoutent ou se déduisent du salaire net "théorique" présenté ici.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Les charges salariales expliquées simplement</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Les charges salariales représentent environ 22% du brut pour un non-cadre et 25% pour un cadre. Elles financent votre protection future : votre future retraite (pension), votre couverture santé actuelle, et votre assurance en cas de perte d'emploi. C'est ce qui différencie le "super-brut" (coût total employeur) du salaire net que vous dépensez chaque jour.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Différences Cadre, Non-Cadre et Fonction Publique</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Le statut <strong>Cadre</strong> implique des cotisations supplémentaires pour la retraite complémentaire et l'APEC. Les salariés du <strong>secteur public</strong>, eux, ont des taux de cotisations souvent inférieurs (environ 15%) car ils ne cotisent pas à l'assurance chômage de la même manière. Notre outil ajuste automatiquement ces pourcentages selon votre sélection.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Pourquoi utiliser un calculateur brut en net gratuit ?</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Notre simulateur effectue automatiquement ces calculs complexes en tenant compte des <strong>barèmes 2026</strong>. Que vous soyez cadre ou non-cadre, l'outil ajuste les taux pour vous fournir une estimation fiable en quelques secondes. C'est un allié précieux pour vos entretiens annuels ou vos recherches d'emploi.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4 pt-8">FAQ CalculRevenuNet.fr</h2>
        <div className="space-y-6">
          <div className="group">
            <h4 className="font-bold text-slate-800 text-lg mb-2">Comment passer du brut annuel au net mensuel ?</h4>
            <p className="text-slate-600">Entrez votre brut annuel, choisissez votre statut et l'outil divisera le résultat net par votre nombre de mois (12 par défaut) pour obtenir votre reste à vivre mensuel.</p>
          </div>
          <div className="group">
            <h4 className="font-bold text-slate-800 text-lg mb-2">Le simulateur inclut-il l'impôt sur le revenu ?</h4>
            <p className="text-slate-600">Oui, en ajustant le taux de prélèvement à la source, vous pouvez voir l'impact immédiat sur votre paie mensuelle disponible.</p>
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

      {/* NOUVELLES SECTIONS ENTREPRENEUR */}
      <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">BNC vs BIC : Comprendre les différences de taxation</h3>
      <p className="text-slate-600 leading-relaxed mb-6">
        En micro-entreprise, votre catégorie dépend de votre métier. Les <strong>BNC</strong> (Bénéfices Non Commerciaux) concernent les professions libérales et prestations intellectuelles (développeur, consultant). Les <strong>BIC</strong> (Bénéfices Industriels et Commerciaux) concernent la vente de marchandises ou les services artisanaux. Les abattements fiscaux diffèrent : 34% pour le BNC contre 50% ou 71% pour le BIC, impactant directement votre impôt final.
      </p>

      <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Le versement libératoire de l'impôt</h3>
      <p className="text-slate-600 leading-relaxed mb-6">
        C'est une option souvent avantageuse pour les auto-entrepreneurs dont le revenu fiscal de référence est modéré. Elle permet de payer son impôt sur le revenu en même temps que ses cotisations sociales, avec un taux fixe réduit (1% à 2.2% selon l'activité), évitant ainsi une régularisation massive l'année suivante.
      </p>

      <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">L'importance de l'ACRE pour les nouveaux indépendants</h3>
      <p className="text-slate-600 leading-relaxed mb-6">
        Si vous lancez votre activité, vous pouvez bénéficier de l'ACRE (Aide à la Création ou à la Reprise d'une Entreprise). Cette aide permet une réduction de 50% de vos cotisations sociales durant les 4 premiers trimestres d'activité. Pensez à ajuster le taux personnalisé dans notre simulateur pour refléter cet avantage temporaire mais précieux.
      </p>

      <p className="text-slate-600 leading-relaxed mb-6">
        Notre calculateur sur <strong>CalculRevenuNet.fr</strong> applique les taux spécifiques (BNC, BIC) à jour des dernières réformes de 2026 pour vous donner une vision claire de votre rémunération réelle.
      </p>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-8">
        <p className="text-indigo-800 font-semibold mb-2">Points d'attention :</p>
        <p className="text-indigo-900 text-sm">Le revenu net d'un entrepreneur n'est pas comparable à celui d'un salarié car il ne comprend pas de congés payés ni les mêmes droits au chômage. Anticiper vos charges est vital pour la pérennité de votre activité.</p>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4 pt-8">FAQ Entrepreneur</h2>
      <div className="space-y-6">
        <div className="group">
          <h4 className="font-bold text-slate-800 text-lg mb-2">Comment optimiser mon revenu net ?</h4>
          <p className="text-slate-600">Suivre ses dépenses professionnelles, choisir le bon régime fiscal et surveiller les seuils de franchise de TVA sont les clés pour maximiser votre reste à vivre réel.</p>
        </div>
      </div>
    </article>
  );
};

export default SEOSection;
