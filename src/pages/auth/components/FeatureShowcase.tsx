import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Feature } from "../Login";
import FeatureCard from "./FeatureCard";

interface FeatureShowcaseProps {
  features: Feature[];
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ features }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLightMode = theme.palette.mode === "light";

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
        bgcolor: theme.palette.background.paper,
        display: { xs: isMobile ? "none" : "flex", md: "flex" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: isLightMode ? 0.7 : 0.8,
          pointerEvents: "none",
          backgroundImage: isLightMode
            ? 'url("/back1.jpg")'
            : 'url("/login-bg-img.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(0px)",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: isLightMode
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(15, 19, 25, 0.5)",
            zIndex: 1,
          },
        }}
      />
      <Container
        maxWidth="sm"
        sx={{
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 4 },
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            gutterBottom
            color="text.primary"
          >
            new Platform
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            color="text.primary"
            sx={{ fontSize: 18, fontWeight: "bold" }}
          >
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Box>
        <Stack spacing={{ xs: 2, md: 3 }}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default FeatureShowcase;