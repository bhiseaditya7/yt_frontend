import { BrowserRouter, Routes as CoreRoutes, Route } from "react-router-dom";
import { RoutesInterface, routesArr } from "./index";
// import PageNotFound from "../pages/error";
// import PrivateRoute from "./privateRoutes";

export default function Routes() {
  return (
    <BrowserRouter>
      <CoreRoutes>
        {routesArr.map((route: [any, RoutesInterface], index) => {
          if (route[1].isLoginRequired) {
            return (
              <Route
                key={index}
                path={route[1].path}
                // element={<PrivateRoute showSideDrawer={route[1].showSideDrawer}>{route[1].page}</PrivateRoute>}
              />
            );
          }
          return <Route key={index} path={route[1].path} element={route[1].page} />;
        })}
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </CoreRoutes>
    </BrowserRouter>
  );
}
