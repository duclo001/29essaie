import { motion } from 'motion/react';
import { useMemo } from 'react';

export function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-700"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            filter: 'blur(1px)',
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating larger particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`large-${i}`}
          className="absolute w-1 h-1 rounded-full bg-blue-600"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Vertical light beams */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-blue-700/60 to-transparent"
          style={{
            left: `${(i + 1) * 12}%`,
            height: '100%',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}