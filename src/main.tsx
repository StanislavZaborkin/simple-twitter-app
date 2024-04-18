import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './App';

import { store } from './redux/store';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
);
