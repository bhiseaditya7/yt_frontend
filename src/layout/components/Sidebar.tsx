import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  styled,
  IconButton,
  useTheme,
  useMediaQuery,
  Collapse,
  ListItemText,
  Typography,
  ListItemIcon,
  alpha,
  Avatar,
  Paper,
  Divider,
  Switch,
  Chip,
  Toolbar
} from '@mui/material';
import {
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Brain,
  CircuitBoard,
  Archive,
  MapPin,
  Database,
  Shield,
  AlertTriangle,
  Lock,
  Eye,
  Radio,
  Zap,
  Activity,
  Bot
} from 'lucide-react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { routes } from '../../routes';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/auth/authThunk';

import BarChartIcon from '@mui/icons-material/BarChart';

// Constants for sidebar width
const EXPANDED_WIDTH = 220;
const COLLAPSED_WIDTH = 70;

// Enhanced drawer styling with proper positioning
const SidebarDrawer = styled(Drawer)<{ isCollapsed?: boolean }>(({ isCollapsed, theme }) => ({
  width: isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
    boxSizing: 'border-box',
    top: '64px', // Start below header
    height: 'calc(100vh - 64px - 80px)', // Account for header and footer
    borderRight: '1px solid rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(12, 10, 31, 0.95)',
    backdropFilter: 'blur(12px)',
    position: 'fixed',
    zIndex: theme.zIndex.drawer,
  },
}));

// Enhanced menu items
const menuItems = [
  { 
    id: 'home', 
    title: 'Dashboard', 
    icon: LayoutDashboard, 
    path: routes.home.path,
    description: 'Main control panel'
  },
  { 
    id: 'self-learning', 
    title: 'Self Learning', 
    icon: Brain,
    path: routes.bucket.path,
    description: 'AI learning system'
  },
  { 
    id: 'devices', 
    title: 'Devices', 
    icon: CircuitBoard,
    path: routes.devices.path,
    description: 'Connected devices'
  },
  // { 
  //   id: 'zones', 
  //   title: 'Zones', 
  //   icon: MapPin,
  //   path: routes.location.path,
  //   description: 'Security zones'
  // },
  { 
    id: 'archives', 
    title: 'Archives', 
    icon: Archive,
    path: routes.archives.path,
    description: 'Historical data'
  },
  // {
  //   id: 'stats',
  //   title: 'Stats',
  //   icon: BarChartIcon,
  //   path: routes.stats.path,
  //   description: 'Analytics and statistics'
  // },
  // { 
  //   id: 'personaldb', 
  //   title: 'Personal DB', 
  //   icon: Database,
  //   path: routes.users.path,
  //   description: 'Database management'
  // },
  { 
    id: 'settings', 
    title: 'Settings', 
    icon: Database,
    path: routes.settings.path,
    description: 'Settings'
  }
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'temporary';
}

const Sidebar: React.FC<SidebarProps> = ({ 
  open, 
  onClose, 
  variant = 'permanent'
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleLogout = () => {
    dispatch(logout())
  };

  const handleItemClick = (item: any) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    
    if (hasSubItems) {
      setExpandedItem(expandedItem === item.id ? null : item.id);
    } else if (item.path) {
      navigate(item.path);
      if (isMobile) {
        onClose();
      }
    }
  };

  const renderMenuItem = (item: any, index: number) => {
    const isActive = location.pathname === item.path;
    const isExpanded = expandedItem === item.id;
    const hasSubItems = item.subItems && item.subItems.length > 0;
  
    return (
      <React.Fragment key={item.id}>
        <ListItem 
          disablePadding 
          className="sidebar-menu-item slide-in gpu-accelerated"
          sx={{
            animationDelay: `${index * 0.05}s`,
            animationFillMode: 'both',
          }}
        >
          {isCollapsed ? (
            <Tooltip title={item.description || item.title} placement="right">
              <ListItemButton
                className={`sidebar-menu-item ${isActive ? 'active' : ''} gpu-accelerated`}
                onClick={() => handleItemClick(item)}
                sx={{
                  padding: '8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '4px 8px',
                  borderRadius: '8px',
                }}
              >
                <Box 
                  className="icon-wrapper gpu-accelerated"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    position: 'relative',
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    backgroundColor: isActive 
                      ? 'rgba(139, 92, 246, 0.15)'
                      : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <item.icon 
                    size={18}
                    color={isActive ? '#8b5cf6' : '#9ca3af'}
                  />
                </Box>
              </ListItemButton>
            </Tooltip>
          ) : (
            <ListItemButton
              className={`sidebar-menu-item ${isActive ? 'active' : ''} gpu-accelerated`}
              onClick={() => handleItemClick(item)}
              sx={{ 
                padding: '6px 8px',
                margin: '4px 8px',
                borderRadius: '8px',
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 32,
                  color: isActive ? '#8b5cf6' : '#9ca3af'
                }}
              >
                <Box 
                  className="icon-wrapper gpu-accelerated"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    position: 'relative',
                    width: 28,
                    height: 28,
                    borderRadius: '6px',
                    backgroundColor: isActive 
                      ? 'rgba(139, 92, 246, 0.15)'
                      : 'transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <item.icon size={16} />
                </Box>
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: isActive ? '#a78bfa' : '#f1f5f9',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.875rem',
                      letterSpacing: '0.3px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.title}
                  </Typography>
                } 
              />
              {hasSubItems && (
                <Box 
                  className="gpu-accelerated"
                  sx={{ 
                    ml: 'auto',
                    transition: 'transform 0.3s ease',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  }}
                >
                  <ChevronRight size={12} />
                </Box>
              )}
            </ListItemButton>
          )}
        </ListItem>
        
        {hasSubItems && !isCollapsed && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((subItem: any) => {
                const isSubActive = location.pathname === subItem.path;
                return (
                  <ListItem key={subItem.id} disablePadding>
                    <ListItemButton
                      className={`sidebar-menu-item ${isSubActive ? 'active' : ''} gpu-accelerated`}
                      onClick={() => handleItemClick(subItem)}
                      sx={{ 
                        ml: 2,
                        margin: '4px 8px',
                        borderRadius: '8px',
                      }}
                    >
                      <ListItemIcon sx={{ 
                        minWidth: 32,
                        color: isSubActive ? '#8b5cf6' : '#9ca3af'
                      }}>
                        <subItem.icon size={14} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: isSubActive ? '#a78bfa' : '#f1f5f9',
                              fontWeight: isSubActive ? 600 : 400,
                              fontSize: '0.75rem',
                            }}
                          >
                            {subItem.title}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const sidebarContent = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Security status indicator */}
      {/* <Box className="sidebar-security-status" sx={{ 
        mx: 1.5,
        mt: 2,
        mb: 2,
        p: 1,
        borderRadius: '8px',
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5,
          justifyContent: isCollapsed ? 'center' : 'flex-start'
        }}>
          <Shield size={12} color="#10b981" />
          {!isCollapsed && (
            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase' }}>
              System Secure
            </Typography>
          )}
        </Box>
      </Box> */}
      
      {/* Logo Section with Toggle Button */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '8px 12px',
        mb: 1,
        mt:2
      }}>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box className="sidebar-logo-container gpu-accelerated"
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield size={16} color="#22c55e" />
          </Box>
          {!isCollapsed && (
            <Typography
              variant="subtitle2"
              sx={{
                ml: 1,
                fontWeight: 700,
                color: '#f8fafc',
                letterSpacing: '0.5px',
                fontSize: '0.9rem',
              }}
            >
              SKYLARK LABS
            </Typography>
          )}
        </Box>

        {/* Toggle Button */}
        {!isMobile && (
          <IconButton
            onClick={toggleSidebar}
            size="small"
            className="sidebar-toggle-button gpu-accelerated"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            sx={{
              width: 24,
              height: 24,
              color: '#9ca3af',
            }}
          >
            {isCollapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
          </IconButton>
        )}
      </Box>

      {/* Scrollable content area */}
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingBottom: '120px' // Space for bottom section
      }}>
        {/* Category Label */}
        <Box sx={{ py: 0.5 }}>
          {!isCollapsed && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#64748b', 
                fontWeight: 600, 
                ml: 3, 
                mb: 0.5,
                display: 'block',
                letterSpacing: '0.5px',
                fontSize: '0.7rem'
              }}
            >
              NAVIGATION
            </Typography>
          )}
          
          {/* Menu Items */}
          <List sx={{ px: 0, mt: 0 }}>
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </List>
        </Box>
      </Box>

      {/* Bottom Section with Logout Button - Fixed at bottom */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid rgba(139, 92, 246, 0.1)',
        pt: 1,
        pb: 1,
        backgroundColor: 'rgba(12, 10, 31, 0.95)',
        backdropFilter: 'blur(8px)',
      }}>
        {/* System Activity */}
        {!isCollapsed && (
          <Box sx={{ px: 2, pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Activity size={12} color="#22c55e" />
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
                System Activity: Normal
              </Typography>
            </Box>
          </Box>
        )}

        {/* Logout Button */}
        <Box sx={{ px: isCollapsed ? 0.5 : 1 }}>
          {isCollapsed ? (
            <Tooltip title="Secure Logout" placement="right">
              <ListItemButton
                className="sidebar-logout-button gpu-accelerated"
                onClick={handleLogout}
                sx={{
                  margin: '4px 8px',
                  borderRadius: '8px',
                  padding: '8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    borderRadius: '6px',
                  }}
                >
                  <LogOut size={16} color="#f43f5e" />
                </Box>
              </ListItemButton>
            </Tooltip>
          ) : (
            <ListItemButton
              className="sidebar-logout-button gpu-accelerated"
              onClick={handleLogout}
              sx={{
                margin: '4px 8px',
                borderRadius: '8px',
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 32,
                color: '#f43f5e'
              }}>
                <LogOut size={16} />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography 
                    variant="caption"
                    sx={{ 
                      color: '#fb7185',
                      fontWeight: 500,
                      fontSize: '0.8rem',
                      letterSpacing: '0.3px',
                    }}
                  >
                    SECURE LOGOUT
                  </Typography>
                }
              />
            </ListItemButton>
          )}
        </Box>
      </Box>
    </Box>
  );

  if (variant === 'temporary') {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: EXPANDED_WIDTH,
            height: '100%',
            top: 0, // Mobile full height
          },
        }}
        className="sidebar-drawer"
      >
        <div className="sidebar-drawer">
          {/* Add toolbar spacer for mobile */}
          <Toolbar />
          {sidebarContent}
        </div>
      </Drawer>
    );
  }

  return (
    <SidebarDrawer 
      variant="permanent" 
      isCollapsed={isCollapsed}
      open={open}
      className="sidebar-drawer"
    >
      <div className="sidebar-drawer">
        {sidebarContent}
      </div>
    </SidebarDrawer>
  );
};

export default Sidebar;