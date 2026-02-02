import { motion } from 'motion/react';

/**
 * Propriétés d'une carte affichant une image, avec une inclinaison/rotation.
 */
interface DataCardProps {
  /** URL (ou import Vite) de l'image à afficher. */
  imageSrc: string;
  /** Rotation Z (en degrés) appliquée pour varier l'orientation de chaque carte. */
  rotation: number;
}

/**
 * Carte "document" animée.
 *
 * Effets :
 * - léger flottement vertical (y)
 * - perspective + rotation 3D pour donner une impression de profondeur
 * - halo (glow) animé en opacité
 * - survol : légère mise à l'échelle + ombre renforcée
 */
export function DataCard({ imageSrc, rotation }: DataCardProps) {
  const navy = 'rgb(23, 36, 65)';

  return (
    <motion.div
      className="relative"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        y: [0, -10, 0],
        rotateZ: rotation,
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        rotateZ: {
          duration: 0,
        },
      }}
    >
      <motion.div
        className="w-[min(24rem,92vw)] h-[clamp(14rem,40vh,20rem)] sm:w-96 sm:h-80 bg-gradient-to-br from-slate-800/90 to-slate-900/80 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden"
        style={{
          transform: 'rotateX(45deg) rotateZ(-25deg)',
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(23, 36, 65, 0.65)`,
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(23, 36, 65, 0.85)`,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Card content - Image */}
        <div className="w-full h-full">
          <motion.div
            className="w-full h-full overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <img 
              src={imageSrc} 
              alt="Document"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(23, 36, 65, 0.38), rgba(15, 23, 42, 0.30))`,
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
}