import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, type TextFieldProps, type Theme } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';

const getInputSx = (theme: Theme) => ({
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
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.2, 1.5),
    },
  },
});

export type AppInputProps = Omit<TextFieldProps, 'variant'> & {
  isPassword?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
};

export const AppInput: React.FC<AppInputProps> = ({ isPassword, sx, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      type={isPassword && !showPassword ? 'password' : 'text'}
      sx={[(theme) => getInputSx(theme), ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          ...(isPassword && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end" size="small">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </IconButton>
              </InputAdornment>
            ),
          }),
        },
      }}
    />
  );
};
