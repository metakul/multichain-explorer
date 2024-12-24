// App.tsx

import { BrowserRouter, useLocation, useParams } from 'react-router-dom';
import Router from './routes';
import store from "./redux/store"
import { Provider } from 'react-redux';
import { RpcProvider } from './contexts/RpcProviderContext';
import { networks, NetworkType } from './DataTypes/enums';

const AppWrapper = () => {
  const params= useParams<{ networkName: NetworkType }>() || {};
  const myparams= useParams();
  const location =useLocation()
  console.log(myparams, location);

  const { networkName } = params;
  const resolvedNetworkName = networkName || "Amoy";
  const rpcUrl = networks[resolvedNetworkName]?.rpcUrls?.[0] || networks["Amoy"].rpcUrls[0];

  console.log(`Current Network: ${networkName}`);

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