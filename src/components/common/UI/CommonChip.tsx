import React from 'react';
import { Chip, type ChipProps, styled } from '@mui/material';

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: '6px', // Sharp look matching the system
  fontWeight: 600,
  fontSize: '0.75rem',
  transition: 'all 0.2s ease',
  '&.MuiChip-outlined': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-1px)',
    },
  },
  '&.MuiChip-colorPrimary': {
    background: theme.palette.mode === 'dark' 
      ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
      : theme.palette.primary.main,
    boxShadow: theme.palette.mode === 'dark' ? `0 0 10px rgba(0, 245, 255, 0.3)` : 'none',
    border: 'none',
  },
}));

export const CommonChip: React.FC<ChipProps> = (props) => {
  return <StyledChip {...props} size={props.size || 'small'} />;
};
