import React from 'react';
import Login from '../pages/auth/Login';
import { HomeMaxOutlined, LoginOutlined } from '@mui/icons-material';
import Home1 from '../home';
// import Home1 from '../home';
// import Register from '../pages/register/Register';

export interface HeaderIconProps {
    profile?: boolean;
}

export interface RoutesInterface {
    path: string;
    title: string;
    icon: React.ReactNode | null;
    isLoginRequired: boolean;
    page: React.ReactNode;
    isHiddenOnSideDrawer: boolean;
    isAdditional: boolean;
    showSideDrawer?: boolean;

}

export const routes: Record<string, RoutesInterface> = {
    login: {
        path: "/",
        title: "login",
        icon: <LoginOutlined />,
        isLoginRequired: false,
        page: <Login />,
        isAdditional: false,
        isHiddenOnSideDrawer: true,
    },
    home: {
        path: "/home",
        title: "Home",
        icon: <HomeMaxOutlined />,
        isLoginRequired: false,
        page: <Home1/>, // Temporarily using Login as placeholder
        isAdditional: false,
        isHiddenOnSideDrawer: true,
    },
    
    // stats: {
    //     path: "/stats",
    //     title: "Stats",
    //     icon: <BarChartIcon />,
    //     isLoginRequired: true,
    //     page: <Stats />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: false,
    // },
    // register: {
    //     path: "/register",
    //     title: "registration",
    //     icon: <AppRegistrationOutlinedIcon />,
    //     isLoginRequired: false,
    //     page: <Register />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
};

export const routesArr: [string, RoutesInterface][] = Object.entries(routes);

export default routes 