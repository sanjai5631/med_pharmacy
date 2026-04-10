import React from 'react';
import { Avatar, type AvatarProps, styled } from '@mui/material';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 245, 255, 0.1)' : 'rgba(14, 165, 233, 0.1)',
  border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(0, 245, 255, 0.3)' : 'rgba(14, 165, 233, 0.3)'}`,
  boxShadow: theme.palette.mode === 'dark' ? '0 0 10px rgba(0, 245, 255, 0.2)' : 'none',
  fontWeight: 700,
  fontSize: '0.875rem',
  color: theme.palette.primary.main,
}));

export const CommonAvatar: React.FC<AvatarProps> = (props) => {
  return <StyledAvatar {...props} />;
};
