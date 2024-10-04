import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProtecTedPages/Profile/Profile";
import { Pages } from "./DataTypes/enums";
import DashboardOutlet from "./layout/DashboardLayout";

const Router: React.FC = () => {


  const routes = useRoutes([

    {
      path: "",
      element: <DashboardOutlet/>,
      children: [
        {
          path: Pages.HOME,
          element: <HomePage />,
        },
        {
          path: Pages.PROFILE,
          element:  <ProfilePage />,
        },
      ],
    },
    { path: "*", element: <Navigate to={Pages.HOME} /> },
  ]);

  return routes;
};

export default Router;
