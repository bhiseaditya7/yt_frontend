import { createTheme, Theme } from '@mui/material/styles';

export enum ThemeVariantsProps {
  light = 'light',
  dark = 'dark',
}

export const getTheme = (mode: ThemeVariantsProps): Theme => {
  return createTheme({
    palette: {
      mode: mode as 'light' | 'dark',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });
}; 