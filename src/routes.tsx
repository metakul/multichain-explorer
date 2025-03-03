import React from "react";
import { useRoutes } from "react-router-dom";
// import ProfilePage from "./pages/ProtecTedPages/Profile/Profile";
import { ContractType, EXPLORER_PAGE, Pages, PROJECTS } from "./DataTypes/enums";
import DashboardOutlet from "./layout/layout";
import SingleContractPage from "./pages/Projects/Blockchain/[contracts]/SingleContractInfo";
import Web3ProfilePage from "./pages/Projects/Blockchain/ProfilePage";
import ContractHomePage from "./pages/Projects/Blockchain/HomePage/HomePage";
import Dashboard from "./pages/Dashbaord";
import Explorer from "./pages/Projects/Explorer";
import Transaction from "./pages/Projects/Explorer/Transaction";
import SingleBlock from "./pages/Projects/Explorer/Block";
import AddressInfo from "./pages/Projects/Explorer/Address";
import AllBLocks from "./pages/Projects/Explorer/AllBlocks";
import SwaggerDocumentation from "./pages/Projects/Swagger";
import TransactionPage from "./pages/Projects/Explorer/Transaction";

interface RouterProps {
  networkName: string;
}

const Router: React.FC<RouterProps> = () => {
  const routes = useRoutes([
    {
      path: "",
      element: <DashboardOutlet />,
      children: [
        // Default route to show Dashboard or any home content
        {
          path: "",
          element: <Dashboard />, // Replace this with your intended home page component
        },
        {
          path: `${Pages.HOME}/:networkName`,
          element: <Dashboard />,
        },
        {
          path: `${PROJECTS.CONTRACTS_HOME}/:networkName`,
          element: <ContractHomePage />,
        },
        // {
        //   path: `${Pages.PROFILE}/:networkName`,
        //   element: <ProfilePage />,
        // },
        {
          path: `${PROJECTS.SINGLE_CONTRACT}/:networkName`,
          element: <SingleContractPage contractType={ContractType.Deploy} />,
        },
        {
          path: `${PROJECTS.DEPLOYED_CONTRACT}/:networkName`,
          element: <SingleContractPage contractType={ContractType.Interact} />,
        },
        {
          path: `${PROJECTS.WEB3_PROFILE}/:networkName`,
          element: <Web3ProfilePage />,
        },
        {
          path: `${EXPLORER_PAGE.EXPLORER_HOME}/:networkName`,
          element: <Explorer />,
        },
        {
          path: `${EXPLORER_PAGE.SINGLE_TRANSACTIONS}/:hash/:networkName`,
          element: <Transaction />,
        },
        {
          path: `${EXPLORER_PAGE.SINGLE_BLOCK}/:block/:networkName`,
          element: <SingleBlock />,
        },
        {
          path: `${EXPLORER_PAGE.SINGLE_ADDRESS}/:address/:networkName`,
          element: <AddressInfo />,
        },
        {
          path: `${Pages.BLOCKS}/:networkName`,
          element: <AllBLocks />,
        },
        {
          path: `${Pages.TRANSACTIONS}/:networkName`,
          element: <TransactionPage />,
        },
        {
          path: `${Pages.API}`,
          element: <SwaggerDocumentation />,
        },
      ],
    },
  ]);

  return routes;
};

export default Router;
