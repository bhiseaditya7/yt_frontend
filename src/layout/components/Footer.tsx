import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  alpha,
  Grid,
  Link as MuiLink,
  IconButton,
} from '@mui/material';
import { Github, Twitter, Linkedin, Instagram, Shield, Zap } from 'lucide-react';
import '../../css/animations.css';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { text: 'Privacy Policy', href: '#' },
    { text: 'Terms of Service', href: '#' },
    { text: 'Documentation', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <Box
      component="footer"
      className="footer-container gpu-accelerated"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid',
        borderColor: alpha('#8b5cf6', 0.2),
        position: 'relative',
        overflow: 'hidden',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3} alignItems="center">
          {/* Logo and Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                className="footer-logo-container gpu-accelerated"
                sx={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  background: `linear-gradient(135deg, ${alpha('#7e3af2', 0.2)} 0%, ${alpha('#a78bfa', 0.1)} 100%)`,
                  border: '1px solid',
                  borderColor: alpha('#8b5cf6', 0.3),
                  mr: 1.5,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px',
                    background: alpha('#8b5cf6', 0.1),
                    filter: 'blur(8px)',
                    zIndex: -1,
                  }
                }}
              >
                <Shield size={20} color="#8b5cf6" />
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    backgroundImage: 'linear-gradient(90deg, #7e3af2, #a78bfa)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  new Platform
                  <Zap size={14} color="#22c55e" />
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  © {currentYear} All rights reserved
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Links */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'center' },
              }}
            >
              {footerLinks.map((link) => (
                <MuiLink
                  key={link.text}
                  href={link.href}
                  className="footer-link gpu-accelerated"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    position: 'relative',
                  }}
                >
                  {link.text}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: { xs: 'center', md: 'flex-end' },
              }}
            >
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  size="small"
                  className="footer-social-btn gpu-accelerated"
                  sx={{
                    color: 'text.secondary',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  }}
                >
                  <social.icon size={18} />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Status Bar */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.1),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              className="footer-status-dot gpu-accelerated"
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#22c55e',
              }}
            />
            System Status: Operational
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Version 2.0.1 | Build #{currentYear}.05.24
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;