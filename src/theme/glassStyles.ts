import type { SxProps, Theme } from '@mui/material';

export const glassStyles: SxProps<Theme> = {
  background: 'rgba(255, 255, 255, 0.45)', // Slightly more opaque for better readability
  backdropFilter: 'blur(20px) saturate(180%)', // Increased blur and saturation
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -5px rgba(0, 0, 0, 0.05)', // Multi-layered shadow
  borderRadius: 6,
};

export const darkGlassStyles: SxProps<Theme> = {
  background: 'rgba(15, 23, 42, 0.7)',
  backdropFilter: 'blur(25px) saturate(150%)',
  WebkitBackdropFilter: 'blur(25px) saturate(150%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  borderRadius: 6,
};

export const intenseGlassStyles: SxProps<Theme> = {
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(40px)',
  WebkitBackdropFilter: 'blur(40px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.3)',
  borderRadius: 6,
};
