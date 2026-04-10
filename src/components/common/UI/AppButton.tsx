import React from 'react';
import { Button, type ButtonProps, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

interface AppButtonProps extends ButtonProps {
  neon?: boolean;
  glass?: boolean;
}

/**
 * Premium Responsive Button System.
 * - XS: Full width, Small
 * - SM/MD: Auto width, Medium
 * - LG+: Auto width, Large
 */
export const AppButton: React.FC<AppButtonProps> = ({ 
  children, 
  neon, 
  glass, 
  sx, 
  size,
  ...props 
}) => {
  const theme = useTheme();
  
  // Responsive hooks
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  // Calculate size based on breakpoint if not explicitly provided
  const responsiveSize = size || (isMobile ? 'small' : isTablet ? 'medium' : 'large');

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ width: isMobile ? '100%' : 'auto' }}
    >
      <Button
        size={responsiveSize}
        sx={{
          width: '100%', // div controls the actual width, button fills div
          px: isMobile ? 2 : isTablet ? 3 : 4,
          py: isMobile ? 1 : isTablet ? 1.5 : 2,
          fontWeight: 800,
          borderRadius: '10px',
          boxShadow: neon ? `0 0 15px ${theme.palette.primary.main}40` : 'none',
          ...(glass && {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
            }
          }),
          ...sx,
        }}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};
