import { Box, Switch, Tooltip, Paper } from "@mui/material";
import { setThemeMode } from "../store/theme/themeSlice";
import { ThemeVariantsProps } from "../theme";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Sun, Moon } from 'lucide-react';
export interface BaseLayoutProps {
    children?: React.ReactNode;
}

export default function OptimizedBaseLayout({ children }: BaseLayoutProps) {
    const dispatch = useAppDispatch();
    const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
    const { themeMode } = useAppSelector((state) => state.theme);
    const isDarkTheme = themeMode === ThemeVariantsProps.dark;

    return (
        <>
            {isLoading && <div>Loading...</div>}
            <Box 
                className={`base-layout-background gpu-accelerated ${isDarkTheme ? 'dark' : 'light'}`}
                sx={{ 
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: theme => theme.palette.background.default,
                    position: 'relative',
                }}
            >
                {!isAuthenticated && (
                    <Paper
                        elevation={0}
                        className="theme-toggle-panel gpu-accelerated"
                        sx={{
                            position: "absolute",
                            right: "20px",
                            top: "20px",
                            zIndex: 10,
                            borderRadius: '12px',
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        {/* <Box
                            className={`theme-sun-icon gpu-accelerated ${!isDarkTheme ? 'active' : ''}`}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 28,
                                height: 28,
                            }}
                        >
                            <Sun size={16} />
                        </Box> */}
                        {/* <Tooltip title={isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                            <Switch
                                name="theme"
                                size="small"
                                sx={{
                                    '& .MuiSwitch-switchBase': {
                                        color: '#f59e0b',
                                        '&.Mui-checked': {
                                            color: '#7e3af2',
                                        },
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: '#7e3af2',
                                    },
                                    '& .MuiSwitch-track': {
                                        backgroundColor: '#f59e0b',
                                        opacity: 0.5,
                                    },
                                }}
                                onChange={() => {
                                    dispatch(setThemeMode(isDarkTheme ? ThemeVariantsProps.light : ThemeVariantsProps.dark));
                                }}
                                checked={isDarkTheme}
                            />
                        </Tooltip> */}
                        {/* <Box
                            className={`theme-moon-icon gpu-accelerated ${isDarkTheme ? 'active' : ''}`}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 28,
                                height: 28,
                            }}
                        >
                            <Moon size={16} />
                        </Box> */}
                    </Paper>
                )}
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {children}
                </Box>
                <div className="animated-border" />
            </Box>
        </>
    );
}