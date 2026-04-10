import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Bike, Package } from 'lucide-react';

export const DeliveryLoader: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Box sx={{ position: 'relative', width: 200, height: 100, overflow: 'hidden' }}>
        {/* Road line */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            width: '100%',
            height: 2,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />

        {/* Speed lines */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ x: 200 }}
            animate={{ x: -50 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              bottom: 25 + i * 5,
              width: 30,
              height: 2,
              backgroundColor: 'rgba(0, 245, 255, 0.4)',
              borderRadius: 2,
            }}
          />
        ))}

        {/* The Scooty / Bike */}
        <motion.div
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            bottom: 22,
            left: '40%',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Bike size={48} color="#00f5ff" />
            <motion.div
              animate={{
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                top: -10,
                right: -5,
              }}
            >
              <Package size={24} color="#7c3aed" />
            </motion.div>
          </Box>
        </motion.div>
      </Box>
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#fff', 
          fontWeight: 700, 
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontSize: '0.8rem',
          opacity: 0.8
        }}
      >
        Protocol Dispatching...
      </Typography>
    </Box>
  );
};
