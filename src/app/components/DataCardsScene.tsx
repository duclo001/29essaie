import { motion } from 'motion/react';
import { DataCard } from './DataCard';
import { ParticleField } from './ParticleField';
import { NetworkConnections } from './NetworkConnections';
import { useIsMobile } from './ui/use-mobile';
import image1 from '@/assets/image1.png';
import image2 from '@/assets/image2.png';
import image3 from '@/assets/image3.png';

/**
 * Scène animée principale.
 *
 * Affiche :
 * - un fond d'effets (particules + réseau)
 * - 3 cartes (images) animées en boucle avec Motion
 *
 * Chorégraphie (par carte) :
 * 1) apparition depuis le haut (lift)
 * 2) position initiale
 * 3) "formation boule" (orbite/rotation)
 * 4) alignement horizontal
 * 5) retour + disparition
 *
 * Note : sur mobile, on réduit fortement les offsets X/Y pour éviter le débordement
 * tout en gardant la même séquence de keyframes.
 */
export function DataCardsScene() {
  const isMobile = useIsMobile();

  // Responsive MOBILE ONLY: on réduit fortement les offsets en X pour éviter le débordement
  // tout en gardant la chorégraphie desktop identique.
  const xFactor = isMobile ? 0.06 : 1;
  const alignXFactor = isMobile ? 0.04 : 1;
  const yFactor = isMobile ? 0.8 : 1;
  const lift = isMobile ? 60 : 100;

  /**
   * Paramétrage des cartes.
   *
   * Chaque carte définit :
   * - une image
   * - un délai de démarrage dans la boucle
   * - des positions-clés (initiale, "boule", alignement)
   * - une rotation Z (inclinaison visuelle)
   */
  const cards = [
    {
      id: 1,
      imageSrc: image1,
      delay: 0,
      initialPosition: { x: -200, y: -50 },
      spherePosition: { x: -80, y: -60 },
      horizontalPosition: { x: -320, y: 0 },
      rotation: -15,
    },
    {
      id: 2,
      imageSrc: image2,
      delay: 0.2,
      initialPosition: { x: 200, y: 50 },
      spherePosition: { x: 60, y: 40 },
      horizontalPosition: { x: 0, y: 0 },
      rotation: 15,
    },
    {
      id: 3,
      imageSrc: image3,
      delay: 0.4,
      initialPosition: { x: 0, y: 100 },
      spherePosition: { x: 20, y: 100 },
      horizontalPosition: { x: 320, y: 0 },
      rotation: -5,
    },
  ];

  /** Durée totale du cycle en secondes (la boucle repart immédiatement). */
  const animationDuration = 10;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Fond : particules + connexions (purement décoratif) */}
      <ParticleField />
      <NetworkConnections />
      
      {/* Cartes : animations en boucle avec keyframes synchronisées */}
      <div className="relative z-10">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            animate={{ 
              // Étapes: Apparition -> Position initiale -> Formation boule -> Alignement horizontal -> Retour -> Disparition
              opacity: [0, 1, 1, 1, 1, 1, 0],
              x: [
                card.initialPosition.x * xFactor,
                card.initialPosition.x * xFactor,
                card.spherePosition.x * xFactor,
                card.horizontalPosition.x * alignXFactor,
                card.initialPosition.x * xFactor,
                card.initialPosition.x * xFactor,
              ],
              y: [
                (card.initialPosition.y - lift) * yFactor,
                card.initialPosition.y * yFactor,
                card.spherePosition.y * yFactor,
                card.horizontalPosition.y * yFactor,
                card.initialPosition.y * yFactor,
                (card.initialPosition.y - lift) * yFactor,
              ],
              rotateX: [-90, 0, 0, 0, 0, -90],
              rotateY: [0, 0, 360, 360, 360, 360],
              scale: [0.5, 1, 0.9, 1, 1, 0.5],
            }}
            transition={{
              duration: animationDuration,
              delay: card.delay,
              times: [0, 0.15, 0.35, 0.55, 0.75, 1], // Temps relatifs pour chaque keyframe
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 0,
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transformOrigin: 'center',
            }}
          >
            <DataCard imageSrc={card.imageSrc} rotation={card.rotation} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}