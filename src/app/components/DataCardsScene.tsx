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

      {/* Holographic nodes */}
      <motion.div
        className="absolute"
        style={{ left: '50%', top: '20%' }}
        animate={{ 
          opacity: [0, 1, 1, 1, 1, 1, 0], 
          scale: [0, 1, 1, 1, 1, 1, 0] 
        }}
        transition={{ 
          duration: animationDuration, 
          delay: 0.6,
          times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
          repeat: Infinity,
          repeatDelay: 0,
        }}
      >
        <div className="relative" style={{ transform: 'translate(-50%, -50%)' }}>
          <motion.div
            className="w-16 h-16 rounded-full border-2 border-blue-700"
            animate={{
              boxShadow: [
                '0 0 20px rgba(29, 78, 216, 0.6)',
                '0 0 40px rgba(29, 78, 216, 0.8)',
                '0 0 20px rgba(29, 78, 216, 0.6)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-700/40 to-blue-900/60 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </motion.div>
          {/* Node rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-blue-700/50"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }}
              transition={{
                duration: 2,
                delay: i * 0.4,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}