// App.tsx

import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import store from "./redux/store"
import { Provider } from 'react-redux';
import { WalletAuthProvider } from './contexts/WalletAuthContext';
import { RpcProvider } from './contexts/RpcProviderContext';
function App() {
  return (
    <Provider store={store}>
      <WalletAuthProvider>
        <RpcProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </RpcProvider>
      </WalletAuthProvider>
    </Provider>
  );
}

export default App;
