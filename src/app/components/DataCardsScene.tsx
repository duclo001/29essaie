import { motion } from 'motion/react';
import { DataCard } from './DataCard';
import { ParticleField } from './ParticleField';
import { NetworkConnections } from './NetworkConnections';
import image1 from 'figma:asset/d61dd11a36f9dd7ae462c6ef5018e46b6e4f4bc1.png';
import image2 from 'figma:asset/6495a93e344c95c0c2a7bf57b035d98069b8bef9.png';
import image3 from 'figma:asset/4ceb49b8c627628e1f33bc09282dd76e0235a590.png';

export function DataCardsScene() {
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

  const animationDuration = 10; // Durée totale du cycle en secondes

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background particles and effects */}
      <ParticleField />
      <NetworkConnections />
      
      {/* Data cards */}
      <div className="relative z-10">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            animate={{ 
              // Étapes: Apparition -> Position initiale -> Formation boule -> Alignement horizontal -> Retour -> Disparition
              opacity: [0, 1, 1, 1, 1, 1, 0],
              x: [
                card.initialPosition.x, 
                card.initialPosition.x, 
                card.spherePosition.x, 
                card.horizontalPosition.x, 
                card.initialPosition.x,
                card.initialPosition.x
              ],
              y: [
                card.initialPosition.y - 100,
                card.initialPosition.y, 
                card.spherePosition.y, 
                card.horizontalPosition.y, 
                card.initialPosition.y,
                card.initialPosition.y - 100
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