import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { AlertTriangle } from 'lucide-react';
import { AppButton } from '../UI/AppButton';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ 
          p: 6, 
          textAlign: 'center', 
          background: 'rgba(239, 68, 68, 0.05)', 
          borderRadius: 4, 
          border: '1px solid rgba(239, 68, 68, 0.1)' 
        }}>
          <AlertTriangle color="#ef4444" size={48} style={{ marginBottom: 16 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#ef4444', mb: 1 }}>
            System Error Intercepted
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            An unexpected error occurred in this module. We have safely contained it.
          </Typography>
          <AppButton 
            variant="contained" 
            color="error" 
            onClick={() => window.location.reload()}
          >
            Restart Application
          </AppButton>
        </Box>
      );
    }

    return this.props.children;
  }
}
