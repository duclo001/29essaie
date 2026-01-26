import { motion } from 'motion/react';

export function NetworkConnections() {
  const connections = [
    { x1: 30, y1: 20, x2: 50, y2: 40 },
    { x1: 50, y1: 40, x2: 70, y2: 30 },
    { x1: 50, y1: 40, x2: 40, y2: 60 },
    { x1: 50, y1: 40, x2: 60, y2: 65 },
    { x1: 20, y1: 50, x2: 40, y2: 60 },
    { x1: 60, y1: 65, x2: 80, y2: 70 },
  ];

  const nodes = [
    { x: 30, y: 20, size: 8 },
    { x: 50, y: 40, size: 12 },
    { x: 70, y: 30, size: 8 },
    { x: 40, y: 60, size: 10 },
    { x: 60, y: 65, size: 10 },
    { x: 20, y: 50, size: 8 },
    { x: 80, y: 70, size: 8 },
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
          stroke="rgba(29, 78, 216, 0.8)"
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
          <stop offset="0%" stopColor="rgba(29, 78, 216, 0.4)" />
          <stop offset="50%" stopColor="rgba(30, 58, 138, 0.7)" />
          <stop offset="100%" stopColor="rgba(29, 78, 216, 0.4)" />
        </linearGradient>
      </defs>

      {/* Network nodes */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`}>
          <motion.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="rgba(29, 78, 216, 0.5)"
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
            fill="rgba(29, 78, 216, 0.8)"
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
            stroke="rgba(29, 78, 216, 0.7)"
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