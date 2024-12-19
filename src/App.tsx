// App.tsx

import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import store from "./redux/store"
import { Provider } from 'react-redux';
import { RpcProvider } from './contexts/RpcProviderContext';
function App() {
  return (
    <Provider store={store}>
        <RpcProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </RpcProvider>
    </Provider>
  );
}

export default App;