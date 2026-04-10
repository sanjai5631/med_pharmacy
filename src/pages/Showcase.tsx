import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Stack, 
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Avatar,
  Paper
} from '@mui/material';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Settings, 
  HeartPulse,
  Stethoscope,
  Shield,
  Bell,
  Download,
  Search,
  ChevronRight,
  Sun,
  Moon,
  Menu
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  CommonDrawer, 
  NotificationCenter, 
  DataTable, 
  AppButton, 
  AppCard,
  AppInput,
  AppSelect,
  AppTextarea,
  AppFormLayout,
  AppFormItem,
  GlassCard,
  CommonBreadcrumbs,
  type Column
} from '../components/common';
import { useLoader } from '../context/LoaderContext';
import { useAppTheme } from '../context/ThemeContext';

const SIDEBAR_WIDTH = 260;


interface PatientRecord {
  id: string;
  name: string;
  room: string;
  vitals: string;
  status: 'stable' | 'critical' | 'observation';
}

const LIVE_RECORDS: PatientRecord[] = [
  { id: 'ADM-1082', name: 'James T. Kirk', room: 'Suite-302', vitals: 'Pulse 72bpm', status: 'stable' },
  { id: 'ADM-2291', name: 'Leonard McCoy', room: 'ICU-B1', vitals: 'BP 110/70', status: 'critical' },
  { id: 'ADM-9004', name: 'Nyota Uhura', room: 'Ward-405', vitals: 'SpO2 99%', status: 'observation' },
];

export const Showcase: React.FC = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useAppTheme();
  const isDark = mode === 'dark';
  const { showLoader, hideLoader } = useLoader();
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMini, setIsMini] = useState(false);

  const menuItems = [
    { text: 'Overview', icon: LayoutDashboard },
    { text: 'Patient Registry', icon: Users },
    { text: 'Vital Diagnostics', icon: Activity },
    { text: 'Medical Staff', icon: Stethoscope },
    { text: 'System Security', icon: Shield },
    { text: 'Preferences', icon: Settings },
  ];

  // Responsive Debugging Hooks
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const activeBreakpoint = isXs ? 'xs' : isSm ? 'sm' : isMd ? 'md' : isLg ? 'lg' : isXl ? 'xl' : 'xs';
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns: Column<PatientRecord>[] = [
    { id: 'id', label: 'Archive ID', minWidth: 120 },
    { 
      id: 'name', 
      label: 'Patient Details', 
      minWidth: 200,
      format: (_, row) => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'action.hover', width: 32, height: 32, fontSize: '0.8rem', color: isDark ? '#60A5FA' : theme.palette.primary.main }}>
                {row.name.charAt(0)}
            </Avatar>
            <Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{row.name}</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>{row.room}</Typography>
            </Box>
        </Stack>
      )
    },
    { 
        id: 'vitals', 
        label: 'Telemetry', 
        minWidth: 150,
        format: (val) => (
            <Typography variant="body2" sx={{ fontWeight: 800, color: isDark ? 'secondary.main' : 'primary.main', fontSize: '0.75rem' }}>{val}</Typography>
        )
    },
    { 
        id: 'status', 
        label: 'Current State', 
        minWidth: 130,
        format: (val) => (
            <Box sx={{ 
                px: 1, 
                py: 0.5, 
                borderRadius: '4px', 
                fontSize: '0.65rem', 
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                textTransform: 'uppercase',
                bgcolor: 'action.hover',
                color: val === 'critical' ? 'error.main' : (val === 'stable' ? 'success.main' : 'warning.main'),
                border: '1px solid currentColor'
            }}>
                <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'currentColor' }} />
                {val}
            </Box>
        )
    },
  ];

  const neonHighlight = theme.palette.secondary.main; // #00F7FF

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      
      <CommonDrawer 
        width={SIDEBAR_WIDTH} 
        items={menuItems} 
        activeItem={activeMenu}
        onItemClick={(item) => setActiveMenu(item.text)}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isMini={isMini}
        onToggle={() => setIsMini(!isMini)}
        title="MED-CLOUD"
        footer={
           <Box sx={{ display: 'flex', gap: 1, sx: { justifyContent: 'center', alignItems: 'center' } }}>
                <IconButton onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
                   {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </IconButton>
                <NotificationCenter />
                <Tooltip title="Secure Print">
                    <IconButton sx={{ color: 'text.secondary' }}><Download size={18} /></IconButton>
                </Tooltip>
                <Tooltip title="Emergency Alert">
                    <IconButton sx={{ color: '#EF4444' }}><Bell size={18} /></IconButton>
                </Tooltip>
           </Box>
        }
      />

      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: { xs: 2, md: 5 }, 
        width: { lg: `calc(100% - ${isMini ? 80 : SIDEBAR_WIDTH}px)` }, 
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'auto' 
      }}>
        <Container maxWidth="xl">
            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => setMobileOpen(true)}
                            sx={{ mr: 2 }}
                        >
                            <Menu size={24} />
                        </IconButton>
                    )}
                    <Box>
                        <CommonBreadcrumbs items={[{ label: 'Central Command' }, { label: activeMenu }]} />
                        <Typography variant="h3" sx={{ 
                            fontWeight: 900, 
                            mt: 1, 
                            color: 'text.primary',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            fontSize: { xs: '1.75rem', md: '3rem' }
                        }}>
                            {activeMenu}
                            <Box component="span" sx={{ fontSize: '0.4em', color: isDark ? neonHighlight : 'primary.main', fontWeight: 900, border: '1px solid currentColor', px: 1, borderRadius: 1 }}>LV.4</Box>
                        </Typography>
                    </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        bgcolor: isDark ? '#111827' : '#FFFFFF', 
                        px: 2, 
                        py: 1, 
                        borderRadius: 2,
                        width: 300,
                        border: '1px solid',
                        borderColor: isDark ? 'rgba(148, 163, 184, 0.1)' : '#E2E8F0'
                    }}>
                        <Search size={18} color={theme.palette.text.secondary} />
                        <Typography variant="body2" sx={{ ml: 2, color: 'text.disabled' }}>Search patient or archive...</Typography>
                    </Box>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                        {/* Breakpoint Indicator */}
                        <Box sx={{ 
                            px: 1.5, 
                            py: 0.5, 
                            borderRadius: '20px', 
                            bgcolor: isDark ? 'rgba(0, 247, 255, 0.1)' : 'rgba(30, 136, 229, 0.1)',
                            border: '1px solid',
                            borderColor: isDark ? neonHighlight : 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                             <Typography variant="caption" sx={{ fontWeight: 900, color: isDark ? neonHighlight : 'primary.main', fontSize: '0.7rem' }}>
                                VIEWPORT: {windowWidth}px
                             </Typography>
                             <Typography variant="caption" sx={{ 
                                fontWeight: 900, 
                                bgcolor: isDark ? neonHighlight : 'primary.main',
                                color: isDark ? '#000' : '#FFF',
                                px: 1,
                                borderRadius: '10px',
                                minWidth: '35px',
                                textAlign: 'center',
                                textTransform: 'uppercase'
                             }}>
                                {activeBreakpoint}
                             </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2" sx={{ fontWeight: 800 }}>DR. SARA CHEN</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'success.main' }} />
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Online</Typography>
                            </Box>
                        </Box>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, color: '#fff', width: 42, height: 42, border: '2px solid', borderColor: isDark ? '#111827' : '#FFFFFF' }}>SC</Avatar>
                    </Stack>
                </Box>
            </Box>

            <Grid container spacing={4} sx={{ mb: 6 }}>
                {[
                    { label: 'Active Admissions', value: '142', trend: '+12%', icon: Users },
                    { label: 'Critical Care', value: '14', trend: 'Severe', icon: HeartPulse, color: '#EF4444' },
                    { label: 'System Health', value: '99.9%', trend: 'Operational', icon: Activity, color: isDark ? neonHighlight : 'primary.main' },
                ].map((stat, i) => (
                    <Grid key={i} size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ p: 3, borderLeft: `4px solid ${stat.color || theme.palette.primary.main}` }}>
                            <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>{stat.label}</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 900, mt: 1, color: stat.color || 'text.primary' }}>{stat.value}</Typography>
                                </Box>
                                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'action.hover', color: stat.color || 'primary.main' }}>
                                    <stat.icon size={24} />
                                </Box>
                            </Stack>
                            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: stat.trend.includes('+') ? 'success.main' : 'text.disabled' }}>{stat.trend}</Typography>
                                <Typography variant="caption">since last sync</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Activity size={24} color={isDark ? neonHighlight : theme.palette.primary.main} /> COMPONENT SYSTEM
                    </Typography>
                </Grid>

                {/* Buttons Showcase */}
                <Grid size={{ xs: 12, lg: 6 }}>
                    <AppCard>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>Responsive Button System</Typography>
                            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                                Behavior: {activeBreakpoint === 'xs' ? 'Full Width (xs)' : 'Auto Width (sm+)'} | Current Hitbox: {activeBreakpoint === 'xs' ? 'Small' : 'Standard'}
                            </Typography>
                        </Box>
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>AUTO SIZING (SMART DETECT)</Typography>
                                <AppButton variant="contained">Default Responsive Button</AppButton>
                            </Box>
                            
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>EXPLICIT SIZES</Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'center' }}>
                                    <AppButton variant="contained" size="small">Small Button</AppButton>
                                    <AppButton variant="contained" size="medium">Medium Button</AppButton>
                                    <AppButton variant="contained" size="large">Large Button</AppButton>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>VARIANTS & NEON</Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <AppButton variant="contained" neon>Primary Neon</AppButton>
                                    <AppButton variant="outlined">Outlined</AppButton>
                                    <AppButton variant="text">Text Only</AppButton>
                                </Stack>
                            </Box>
                        </Stack>
                    </AppCard>
                </Grid>

                {/* Form Elements Showcase */}
                <Grid size={{ xs: 12, lg: 6 }}>
                    <AppCard>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Form Architecture</Typography>
                        <AppFormLayout>
                            <AppFormItem size={{ xs: 12, md: 6 }}>
                                <AppInput label="Standard Input" placeholder="Type something..." />
                            </AppFormItem>
                            <AppFormItem size={{ xs: 12, md: 6 }}>
                                <AppInput label="Password Field" isPassword placeholder="••••••••" />
                            </AppFormItem>
                            <AppFormItem size={{ xs: 12 }}>
                                <AppSelect 
                                    label="Selection Menu" 
                                    defaultValue=""
                                    options={[
                                        { label: 'Option Alpha', value: 'a' },
                                        { label: 'Option Beta', value: 'b' },
                                        { label: 'Option Gamma', value: 'g' }
                                    ]} 
                                />
                            </AppFormItem>
                            <AppFormItem size={{ xs: 12 }}>
                                <AppTextarea label="Rich Area" placeholder="Write detailed clinical notes here..." />
                            </AppFormItem>
                        </AppFormLayout>
                    </AppCard>
                </Grid>

                {/* Data & Interactive Showcase */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, px: 1 }}>Live Telemetry Archive</Typography>
                    <DataTable 
                        data={activeMenu === 'Overview' ? LIVE_RECORDS : []} 
                        columns={columns} 
                    />
                </Grid>

                {/* Quick Admission Panel */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <AppCard>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <ChevronRight size={20} color={isDark ? neonHighlight : theme.palette.primary.main} /> ADMISSION QUEUE
                        </Typography>
                        
                        <AppFormLayout>
                            <AppFormItem size={{ xs: 12 }}>
                                <AppInput label="Patient Identification" placeholder="e.g. ADM-1082" />
                            </AppFormItem>
                            
                            <AppFormItem size={{ xs: 12 }}>
                                <AppSelect 
                                    label="Medical Division" 
                                    defaultValue=""
                                    options={[
                                        { label: 'Cardiology Center', value: 'cardio' }, 
                                        { label: 'Neural Wing', value: 'neuro' },
                                        { label: 'Emergency Trauma', value: 'er' }
                                    ]} 
                                />
                            </AppFormItem>
                        </AppFormLayout>

                        <Box sx={{ mt: 4 }}>
                            <AppButton 
                                variant="contained" 
                                fullWidth 
                                neon
                                sx={{ py: 1.5, fontWeight: 900 }}
                                onClick={() => { showLoader('delivery'); setTimeout(hideLoader, 1500); }}
                            >
                                PROCESS RECORD
                            </AppButton>
                        </Box>
                    </AppCard>

                    <GlassCard sx={{ mt: 4, p: 3, border: '1px dashed', borderColor: 'divider' }}>
                        <Stack spacing={2}>
                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled' }}>NETWORK UPLINK</Typography>
                                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 900 }}>SECURE</Typography>
                             </Box>
                             <Box sx={{ width: '100%', height: '4px', bgcolor: 'action.hover', borderRadius: 1, overflow: 'hidden' }}>
                                <motion.div 
                                    animate={{ x: [-100, 400] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    style={{ width: '80px', height: '100%', background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)` }} 
                                />
                             </Box>
                        </Stack>
                    </GlassCard>
                </Grid>
            </Grid>
        </Container>
      </Box>
    </Box>
  );
};
