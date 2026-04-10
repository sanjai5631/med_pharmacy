import React from 'react';
import { Box, Typography, Stack, IconButton, styled } from '@mui/material';
import { Sun, Moon, Palette } from 'lucide-react';
import { useAppTheme } from '../../../context/ThemeContext';

const ColorCircle = styled(Box, { shouldForwardProp: (p) => p !== 'active' && p !== 'color' })<{ color: string; active?: boolean }>(({ color, active }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: color,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: active ? `2px solid #fff` : '2px solid transparent',
  boxShadow: active ? `0 0 15px ${color}` : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.2)',
  },
}));

export const ThemeConfigPanel: React.FC = () => {
  const { mode, toggleTheme } = useAppTheme();
  const isDark = mode === 'dark';

  return (
    <Box sx={{ 
      p: 3, 
      width: 280, 
      background: 'rgba(255, 255, 255, 0.02)', 
      borderRadius: 4, 
      border: '1px solid rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)'
    }}>
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Palette size={20} color={isDark ? '#00f5ff' : '#0ea5e9'} />
        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1rem' }}>Interface Config</Typography>
      </Stack>

      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, mb: 1.5, display: 'block', letterSpacing: '0.1em' }}>
        ATMOSPHERE
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <IconButton 
          onClick={() => mode !== 'light' && toggleTheme()} 
          sx={{ 
            bgcolor: !isDark ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
            color: !isDark ? '#0ea5e9' : 'text.disabled',
            borderRadius: 3,
            p: 1.5,
            flex: 1
          }}
        >
          <Sun size={20} />
        </IconButton>
        <IconButton 
          onClick={() => mode !== 'dark' && toggleTheme()}
          sx={{ 
            bgcolor: isDark ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
            color: isDark ? '#00f5ff' : 'text.disabled',
            borderRadius: 3,
            p: 1.5,
            flex: 1
          }}
        >
          <Moon size={20} />
        </IconButton>
      </Stack>

      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, mb: 1.5, display: 'block', letterSpacing: '0.1em' }}>
        PRIMARY CORE
      </Typography>
      <Stack direction="row" spacing={2}>
        <ColorCircle color="#00f5ff" active={isDark} />
        <ColorCircle color="#0ea5e9" active={!isDark} />
        <ColorCircle color="#7c3aed" />
        <ColorCircle color="#10b981" />
      </Stack>
      
      <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              System preferences are locally synced and persistent across sessions.
          </Typography>
      </Box>
    </Box>
  );
};
