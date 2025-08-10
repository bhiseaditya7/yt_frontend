import React from "react";
import { Box, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { Feature } from "../Login";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLightMode = theme.palette.mode === "light";
  const FeatureIcon = feature.icon;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        bgcolor: isLightMode
          ? "rgba(255, 255, 255, 0.85)"
          : "rgba(15, 19, 25, 0.85)",
        border: isLightMode
          ? "1px solid rgba(0, 0, 0, 0.1)"
          : "1px solid rgba(75, 85, 99, 1)",
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "rgba(147, 51, 234, 0.3)",
          backgroundColor: isLightMode
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(15, 19, 25, 0.95)",
          boxShadow: isLightMode ? "0 4px 12px rgba(0, 0, 0, 0.05)" : "none",
          cursor: "pointer",
          transform: "translateY(-2px)",
          "& .arrow-icon": {
            opacity: 1,
            transform: "translateX(4px)",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            width: { xs: 32, sm: 40 },
            height: { xs: 32, sm: 40 },
            borderRadius: 2,
            bgcolor: "rgba(147, 51, 234, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            flexShrink: 0,
            "&::after": {
              content: '""',
              position: "absolute",
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: "rgba(147, 51, 234, 0.5)",
              top: -2,
              right: -2,
            },
          }}
        >
          <FeatureIcon
            size={isMobile ? 16 : 20}
            color={theme.palette.primary.main}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant={isMobile ? "subtitle2" : "subtitle1"}
            fontWeight="medium"
            gutterBottom
            color="text.primary"
          >
            {feature.title}
          </Typography>
          <Typography
            variant={isMobile ? "caption" : "body2"}
            color="text.secondary"
          >
            {feature.description}
          </Typography>
        </Box>
        <ArrowRight
          size={isMobile ? 16 : 20}
          className="arrow-icon"
          style={{
            color: theme.palette.primary.main,
            opacity: 0,
            transition: "all 0.2s ease-in-out",
          }}
        />
      </Box>
    </Paper>
  );
};

export default FeatureCard;