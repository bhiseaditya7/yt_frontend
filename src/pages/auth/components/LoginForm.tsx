import React, { useState } from "react"; 
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  IconButton,
  Stack,
  Alert,
  InputAdornment,
  useTheme,
  useMediaQuery,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { Mail, Lock, Eye, EyeOff, Scan } from "lucide-react";
import { FormErrors, LoginFormData } from "../Login";
import { useStaticPicker } from "@mui/x-date-pickers/internals";
import RegisterForm from "./RegisterForm";

interface LoginFormProps {
  formData: LoginFormData;
  errors: FormErrors;
  formError: string;
  isLoading: boolean;
  showPassword: boolean;
  onTogglePassword: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  errors,
  formError,
  isLoading,
  showPassword,
  onTogglePassword,
  onChange,
  onSubmit,
  onToggleForm,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const handleForgotOpen = () => {
    setForgotOpen(true);
    setForgotEmail("");
    setForgotError("");
    setForgotSuccess("");
  };
  // Close dialog
  const handleForgotClose = () => setForgotOpen(false);

const handleForgotEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotEmail(e.target.value);
    setForgotError("");
    setForgotSuccess("");
  };

   // Submit email for password reset
  const handleForgotSubmit = async () => {
    if (!forgotEmail) {
      setForgotError("Please enter your email address.");
      return;
    }
     // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(forgotEmail)) {
    setForgotError("Please enter a valid email address.");
    return;
  }
    try {
      const res = await fetch("http://localhost:8500/auth/accounts/password-reset/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setForgotSuccess("If your email exists, a reset link has been sent.");
      } else {
        setForgotError(data?.error || "No account found with this email.");
      }
    } catch {
      setForgotError("Could not send reset email. Try again.");
    }
  };
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
        minHeight: { xs: "100vh", md: "auto" },
        position: "relative",
        bgcolor: theme.palette.background.default,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, rgba(147,51,234,0) 0%, rgba(147,51,234,0.2) 50%, rgba(147,51,234,0) 100%)",
        },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 4 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{ width: "100%", maxWidth: { xs: "100%", sm: 420 }, mx: "auto" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: { xs: 4, md: 6 },
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <IconButton
              sx={{
                bgcolor: theme.palette.primary.main,
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                borderRadius: 2,
                "&:hover": { bgcolor: theme.palette.primary.dark },
              }}
            >
              <Scan size={isMobile ? 20 : 24} color="white" />
            </IconButton>
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}
              >
                new
              </Typography>
              <Typography variant="body2" color="text.secondary">
                new
              </Typography>
            </Box>
          </Box>

          {/* {formError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {formError}
            </Alert>
          )} */}

          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{
              color: theme.palette.text.primary,
              fontWeight: "bold",
              mb: 1,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Welcome back
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mb: 4, textAlign: { xs: "center", sm: "left" } }}
          >
            Sign in to access face recognition tools and analytics
          </Typography>

          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
              mt: { xs: 3, sm: 4 },
              "& .MuiTextField-root": { mb: { xs: 2, sm: 3 } },
            }}
          >
            <TextField
              fullWidth
              label="Email Address"
              name="username"
              value={formData.username}
              onChange={onChange}
              error={!!errors.username}
              helperText={errors.username}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <Box component="span" sx={{ mr: 2, display: "flex" }}>
                    <Mail color={theme.palette.text.secondary} size={20} />
                  </Box>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={onChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <Box component="span" sx={{ mr: 2, display: "flex" }}>
                    <Lock color={theme.palette.text.secondary} size={20} />
                  </Box>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={onTogglePassword}
                      edge="end"
                      size="small"
                      sx={{ color: "text.secondary" }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
                gap: { xs: 1, sm: 0 },
                my: { xs: 2, sm: 3 },
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={onChange}
                    size={isMobile ? "small" : "medium"}
                  />
                }
                label={
                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: isMobile ? 14 : 16,
                    }}
                  >
                    Remember me
                  </Typography>
                }
              />
              
                 <Link
                  href="#"
                  color="primary"
                  underline="hover"
                  sx={{
                    textAlign: { xs: "center", sm: "right" },
                    fontSize: isMobile ? 14 : 16,
                  }}
                  onClick={e => {
                    e.preventDefault();
                    handleForgotOpen();
                  }}
                >
                  Forgot password?
                </Link>
            </Box>
            <Stack spacing={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size={isMobile ? "medium" : "large"}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </Stack>
            <Typography
              align="center"
              color="text.secondary"
              sx={{ mt: { xs: 3, sm: 4 }, fontSize: isMobile ? 14 : 16 }}
            >
              Don't have an account? <Button color="primary" onClick={onToggleForm}>Create one</Button>
            </Typography>
          </Box>
        </Box>
      </Container>
      {/* Forgot Password Dialog */}
            <Dialog open={forgotOpen} onClose={handleForgotClose}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Enter your email address to receive a password reset link.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={forgotEmail}
            onChange={handleForgotEmailChange}
            error={!!forgotError}
            helperText={forgotError}
          />
          {forgotSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {forgotSuccess}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotClose}>Cancel</Button>
          <Button onClick={handleForgotSubmit} variant="contained">
            Send Reset Link
          </Button>
        </DialogActions>
      </Dialog>
      
    </Box>
  );
};

export default LoginForm;
