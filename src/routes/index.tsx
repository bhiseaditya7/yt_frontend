import React from 'react';
import Login from '../pages/auth/Login';
import { HomeMaxOutlined, LoginOutlined } from '@mui/icons-material';
import Home1 from '../home';
// import Home from '../pages/home';
// import Devices from '../pages/devices';
// import Location from '../pages/locations';
// import Archives from '../pages/archives/events';
// import AddCamera from '../pages/devices/components/AddCamera';
// import BuildingDetails from '../pages/locations/buildings/BuildingDetails';
// import Users from '../pages/users';
// import Settings from '../pages/users/Settings';
// import AddPerson from '../pages/users/components/PersonDetail';
// // import PersonDetails from '../pages/users/components/PersonDetail';

// import BucketSpecificCamera from '../pages/bucket/BucketSpecificCamera';
// import SpecificAlert from '../pages/specificAlerts';
// import CameraDetails from '../pages/devices/device';
// import PersonDetails from '../pages/users/personDetails';
// import Building from '../pages/locations/buildings';
// import CameraForm from '../pages/devices/CameraForm';
// import EditCamera from '../pages/devices/components/EditCamera';
// import CameraControls from '../pages/devices/components/CameraControls';
// import NewPTZ from '../pages/devices/components/NewPTZ';
// import Stats from '../pages/stats';
import BarChartIcon from '@mui/icons-material/BarChart';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
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
    // home: {
    //     path: "/home",
    //     title: "Home",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     page: <Home />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
    // devices: {
    //     path: "/devices",
    //     title: "Home",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     page: <Devices />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
    // addDevice: {
    //     path: "/devices/add",
    //     title: "Home",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     // page: <CameraForm mode='add' />,
    //     page:<AddCamera/>,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
    // specificDeviceDetail: {
    //     path: "/device/:deviceId",
    //     title: "Device Details",
    //     icon: null,
    //     isLoginRequired: true,
    //     isHiddenOnSideDrawer: true,
    //     isAdditional: false,
    //     // page: <CameraForm mode='edit' />,
    //     page:<EditCamera/>,
    //   },
    //   CameraControls: {
    //     path: "/camera-controls/:id",
    //     title: "Camera Control",
    //     icon: null,
    //     isLoginRequired: true,
    //     isHiddenOnSideDrawer: false,
    //     isAdditional: false,
    //     // page: <CameraForm mode='edit' />,
    //     page:<NewPTZ camera={undefined}/>,
    //   },
    // location: {
    //     path: "/locations",
    //     title: "Home",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     page: <Location />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
    // locationDetails: {
    //     path: "/locations/:id",
    //     title: "Home",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     page: <Building />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
    // building: {
    //     path: "/location/building/:id",
    //     title: "Building",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     page: <BuildingDetails />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
    // archives: {
    //     path: "/archives",
    //     title: "Home",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     page: <Archives />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
    // bucket: {
    //     path: "/bucket",
    //     title: "Bucket",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     page: <BucketSpecificCamera />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
    // users: {
    //     path: "/persons",
    //     title: "Persons",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     page: <Users />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
    // settings: {
    //     path: "/settings",
    //     title: "Settings",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     page: <Settings />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
    // personDetails: {
    //     path: "/person/:id",
    //     title: "Person Details",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     page: <PersonDetails />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
    // cameraBucket: {
    //     path: "/bucket/camera/:id",
    //     title: "Bucket Camera Detail",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     page: <BucketSpecificCamera />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
    // specificAlert: {
    //     path: "/specific-alert/:id",
    //     title: "Bucket Camera Detail",
    //     icon: <HomeMaxOutlined />,
    //     isLoginRequired: true,
    //     page: <SpecificAlert />,
    //     isAdditional: false,
    //     isHiddenOnSideDrawer: true,
    // },
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