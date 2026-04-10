import React from 'react';
import { Grid, type GridProps } from '@mui/material';

export const AppFormLayout: React.FC<GridProps> = ({ children, ...props }) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} {...props}>
      {children}
    </Grid>
  );
};

export const AppFormItem: React.FC<GridProps> = ({ children, ...props }) => {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }} {...props}>
      {children}
    </Grid>
  );
};
