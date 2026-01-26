import { motion } from 'motion/react';

interface DataCardProps {
  imageSrc: string;
  rotation: number;
}

export function DataCard({ imageSrc, rotation }: DataCardProps) {
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
        className="w-96 h-80 bg-gradient-to-br from-slate-800/90 to-slate-900/80 backdrop-blur-md rounded-lg shadow-2xl border border-slate-600/50 overflow-hidden"
        style={{
          transform: 'rotateX(45deg) rotateZ(-25deg)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(29, 78, 216, 0.6)',
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(29, 78, 216, 0.8)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Card content - Image */}
        <div className="w-full h-full p-4">
          <motion.div
            className="w-full h-full rounded-lg overflow-hidden bg-slate-700 shadow-inner"
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
          className="absolute inset-0 bg-gradient-to-br from-blue-700/30 to-slate-900/30 pointer-events-none"
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