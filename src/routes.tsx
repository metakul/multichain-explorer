import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProtecTedPages/Profile/Profile";
import { Pages } from "./DataTypes/enums";
import DashboardOutlet from "./layout/DashboardLayout";
import SingleContractPage from "./pages/Projects/Blockchain/[contract]/SingleContractInfo";
import Web3ProfilePage from "./pages/ProfilePage";

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
        {
          path: Pages.SINGLE_CONTRACT,
          element: <SingleContractPage />,
        },
        {
          path: Pages.WEB3_PROFILE,
          element: <Web3ProfilePage />,
        },
      ],
    },
    { path: "*", element: <Navigate to={Pages.HOME} /> },
  ]);

  return routes;
};

export default Router;
