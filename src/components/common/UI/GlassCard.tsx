import React from 'react';
import { Paper, type PaperProps, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface GlassCardProps extends PaperProps {
  children: React.ReactNode;
  noAnimation?: boolean;
}

/**
 * SaaS-grade Adaptive Card component. 
 * Light Mode: Soft Glass (Blur 8-10px)
 * Dark Mode: Solid Professional (#161B22)
 */
export const GlassCard: React.FC<GlassCardProps> = ({ children, noAnimation, sx, ...props }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const cardContent = (
    <Paper
      elevation={0}
      sx={{
        background: isDark ? '#161B22' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: isDark ? 'none' : 'blur(10px)',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );

  if (noAnimation) return cardContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
    >
      {cardContent}
    </motion.div>
  );
};
