import { createTheme, type Theme } from '@mui/material/styles';

const baseTypography = {
  fontFamily: '"Inter", "Poppins", "Roboto", sans-serif',
  h1: { fontWeight: 800, letterSpacing: '-0.02em' },
  h2: { fontWeight: 800, letterSpacing: '-0.02em' },
  h3: { fontWeight: 700, letterSpacing: '-0.01em' },
  h4: { fontWeight: 700 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  button: { fontWeight: 600, textTransform: 'none' as const },
};

// 1. PROFESSIONAL HOSPITAL DARK (Deep Navy Palette)
export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3B82F6', dark: '#2563EB', light: '#60A5FA' },
    secondary: { main: '#00F7FF' }, // Neon cyan highlight
    success: { main: '#22C55E' },
    warning: { main: '#F59E0B' },
    error: { main: '#EF4444' },
    background: {
      default: '#0F172A',
      paper: '#1F2937'
    },
    text: {
      primary: '#E2E8F0',
      secondary: '#94A3B8',
      disabled: '#64748B'
    },
    divider: 'rgba(148, 163, 184, 0.1)',
  },
  typography: baseTypography,
  shape: { borderRadius: 10 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0F172A',
          backgroundImage: 'none',
          color: '#E2E8F0',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-thumb': { background: '#1F2937', borderRadius: '10px' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1F2937',
          border: '1px solid rgba(226, 232, 240, 0.05)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#111827',
          color: '#94A3B8',
          fontWeight: 700,
        },
        root: {
          borderColor: 'rgba(148, 163, 184, 0.1)',
        }
      }
    }
  },
});

// 2. MEDICAL GRADE LIGHT (Ocean Blue Palette)
export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1E88E5', contrastText: '#ffffff' },
    secondary: { main: '#00F7FF' }, // Neon cyan highlight (subtle)
    background: { default: '#F7FAFC', paper: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#475569' },
    divider: '#E2E8F0',
  },
  typography: baseTypography,
  shape: { borderRadius: 10 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F7FAFC',
          backgroundImage: 'none',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-thumb': { background: '#CBD5E1', borderRadius: '10px' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 2px 10px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#F1F5F9',
          color: '#475569',
          fontWeight: 700,
        },
        root: {
          borderColor: '#F1F5F9',
        }
      }
    }
  },
});
