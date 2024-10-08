import { getAsyncAuth, store } from './store';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/app';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(getAsyncAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <App />
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
);
