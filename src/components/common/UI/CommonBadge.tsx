import React from 'react';
import { Badge, type BadgeProps, styled } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.palette.mode === 'dark' ? `0 0 8px ${theme.palette.primary.main}` : 'none',
    fontWeight: 700,
    border: `1px solid rgba(255,255,255,0.2)`,
  },
}));

export const CommonBadge: React.FC<BadgeProps> = (props) => {
  return <StyledBadge {...props} />;
};
