import { DataCardsScene } from '@/app/components/DataCardsScene';

/**
 * Composant racine de l'app.
 *
 * Responsabilités :
 * - poser le conteneur plein écran (fond, overflow)
 * - afficher la scène animée principale (cartes + effets)
 */
export default function App() {
  return (
    <div className="w-full h-screen bg-white overflow-hidden">
      <DataCardsScene />
    </div>
  );
}