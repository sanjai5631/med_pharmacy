import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, styled } from '@mui/material';
import { ChevronRight, Home } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const StyledBreadcrumbs = styled(MuiBreadcrumbs)(({ theme }) => ({
  '& .MuiBreadcrumbs-separator': {
    color: theme.palette.mode === 'dark' ? 'rgba(0, 245, 255, 0.4)' : 'rgba(14, 165, 233, 0.4)',
  },
  padding: '8px 16px',
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: '8px',
  backdropFilter: 'blur(4px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
}));

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface CommonBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const CommonBreadcrumbs: React.FC<CommonBreadcrumbsProps> = ({ items }) => {
  return (
    <StyledBreadcrumbs separator={<ChevronRight size={14} />} aria-label="breadcrumb">
      <Link
        component={RouterLink}
        to="/"
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          color: 'text.secondary', 
          textDecoration: 'none',
          '&:hover': { color: 'primary.main' }
        }}
      >
        <Home size={16} />
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return isLast ? (
          <Typography
            key={item.label}
            sx={{ 
              fontWeight: 700, 
              color: 'primary.main', 
              fontSize: '0.875rem',
              letterSpacing: '0.02em'
            }}
          >
            {item.label}
          </Typography>
        ) : (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.path || '#'}
            sx={{ 
              color: 'text.secondary', 
              textDecoration: 'none', 
              fontSize: '0.875rem',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
};
