import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  alpha,
  Grid,
  Link as MuiLink,
  IconButton
} from '@mui/material';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { text: 'Privacy Policy', href: '#' },
    { text: 'Terms of Service', href: '#' },
    { text: 'Documentation', href: '#' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.1),
        transition: theme => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  mr: 1.5
                }}
              >
                <img
                  src="/.png"
                  alt=" Logo"
                  style={{ height: 20, width: 20 }}
                />
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  backgroundImage: 'linear-gradient(90deg, #7e3af2, #a78bfa)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                new Labs NEw Platform
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              © {currentYear} new Labs NEw Platform
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {footerLinks.map((link) => (
              <Typography key={link.text} variant="body2" color="text.secondary">
                <MuiLink
                  href={link.href}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                    },
                  }}
                >
                  {link.text}
                </MuiLink>
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;