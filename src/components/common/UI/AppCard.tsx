import React from 'react';
import { Paper, type PaperProps, styled } from '@mui/material';

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  border: theme.palette.mode === 'dark' ? '1px solid rgba(226, 232, 240, 0.05)' : '1px solid #E2E8F0',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 4px 20px rgba(0, 0, 0, 0.4)'
    : '0 4px 15px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark'
      ? `0 6px 25px ${theme.palette.primary.main}15`
      : `0 6px 20px ${theme.palette.primary.main}15`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const AppCard: React.FC<PaperProps> = ({ children, ...props }) => {
  return (
    <StyledCard elevation={0} {...props}>
      {children}
    </StyledCard>
  );
};
