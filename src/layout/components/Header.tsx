import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  Divider,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft,
  LogOut,
  User,
  Settings,
  Bell,
  Scan,
  Clock,
  Sun,
  Moon,
  SidebarOpen,
  SidebarClose,
  Radar,
  Zap,
  Shield,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';
import { getCurrentDateTime } from '../../utils/helper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ThemeVariantsProps } from '../../theme';
import { setThemeMode } from '../../store/theme/themeSlice';
interface HeaderProps {
  showSidebarToggle?: boolean;
  onMobileMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showSidebarToggle = true,
  onMobileMenuClick
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);
  const [currentTime, setCurrentTime] = useState<string>(getCurrentDateTime());
  const dispatch = useAppDispatch();
  const { themeMode } = useAppSelector((state) => state.theme);
  const isDarkTheme = themeMode === ThemeVariantsProps.dark;


  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
    role: 'Administrator',
    clearance: 'Level 5'
  };

  // Update time every second
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentDateTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Handle user menu
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handle notifications menu
  const handleOpenNotificationsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(routes.login.path);
  };

  const handleToggleTheme = () => {
    dispatch(setThemeMode(isDarkTheme ? ThemeVariantsProps.light : ThemeVariantsProps.dark));
  };

  // Handle mobile menu click
  const handleMobileMenuClick = () => {
    if (onMobileMenuClick) {
      onMobileMenuClick();
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="header-appbar gpu-accelerated"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 'none',
        borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
        backdropFilter: 'blur(12px)',
        backgroundColor: theme => alpha(theme.palette.background.default, 0.85),
        color: 'text.primary',
      }}
    >
      <Toolbar>
        {/* Mobile Sidebar Toggle Button */}
        {showSidebarToggle && isMobile && (
          <IconButton
            color="inherit"
            aria-label="open sidebar"
            edge="start"
            onClick={handleMobileMenuClick}
            className="header-mobile-toggle gpu-accelerated"
            sx={{ 
              mr: 2, 
              color: 'primary.main',
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Paper 
            elevation={0} 
            className="header-logo-paper gpu-accelerated"
            sx={{ 
              p: 0.5, 
              mr: 1.5, 
              borderRadius: '12px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <IconButton
              sx={{
                width: { xs: 32, sm: 36 },
                height: { xs: 32, sm: 36 },
                p: 0.5,
              }}
              onClick={() => navigate(routes.home.path)}
            >
              <img
                src="/skylark-logo-purple.png"
                alt="Skylark Logo"
                style={{ height: 36, width: 36 }}
              />
            </IconButton>
          </Paper>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'flex' },
              fontWeight: 'bold',
              backgroundImage: 'linear-gradient(90deg, #7e3af2, #a78bfa)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
           Kepler Platform
          </Typography> */}
        </Box>

        {/* Center Kepler Platform Title */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.025em',
              backgroundImage: 'linear-gradient(90deg, #7e3af2, #a78bfa)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            Kepler Platform
          </Typography>
        </Box>

        {/* Scout Mk1 Tower - Enhanced - COMMENTED OUT */}
        {/* 
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Paper
            elevation={0}
            className="header-tower-section gpu-accelerated"
            sx={{
              px: 3,
              py: 1,
              borderRadius: '16px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 2,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              className="header-radar-container gpu-accelerated"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Radar size={20} color="#8b5cf6" />
              <Box className="header-radar-border">
                <div className="header-radar-sweep" />
              </Box>
            </Box>
            
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.025em',
                backgroundImage: 'linear-gradient(90deg, #7e3af2, #a78bfa)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Scout MK I Tower
            </Typography>
            
            <Chip
              icon={<Zap size={14} />}
              label="AI Enhanced"
              size="small"
              className="header-ai-chip gpu-accelerated"
              sx={{
                '& .MuiChip-icon': {
                  color: '#22c55e',
                },
              }}
            />
          </Paper>
        </Box>
        */}

        {/* Current Time Display */}
        <Paper
          elevation={0}
          className="header-time-paper gpu-accelerated"
          sx={{
            mr: 2,
            px: 1.5,
            height: 32,
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            borderRadius: '12px',
          }}
        >
          <Clock size={16} color={theme.palette.primary.main} />
          <Typography 
            variant="body2" 
            color="text.primary"
            fontWeight={500}
            fontSize="14px"
            sx={{ ml: 1 }}
          >
            {currentTime}
          </Typography>
        </Paper>

        {/* Theme Toggle */}
        {/* <Tooltip title={isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          <IconButton
            onClick={handleToggleTheme}
            className="header-theme-toggle gpu-accelerated"
            sx={{
              ml: 1,
              color: 'primary.main',
              width: 36,
              height: 36,
            }}
          >
            {isDarkTheme ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </IconButton>
        </Tooltip> */}

        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton
            className="header-notification-btn gpu-accelerated"
            sx={{ 
              ml: 1, 
              color: 'primary.main',
              width: 69,
              height: 69,
            }}
            onClick={handleOpenNotificationsMenu}
          >
            <Badge 
              badgeContent={3} 
              color="primary"
              className="header-notification-badge"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                }
              }}
            >
              <Bell size={20} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Notifications Menu */}
        <Menu
          className="header-menu-paper"
          sx={{ 
            mt: '45px',
            '& .MuiPaper-root': {
              borderRadius: '16px',
              boxShadow: theme.shadows[8],
              width: 320,
              p: 1,
            }
          }}
          id="notifications-menu"
          anchorEl={anchorElNotifications}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElNotifications)}
          onClose={handleCloseNotificationsMenu}
        >
          <Box sx={{ p: 2, pb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Typography variant="body2" color="text.secondary">You have 3 unread notifications</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <MenuItem sx={{ display: 'block', p: 2, borderRadius: '12px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme => alpha(theme.palette.success.main, 0.15),
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                <User size={18} color={theme.palette.success.main} />
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>New face detected</Typography>
                <Typography variant="caption" color="text.secondary">3 minutes ago</Typography>
              </Box>
            </Box>
          </MenuItem>
          <MenuItem sx={{ display: 'block', p: 2, borderRadius: '12px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme => alpha(theme.palette.warning.main, 0.15),
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                <Activity size={18} color={theme.palette.warning.main} />
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>Motion in restricted area</Typography>
                <Typography variant="caption" color="text.secondary">1 hour ago</Typography>
              </Box>
            </Box>
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ p: 1 }}>
            <MenuItem 
              onClick={handleCloseNotificationsMenu} 
              sx={{ 
                borderRadius: '8px', 
                py: 1,
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
              }}
            >
              <Typography variant="button" sx={{ width: '100%', textAlign: 'center', fontWeight: 500, color: theme => theme.palette.primary.main }}>
                View all notifications
              </Typography>
            </MenuItem>
          </Box>
        </Menu>

        {/* User profile */}
        <Box sx={{ ml: 2 }}>
          <Tooltip title="Account settings">
            <IconButton 
              onClick={handleOpenUserMenu}
              className="header-user-avatar-btn gpu-accelerated"
              sx={{
                p: 0,
              }}
            >
              <Avatar
                alt={user.name}
                src={user.avatar}
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: 'primary.dark',
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
            </IconButton>
          </Tooltip>
          
          {/* User Menu */}
          <Menu
            className="header-menu-paper"
            sx={{ 
              mt: '45px',
              '& .MuiPaper-root': {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                borderRadius: '16px',
                width: 260,
                p: 1,
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            id="user-menu"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle1" fontWeight="bold">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">{user.email}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Chip
                  icon={<Shield size={12} />}
                  label={user.role}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                    color: '#8b5cf6',
                    '& .MuiChip-icon': {
                      color: '#8b5cf6',
                    }
                  }}
                />
                <Chip
                  label={user.clearance}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    color: '#22c55e',
                  }}
                />
              </Box>
            </Box>
            <Divider />
            <MenuItem
     onClick={() => {
       handleCloseUserMenu();
       navigate('/settings');
     }}
     sx={{ borderRadius: '8px', my: 0.5 }}
   >
     <ListItemIcon>
       <Settings size={18} />
     </ListItemIcon>
     <ListItemText primary="Settings" />
   </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ borderRadius: '8px', my: 0.5 }}>
              <ListItemIcon>
                <LogOut size={18} color={theme.palette.error.main} />
              </ListItemIcon>
              <ListItemText primary="Secure Logout" primaryTypographyProps={{ color: 'error.main' }} />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;