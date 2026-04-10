import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
  Divider,
  useMediaQuery,
  Tooltip,
  styled,
  IconButton
} from '@mui/material';
import { type LucideIcon, Menu, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NavItem {
  text: string;
  icon: LucideIcon;
  path?: string;
  disabled?: boolean;
}

interface CommonDrawerProps {
  width: number;
  items: NavItem[];
  activeItem?: string;
  onItemClick?: (item: NavItem) => void;
  title?: string;
  footer?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  isMini?: boolean;
  onToggle?: () => void;
}

const StyledDrawer = styled(Drawer)(() => ({
  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '& .MuiDrawer-paper': {
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflowX: 'hidden',
  },
}));

export const CommonDrawer: React.FC<CommonDrawerProps> = ({
  width,
  items,
  activeItem,
  onItemClick,
  title,
  footer,
  open = false,
  onClose,
  isMini = false,
  onToggle,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const neonHighlight = theme.palette.secondary.main; // #00F7FF
  const miniWidth = 80;
  const currentWidth = isMini && !isMobile ? miniWidth : width;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{
        p: isMini && !isMobile ? 2 : 3,
        mb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 80
      }}>
        {isMini && !isMobile ? (
          <IconButton onClick={onToggle} sx={{ mx: 'auto', color: 'text.secondary' }}>
            <Menu size={20} />
          </IconButton>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key="expanded-title"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <Box sx={{ width: 12, height: 12, borderRadius: 1.5, bgcolor: theme.palette.primary.main, boxShadow: `0 0 10px ${theme.palette.primary.main}40` }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    color: 'text.primary',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {title || 'SYSTEM'}
                </Typography>
              </motion.div>
            </AnimatePresence>
            {!isMobile && (
              <IconButton onClick={onToggle} size="small" sx={{ color: 'text.disabled' }}>
                <ChevronLeft size={18} />
              </IconButton>
            )}
          </>
        )}
      </Box>

      <List sx={{ px: isMini && !isMobile ? 1 : 2, flexGrow: 1 }}>
        {items.map((item, index) => {
          const isActive = activeItem === item.text;
          const buttonContent = (
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                disabled={item.disabled}
                onClick={() => {
                  onItemClick?.(item);
                  if (isMobile) onClose?.();
                }}
                selected={isActive}
                sx={{
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  justifyContent: isMini && !isMobile ? 'center' : 'flex-start',
                  px: isMini && !isMobile ? 1 : 2.5,
                  minHeight: 48,
                  '&.Mui-selected': {
                    bgcolor: isDark ? 'rgba(0, 247, 255, 0.05) !important' : 'rgba(30, 136, 229, 0.05) !important',
                    color: isDark ? neonHighlight : theme.palette.primary.main,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '25%',
                      height: '50%',
                      width: '3px',
                      backgroundColor: isDark ? neonHighlight : theme.palette.primary.main,
                      borderRadius: '0 4px 4px 0',
                      boxShadow: isDark ? `0 0 15px ${neonHighlight}60` : 'none',
                    }
                  },
                  '&:hover': {
                    bgcolor: isDark ? '#273449' : '#F1F5F9',
                    transform: isMini && !isMobile ? 'scale(1.05)' : 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon sx={{
                  minWidth: isMini && !isMobile ? 0 : 36,
                  mr: isMini && !isMobile ? 0 : 0,
                  color: isActive ? (isDark ? neonHighlight : theme.palette.primary.main) : 'text.secondary',
                  justifyContent: 'center'
                }}>
                  <item.icon size={20} />
                </ListItemIcon>

                {!isMini || isMobile ? (
                  <ListItemText sx={{ ml: 1.5 }}>
                    <Typography sx={{ fontWeight: isActive ? 800 : 500, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                      {item.text}
                    </Typography>
                  </ListItemText>
                ) : null}
              </ListItemButton>
            </ListItem>
          );

          return (
            <motion.div
              key={item.text}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              {isMini && !isMobile ? (
                <Tooltip title={item.text} placement="right">
                  {buttonContent}
                </Tooltip>
              ) : buttonContent}
            </motion.div>
          );
        })}
      </List>

      {footer && (
        <Box sx={{ p: isMini && !isMobile ? 1 : 2, textAlign: isMini && !isMobile ? 'center' : 'left' }}>
          <Divider sx={{ mb: 2, borderColor: isDark ? 'rgba(148, 163, 184, 0.05)' : '#E2E8F0' }} />
          {isMini && !isMobile ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
            </Box>
          ) : footer}
        </Box>
      )}
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { lg: currentWidth }, flexShrink: { lg: 0 }, transition: 'width 0.3s ease' }}>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width,
            boxSizing: 'border-box',
            background: isDark ? '#111827' : '#FFFFFF',
            backgroundImage: 'none',
            borderRight: '1px solid',
            borderColor: isDark ? 'rgba(148, 163, 184, 0.05)' : '#E2E8F0',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <StyledDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width: currentWidth,
            boxSizing: 'border-box',
            background: isDark ? '#111827' : '#FFFFFF',
            backgroundImage: 'none',
            borderRight: '1px solid',
            borderColor: isDark ? 'rgba(148, 163, 184, 0.05)' : '#E2E8F0',
            boxShadow: isDark ? '20px 0 50px rgba(0,0,0,0.3)' : '0 0 10px rgba(0,0,0,0.02)',
          },
        }}
        open
      >
        {drawerContent}
      </StyledDrawer>
    </Box>
  );
};


