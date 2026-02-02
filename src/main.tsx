/**
 * Point d'entrée de l'application.
 *
 * - Monte l'application React dans l'élément #root.
 * - Charge les styles globaux (Tailwind/variables/theme) via `index.css`.
 */
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './styles/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Élément #root introuvable (index.html)');

createRoot(rootElement).render(<App />);
