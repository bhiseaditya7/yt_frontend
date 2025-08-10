import React, { useState, ReactNode } from 'react';
import {
  Box,
  Toolbar,
  useTheme,
  useMediaQuery,
  Paper,
  CssBaseline,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { SidebarProvider, useSidebar } from '../contexts/SidebarContext';
import { AlertsProvider, useAlerts } from '../contexts/AlertsProvider';
import '../css/animations.css';

const EXPANDED_WIDTH = 220;
const COLLAPSED_WIDTH = 60;
const ALERTS_EXPANDED_WIDTH = 490;
const ALERTS_COLLAPSED_WIDTH = 48;

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isCollapsed } = useSidebar();
  const { isAlertsCollapsed, alertType, toggleAlertsPanel, setAlertType } = useAlerts();
  const isHomeRoute = location.pathname === '/' || location.pathname === '/home';
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleAlertTypeChange = (type: 'recognition' | 'detection' | 'vehicle') => {
    setAlertType(type);
  };
  
  const sidebarWidth = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
  const alertsWidth = (isHomeRoute && !isAlertsCollapsed) ? ALERTS_EXPANDED_WIDTH : ALERTS_COLLAPSED_WIDTH;
  
  return (
    <Box
      className="dashboard-background gpu-accelerated"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CssBaseline />
      {/* Header - Fixed at top */}
      <Box sx={{ flexShrink: 0 }}>
        <Header
          showSidebarToggle={true}
          onMobileMenuClick={handleDrawerToggle}
        />
      </Box>
      {/* Main layout container - Flexible middle section */}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          position: 'relative',
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {/* Sidebar - Fixed on left */}
        <Sidebar
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          variant={isMobile ? 'temporary' : 'permanent'}
        />
        {/* Main content wrapper */}
        <Box
          component="main"
          className="main-content-animation gpu-accelerated"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            mr: (isHomeRoute && !isMobile) ? `${alertsWidth}px` : 0,
            transition: theme.transitions.create(['margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            overflow: 'hidden',
          }}
        >
          {/* Spacer for fixed header */}
          <Toolbar sx={{ minHeight: '56px !important', flexShrink: 0 }} />
          {/* Content container - This is the scrollable area */}
          <Box
            sx={{
              flexGrow: 1,
              minHeight: 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Main content area with enhanced styling */}
            <Paper
              elevation={0}
              square
              sx={{
                height: '100%',
                borderRadius: 0,
                overflow: 'auto',
                border: '1px solid',
                borderLeft: 0,
                borderRight: 'none',
                borderBottom: 'none',
                borderColor: 'rgba(139, 92, 246, 0.2)',
                boxShadow: 'none',
                p: 3,
                m: 0,
                position: 'relative',
                display: 'block',
              }}
            >
              {children}
            </Paper>
          </Box>
        </Box>
        {/* Alerts Panel Toggle Button - Always visible on home route */}
        {isHomeRoute && !isMobile && (
          <Box
            sx={{
              position: 'fixed',
              top: '12%',
              right: isAlertsCollapsed ? ALERTS_COLLAPSED_WIDTH - 30 : ALERTS_EXPANDED_WIDTH - 30,
              transform: 'translateY(-50%)',
              zIndex: theme.zIndex.drawer + 2,
            }}
          >
            <Tooltip title={isAlertsCollapsed ? "Show Alerts" : "Hide Alerts"} placement="left">
              <IconButton
                onClick={toggleAlertsPanel}
                className="alerts-toggle-button gpu-accelerated"
                sx={{
                  borderRadius: isAlertsCollapsed ? '8px 0 0 8px' : '0 8px 8px 0',
                  width: 40,
                  height: 60,
                  color: '#8B5CF6',
                }}
              >
                {isAlertsCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {/* Alerts Panel - Only visible on home route */}
        {isHomeRoute && !isMobile && (
          <Box
            className="alerts-panel gpu-accelerated"
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: isAlertsCollapsed ? ALERTS_COLLAPSED_WIDTH : ALERTS_EXPANDED_WIDTH,
              height: '100vh',
              borderLeft: isAlertsCollapsed ? 'none' : '1px solid rgba(139, 92, 246, 0.2)',
              zIndex: theme.zIndex.drawer,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              paddingBottom: '80px',
              backgroundColor: isAlertsCollapsed ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
            }}
          >
            {/* Collapsed State - Show "Alerts" text horizontally */}
            {isAlertsCollapsed && (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                }}
              >
                <Box
                  sx={{
                    transform: 'rotate(180deg)',
                    color: '#8B5CF6',
                    fontSize: '16px',
                    fontWeight: 500,
                    letterSpacing: '5px',
                    textTransform: 'uppercase',
                    userSelect: 'none',
                  }}
                >
                  Alerts
                </Box>
              </Box>
            )}
            {/* Alerts Panel Content */}
            {!isAlertsCollapsed && (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* Spacer for header */}
                <Toolbar />
                {/* Alerts Content */}
                <Box
                  sx={{
                    flexGrow: 1,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Alerts Panel
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Alerts functionality will be implemented here.
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
      {/* Footer - Sticky at bottom */}
      <Box
        className="smooth-transition"
        sx={{
          width: '100%',
          height: '80px',
          position: 'relative',
          zIndex: theme.zIndex.appBar + 1,
          flexShrink: 0,
          borderTop: '1px solid rgba(139, 92, 246, 0.1)',
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

const OptimizedDashboardBaseLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <AlertsProvider>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </AlertsProvider>
    </SidebarProvider>
  );
};

export default OptimizedDashboardBaseLayout;