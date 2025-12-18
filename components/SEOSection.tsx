
import React from 'react';

interface SEOSectionProps {
  type: 'salarie' | 'entrepreneur';
}

const SEOSection: React.FC<SEOSectionProps> = ({ type }) => {
  if (type === 'salarie') {
    return (
      <article className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-3xl font-bold mb-6 text-slate-900 border-l-4 border-blue-600 pl-4">Aide Salarié (Brut → Net)</h2>
        
        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Comprendre la différence entre salaire brut et salaire net</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Le salaire brut est le montant indiqué sur le contrat de travail avant déduction des cotisations. Le salaire net correspond à ce que vous recevez réellement sur votre compte bancaire après déduction des charges salariales (cotisations sociales). On parle souvent de conversion brut net ou de calcul brut net.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Comment est calculé le salaire net en France</h3>
        <p className="text-slate-600 leading-relaxed mb-4">Le calcul du salaire net dépend principalement :</p>
        <ul className="list-disc pl-5 text-slate-600 mb-6 space-y-2">
          <li>du statut (salarié non-cadre, cadre, fonction publique, portage salarial),</li>
          <li>du temps de travail (temps plein 100 %, temps partiel 80 %, 50 %, etc.),</li>
          <li>du nombre de mois payés (12 mois, 13e mois, 14e mois, etc.),</li>
          <li>du prélèvement à la source (impôt sur le revenu prélevé directement sur la fiche de paie).</li>
        </ul>
        <p className="text-slate-600 leading-relaxed mb-6">
          Notre simulateur applique un taux de charges moyen selon le statut pour donner une estimation fiable du net.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Salarié non-cadre : taux de charges et estimation</h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Pour un salarié non-cadre, les cotisations sont souvent plus faibles que pour un cadre. En pratique, l’écart brut → net est lié aux cotisations :
        </p>
        <ul className="list-disc pl-5 text-slate-600 mb-6 space-y-2">
          <li>retraite,</li>
          <li>assurance maladie,</li>
          <li>chômage,</li>
          <li>CSG/CRDS.</li>
        </ul>
        <p className="text-slate-600 leading-relaxed mb-6">
          Le résultat affiché est un net avant impôt (avant prélèvement à la source), puis une estimation du net après impôt si vous renseignez votre taux.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Salarié cadre : pourquoi le net est différent</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Pour un salarié cadre, certaines cotisations (notamment retraite complémentaire) peuvent modifier le taux global. Le salaire net cadre peut donc être légèrement plus bas à brut égal, surtout selon les tranches et accords.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Fonction publique : brut net fonction publique</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Le brut net fonction publique diffère car les prélèvements ne sont pas identiques au privé. Les cotisations et primes peuvent varier selon le corps, le grade et les indemnités. Le simulateur propose une estimation moyenne utile pour se situer rapidement.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Portage salarial : brut net portage salarial</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          En portage salarial, il existe des frais de gestion et un fonctionnement particulier (facturation, charges, frais professionnels). Le brut → net est donc différent d’un salarié classique. Notre calcul donne une estimation simplifiée, pratique pour comparer.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Temps partiel : impact sur le brut et le net</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Si vous travaillez à 80 %, 60 % ou 50 %, votre brut et votre net diminuent proportionnellement. Le simulateur intègre un curseur de temps de travail pour obtenir un calcul immédiat.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">12 mois, 13e mois, 14e mois : comment ça change le net annuel</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Le 13e mois (ou primes conventionnelles) augmente le net annuel. C’est pour cela que vous pouvez choisir 12 à 16 mois afin d’estimer : net mensuel et net annuel.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Prélèvement à la source : net avant impôt vs net après impôt</h3>
        <ul className="list-disc pl-5 text-slate-600 mb-6 space-y-2">
          <li><strong>Net avant impôt :</strong> salaire net calculé avant impôt sur le revenu.</li>
          <li><strong>Net après impôt :</strong> salaire net après application de votre taux de prélèvement à la source (0 %, 5 %, 10 %, etc.).</li>
        </ul>

        <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4 pt-8">FAQ Salarié</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-slate-800">Quelle différence entre brut et net ?</h4>
            <p className="text-slate-600 text-sm mt-1">Le brut est avant cotisations, le net est après cotisations (ce que vous touchez réellement).</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Le calcul brut net est-il exact ?</h4>
            <p className="text-slate-600 text-sm mt-1">C’est une estimation : la fiche de paie réelle dépend de votre convention, avantages, mutuelle, primes, tickets restaurant, heures sup, etc.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Comment calculer le net à partir du brut mensuel ?</h4>
            <p className="text-slate-600 text-sm mt-1">Entrez votre brut mensuel, sélectionnez votre statut, et le simulateur calcule le net mensuel et annuel.</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
      <h2 className="text-3xl font-bold mb-6 text-slate-900 border-l-4 border-indigo-600 pl-4">Aide Entrepreneur (Auto-entrepreneur / Indépendant)</h2>
      
      <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Différence entre chiffre d’affaires, revenu et “net”</h3>
      <p className="text-slate-600 leading-relaxed mb-4">
        En entrepreneur, on ne parle pas de “salaire brut” comme un salarié. On parle surtout de :
      </p>
      <ul className="list-disc pl-5 text-slate-600 mb-6 space-y-2">
        <li><strong>Chiffre d’affaires (CA) :</strong> total encaissé (hors déduction),</li>
        <li><strong>Cotisations sociales :</strong> charges URSSAF selon l’activité,</li>
        <li><strong>Revenu net :</strong> ce qu’il reste après cotisations (et éventuellement impôt).</li>
      </ul>
      <p className="text-slate-600 leading-relaxed mb-6">
        Notre outil sert à estimer votre revenu net auto-entrepreneur et à faire un calcul charges auto-entrepreneur.
      </p>

      <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Auto-entrepreneur : comment calculer le net</h3>
      <p className="text-slate-600 leading-relaxed mb-4">Le revenu net dépend :</p>
      <ul className="list-disc pl-5 text-slate-600 mb-6 space-y-2">
        <li>du type d’activité (BNC ou BIC),</li>
        <li>du montant de chiffre d’affaires mensuel ou annuel,</li>
        <li>du régime choisi (micro-entreprise),</li>
        <li>du mode d’imposition (option possible pour l’estimation).</li>
      </ul>
      <p className="text-slate-600 leading-relaxed mb-6">
        Le simulateur applique un taux de cotisations moyen pour obtenir : cotisations sociales, net avant impôt, net après impôt (estimation simple).
      </p>

      <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">BNC vs BIC : comprendre les statuts</h3>
      <ul className="list-disc pl-5 text-slate-600 mb-6 space-y-2">
        <li><strong>BNC (Bénéfices Non Commerciaux) :</strong> souvent professions libérales / prestations intellectuelles (ex : consultant, dev, graphiste).</li>
        <li><strong>BIC services (Bénéfices Industriels et Commerciaux – services) :</strong> prestations artisanales ou commerciales.</li>
        <li><strong>BIC vente :</strong> vente de marchandises, restauration, hébergement.</li>
      </ul>
      <p className="text-slate-600 leading-relaxed mb-6">
        Ces catégories changent les taux de cotisations et donc le calcul du net en micro-entreprise.
      </p>

      <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Charges auto-entrepreneur : cotisations sociales</h3>
      <p className="text-slate-600 leading-relaxed mb-6">
        Les cotisations URSSAF sont calculées sur le chiffre d’affaires. Le simulateur estime le montant des charges, puis le revenu net restant.
      </p>

      <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Activité mixte : BNC + BIC</h3>
      <p className="text-slate-600 leading-relaxed mb-6">
        Si vous avez une activité mixte (ex : prestations + vente), vous pouvez répartir votre chiffre d’affaires par catégorie. Cela améliore l’estimation du net.
      </p>

      <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Revenu net avant impôt vs après impôt</h3>
      <ul className="list-disc pl-5 text-slate-600 mb-6 space-y-2">
        <li><strong>Net avant impôt :</strong> CA – cotisations sociales.</li>
        <li><strong>Net après impôt :</strong> net avant impôt – estimation d’impôt (selon options simples).</li>
      </ul>
      <p className="text-slate-600 leading-relaxed mb-6 italic text-sm">
        Important : en réel, l’impôt dépend de votre foyer fiscal, quotient familial, charges, etc. Le simulateur donne une approximation utile.
      </p>

      <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Salarié vs Entrepreneur : brut net vs chiffre d’affaires net</h3>
      <p className="text-slate-600 leading-relaxed mb-10">
        Salarié : brut → net via cotisations sur salaire. Entrepreneur : CA → net via cotisations sur chiffre d’affaires. C’est pour cela que “3000 € de chiffre d’affaires” n’équivaut pas à “3000 € brut” salarié.
      </p>

      <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4 pt-8">FAQ Entrepreneur</h2>
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-slate-800">Comment calculer le net d’un auto-entrepreneur ?</h4>
          <p className="text-slate-600 text-sm mt-1">Entrez votre chiffre d’affaires, choisissez BNC/BIC, le simulateur estime charges et revenu net.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800">BNC ou BIC : lequel choisir ?</h4>
          <p className="text-slate-600 text-sm mt-1">Cela dépend de votre activité (libérale vs commerciale). En cas de doute, vérifiez votre activité déclarée et votre catégorie fiscale.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800">Le calcul est-il exact ?</h4>
          <p className="text-slate-600 text-sm mt-1">C’est une estimation : le résultat final peut varier selon exonérations (ACRE), TVA, frais réels (hors micro), impôts, etc.</p>
        </div>
      </div>
    </article>
  );
};

export default SEOSection;
