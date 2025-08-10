import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import React from "react";

import { ThemeVariantsProps, getTheme } from "../theme/index";
import { useAppSelector } from "../store/hooks";

export interface ThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // const [mode, setMode] = React.useState<ThemeVariantsProps>(ThemeVariantsProps.dark);
  // const themeMode:any = "dark";
  const themeMode: ThemeVariantsProps = useAppSelector((state) => state.theme.themeMode);

  const activeTheme = React.useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <MuiThemeProvider theme={activeTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;