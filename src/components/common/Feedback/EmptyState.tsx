import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Ghost, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppButton } from '../UI/AppButton';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * EmptyState component for 'no data' scenarios.
 * Adapts to Ocean Light and Clean Dark themes with controlled neon highlights.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  description = "There are no records to display at the moment.",
  icon: Icon = Ghost,
  actionLabel,
  onAction,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const neonHighlight = theme.palette.secondary.main;

  return (
    <Box
      sx={{
        py: 10,
        px: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bgcolor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.4)',
        borderRadius: '16px',
        border: '2px dashed',
        borderColor: 'divider',
      }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Box 
            sx={{ 
                mb: 3, 
                p: 3, 
                borderRadius: '50%', 
                background: `${neonHighlight}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${neonHighlight}20`
            }}
        >
          <Icon size={48} style={{ color: neonHighlight, opacity: 0.6 }} />
        </Box>
      </motion.div>
      
      <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 1.5 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 420, mb: 4, lineHeight: 1.6 }}>
        {description}
      </Typography>

      {actionLabel && onAction && (
        <AppButton variant="contained" onClick={onAction}>
          {actionLabel}
        </AppButton>
      )}
    </Box>
  );
};
