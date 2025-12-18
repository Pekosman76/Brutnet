
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Montage de l'application React
// ReactDOM.createRoot remplacera tout le contenu actuel de #root (le spinner) par l'App
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Erreur critique : Le conteneur #root est introuvable.");
}
