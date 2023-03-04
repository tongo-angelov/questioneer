import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppContextProvider } from './context/AppContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
);
