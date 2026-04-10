import React from 'react';
import { TextField, type TextFieldProps, type Theme } from '@mui/material';

const getTextareaSx = (theme: Theme) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper,
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#E2E8F0',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      boxShadow: theme.palette.mode === 'dark' 
        ? `0 0 10px ${theme.palette.secondary.main}20` 
        : `0 0 10px ${theme.palette.primary.main}20`,
    },
  },
  '& .MuiInputBase-inputMultiline': {
    padding: theme.spacing(1.5, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.2, 1.5),
    },
  },
});

export const AppTextarea: React.FC<TextFieldProps> = ({ sx, ...props }) => {
  return (
    <TextField
      multiline
      minRows={4}
      fullWidth
      variant="outlined"
      sx={[(theme) => getTextareaSx(theme), ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    />
  );
};
