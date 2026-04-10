import React from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export const NebulaBackground: React.FC = () => {
  const theme = useTheme();
  
  // Disable organic background for minimal light mode
  if (theme.palette.mode === 'light') {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        bgcolor: '#020617',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Organic Veins / Lightning Glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50% 30% 80% 40%',
        }}
      />
      
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -45, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '70%',
          height: '70%',
          background: 'radial-gradient(ellipse at center, rgba(0, 245, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          borderRadius: '40% 60% 30% 70%',
        }}
      />

      {/* Lightning "Vein" Stripes */}
      <Box 
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          background: `
            linear-gradient(45deg, transparent 49%, rgba(124, 58, 237, 0.5) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(0, 245, 255, 0.5) 50%, transparent 51%)
          `,
          backgroundSize: '100px 100px',
          filter: 'blur(1px)',
        }} 
      />

      {/* Ambient Noise / Grain */}
      <Box 
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/1999/xlink'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </Box>
  );
};
