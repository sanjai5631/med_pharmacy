import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Badge, 
  Popover, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar,
  Avatar,
  Divider,
  useTheme,
  Chip
} from '@mui/material';
import { Bell, Info, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

const getIcon = (type: string, theme: any) => {
  switch (type) {
    case 'success': return <CheckCircle size={20} color={theme.palette.success.main} />;
    case 'warning': return <AlertCircle size={20} color={theme.palette.warning.main} />;
    case 'error': return <XCircle size={20} color={theme.palette.error.main} />;
    default: return <Info size={20} color={theme.palette.primary.main} />;
  }
};

export const NotificationCenter: React.FC = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Security Patch', message: 'System updated to v2.4.0', type: 'success', time: '2m ago', read: false },
    { id: '2', title: 'Access Alert', message: 'New device logged in from UK', type: 'warning', time: '1h ago', read: false },
    { id: '3', title: 'Data Feed', message: 'Monthly report is ready', type: 'info', time: '5h ago', read: true },
  ]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const open = Boolean(anchorEl);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box>
      <IconButton onClick={handleClick} sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
        <Badge badgeContent={unreadCount} color="error" overlap="circular">
          <Bell size={22} />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
            paper: {
                sx: {
                    mt: 1.5,
                    width: 320,
                    borderRadius: 3,
                    background: isDark ? '#161B22' : '#ffffff',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    backgroundImage: 'none'
                }
            }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>Notification Logs</Typography>
          {unreadCount > 0 && <Chip label={`${unreadCount} New`} size="small" color="primary" sx={{ fontWeight: 700 }} />}
        </Box>
        <Divider />
        <List sx={{ p: 0, maxHeight: 400, overflow: 'auto' }}>
          {notifications.map((n) => (
            <ListItem 
              key={n.id} 
              sx={{ 
                py: 2, 
                px: 2, 
                background: n.read ? 'transparent' : (isDark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(0,0,0,0.02)'),
                '&:hover': { background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }
              }}
            >
              <ListItemAvatar sx={{ minWidth: 48 }}>
                <Avatar sx={{ bgcolor: 'transparent', border: '1px solid', borderColor: 'divider' }}>
                  {getIcon(n.type, theme)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: n.read ? 'text.secondary' : 'text.primary' }}>{n.title}</Typography>}
                secondary={
                  <Box sx={{ mt: 0.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>{n.message}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>{n.time}</Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 1.5, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                SYSTEM ARCHIVE
            </Typography>
        </Box>
      </Popover>
    </Box>
  );
};
