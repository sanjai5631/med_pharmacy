import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme
} from '@mui/material';
import { AlertCircle } from 'lucide-react';
import { AppButton } from '../UI/AppButton';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  severity?: 'error' | 'warning' | 'info';
}

/**
 * Enterprise Confirm Dialog with duality support.
 * Uses AppButton and theme-compliant surface styling.
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  severity = 'error'
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Dialog 
        open={open} 
        onClose={onCancel}
        slotProps={{
            paper: {
                sx: {
                    borderRadius: '16px',
                    p: 1,
                    bgcolor: isDark ? '#111827' : '#ffffff',
                    backgroundImage: 'none',
                    minWidth: 380
                }
            }
        }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 800 }}>
        <AlertCircle color={theme.palette[severity].main} size={24} />
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <AppButton onClick={onCancel} variant="text" sx={{ color: 'text.secondary' }}>
          {cancelText}
        </AppButton>
        <AppButton 
            onClick={onConfirm} 
            variant="contained" 
            sx={{ 
                bgcolor: theme.palette[severity].main,
                '&:hover': { bgcolor: theme.palette[severity].dark }
            }}
        >
          {confirmText}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
};
