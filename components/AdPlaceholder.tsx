
import React from 'react';

interface AdPlaceholderProps {
  className?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ className }) => {
  // Masqué pour l'instant à la demande de l'utilisateur.
  // Pour réactiver, décommentez le code ci-dessous et retirez le "return null;".
  return null;

  /*
  return (
    <div className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-400 text-sm ${className}`}>
      {/* 
          GOOGLE ADSENSE INTEGRATION:
          Insérez votre code AdSense ici.
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      * /}
      Espace Publicitaire (AdSense)
    </div>
  );
  */
};

export default AdPlaceholder;
