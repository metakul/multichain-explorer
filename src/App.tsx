// App.tsx

import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import store from "./redux/store"
import { Provider } from 'react-redux';
import { WalletAuthProvider } from './contexts/WalletAuthContext';
function App() {
  return (
    <Provider store={store}>
      <WalletAuthProvider>

        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </WalletAuthProvider>
    </Provider>
  );
}

export default App;
