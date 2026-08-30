import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const particles = [
  { x: '7%', y: '18%', size: 3, delay: 0 },
  { x: '17%', y: '72%', size: 2, delay: 1.2 },
  { x: '28%', y: '34%', size: 4, delay: 2.1 },
  { x: '39%', y: '82%', size: 2, delay: 0.7 },
  { x: '51%', y: '21%', size: 3, delay: 1.8 },
  { x: '62%', y: '64%', size: 2, delay: 2.7 },
  { x: '73%', y: '29%', size: 4, delay: 1.1 },
  { x: '84%', y: '77%', size: 2, delay: 3.2 },
  { x: '92%', y: '42%', size: 3, delay: 0.4 },
  { x: '12%', y: '48%', size: 2, delay: 2.4 },
  { x: '46%', y: '57%', size: 3, delay: 1.5 },
  { x: '79%', y: '91%', size: 2, delay: 2.9 },
];

export const GtaAmbientFX: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Cursor-following neon spotlight */}
      <div
        className="gta-cursor-light"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
        }}
      />

      {/* Cinematic scanlines */}
      <div className="gta-scanlines" />

      {/* Moving neon grid */}
      <div className="gta-neon-grid" />

      {/* Floating particles */}
      <div className="gta-particle-field">
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="gta-particle"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.7, 0.15, 0.8, 0],
              y: [0, -25, -50, -75],
              x: [0, 8, -6, 12],
            }}
            transition={{
              duration: 6 + index % 4,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Subtle cinematic vignette */}
      <div className="gta-vignette" />

      {/* Occasional screen flicker */}
      <motion.div
        className="gta-screen-flicker"
        animate={{
          opacity: [0, 0, 0.025, 0, 0, 0.015, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </>
  );
};