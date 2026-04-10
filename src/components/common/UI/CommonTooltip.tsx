import React from 'react';
import { Tooltip, type TooltipProps, styled } from '@mui/material';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    color: theme.palette.text.primary,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(0, 245, 255, 0.2)' : 'rgba(14, 165, 233, 0.2)'}`,
    borderRadius: '8px',
    boxShadow: theme.palette.mode === 'dark' ? '0 0 15px rgba(0, 245, 255, 0.2)' : '0 4px 12px rgba(0,0,0,0.05)',
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '8px 12px',
  },
  [`& .MuiTooltip-arrow`]: {
    color: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
  },
}));

export const CommonTooltip: React.FC<TooltipProps> = (props) => {
  return <StyledTooltip {...props} arrow />;
};
