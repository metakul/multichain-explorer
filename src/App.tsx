import { BrowserRouter, useLocation } from 'react-router-dom';
import Router from './routes';
import store from './redux/store';
import { Provider } from 'react-redux';
import { RpcProvider } from './contexts/RpcProviderContext';
import { networks, NetworkType } from './DataTypes/enums';
import { analytics } from './services/fireBase';

const AppWrapper = () => {
  const location = useLocation();

  // Extract the last part of the pathname
  const resolvedNetworkName =
    (location.pathname.split('/').filter(Boolean).pop() as NetworkType) || 'Amoy';

  // Get the RPC URL for the resolved network name
  const rpcUrl = networks[resolvedNetworkName]?.rpcUrls?.[0] || networks['Amoy'].rpcUrls[0];
 console.log("analytics",analytics)
  console.log(`Current Network: ${resolvedNetworkName}`);

  return (
    <RpcProvider initialNetworkType={resolvedNetworkName} initialRpcUrl={rpcUrl}>
      <Router networkName={resolvedNetworkName} />
    </RpcProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
