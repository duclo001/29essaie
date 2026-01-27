import { motion } from 'motion/react';

export function NetworkConnections() {
  const navy = 'rgb(23, 36, 65)';

  // Points arranged to resemble a capital "M"
  // Coordinates are in % of the SVG width/height.
  const nodes = [
    { x: 25, y: 75, size: 8 },  // bottom-left
    { x: 25, y: 25, size: 10 }, // top-left
    { x: 50, y: 58, size: 12 }, // center valley
    { x: 75, y: 25, size: 10 }, // top-right
    { x: 75, y: 75, size: 8 },  // bottom-right
  ];

  const connections = [
    // Left pillar
    { x1: 25, y1: 75, x2: 25, y2: 25 },
    // Left diagonal down to valley
    { x1: 25, y1: 25, x2: 50, y2: 58 },
    // Right diagonal up to peak
    { x1: 50, y1: 58, x2: 75, y2: 25 },
    // Right pillar
    { x1: 75, y1: 25, x2: 75, y2: 75 },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      style={{ filter: 'blur(0.5px)' }}
    >
      {/* Connection lines */}
      {connections.map((conn, i) => (
        <motion.line
          key={`line-${i}`}
          x1={`${conn.x1}%`}
          y1={`${conn.y1}%`}
          x2={`${conn.x2}%`}
          y2={`${conn.y2}%`}
          stroke="url(#lineGradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated pulses on lines */}
      {connections.map((conn, i) => (
        <motion.line
          key={`pulse-${i}`}
          x1={`${conn.x1}%`}
          y1={`${conn.y1}%`}
          x2={`${conn.x2}%`}
          y2={`${conn.y2}%`}
          stroke={`rgba(23, 36, 65, 0.85)`}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{
            pathLength: [0, 0.3, 0],
            pathOffset: [0, 1, 1],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Gradient definition */}
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(23, 36, 65, 0.35)" />
          <stop offset="50%" stopColor="rgba(23, 36, 65, 0.75)" />
          <stop offset="100%" stopColor="rgba(23, 36, 65, 0.35)" />
        </linearGradient>
      </defs>

      {/* Network nodes */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`}>
          <motion.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill={`rgba(23, 36, 65, 0.55)`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: i * 0.15,
            }}
          />
          <motion.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size / 2}
            fill={`rgba(23, 36, 65, 0.9)`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: i * 0.15 + 0.2,
            }}
          />
          {/* Pulsing ring */}
          <motion.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="none"
            stroke={`rgba(23, 36, 65, 0.75)`}
            strokeWidth="2"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{
              scale: [1, 2, 2],
              opacity: [0.7, 0, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </g>
      ))}
    </svg>
  );
}