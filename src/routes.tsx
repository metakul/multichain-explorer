import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import ProfilePage from "./pages/ProtecTedPages/Profile/Profile";
import { ContractType, EXPLORER_PAGE, Pages, PROJECTS } from "./DataTypes/enums";
import DashboardOutlet from "./layout/DashboardLayout";
import SingleContractPage from "./pages/Projects/Blockchain/[contracts]/SingleContractInfo";
import Web3ProfilePage from "./pages/Projects/Blockchain/ProfilePage";
import ContractHomePage from "./pages/Projects/Blockchain/HomePage/HomePage";
import Dashboard from "./pages/Dashbaord";
import Explorer from "./pages/Projects/Explorer";
import Transaction from "./pages/Projects/Explorer/Transaction";
import SingleBlock from "./pages/Projects/Explorer/Block";

const Router: React.FC = () => {

  const routes = useRoutes([

    {
      path: "",
      element: <DashboardOutlet/>,
      children: [
        {
          path: Pages.HOME,
          element: <Dashboard />,
        },
        {
          path: PROJECTS.CONTRACTS_HOME,
          element: <ContractHomePage />,
        },
        {
          path: Pages.PROFILE,
          element:  <ProfilePage />,
        },
        {
          path: PROJECTS.SINGLE_CONTRACT,
          element: <SingleContractPage contractType={ContractType.Deploy} />,
        },
        {
          path: PROJECTS.DEPLOYED_CONTRACT,
          element: <SingleContractPage contractType ={ContractType.Interact}/>,
        },
        {
          path: PROJECTS.WEB3_PROFILE,
          element: <Web3ProfilePage />,
        },
        {
          path: EXPLORER_PAGE.EXPLORER_HOME,
          element: <Explorer />,
        },
        {
          path: `${EXPLORER_PAGE.Transaction}/:hash`,
          element: <Transaction />,
        },
        {
          path: `${EXPLORER_PAGE.SINGLE_BLOCK}/:block`,
          element: <SingleBlock />,
        },
      ],
    },
    { path: "*", element: <Navigate to={Pages.HOME} /> },
  ]);

  return routes;
};

export default Router;
