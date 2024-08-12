import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import './index.css';
import App from './App';
import { RoleProvider } from './components/context/RoleContext'; // Ensure named import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RoleProvider> {/* Wrap the entire app with RoleProvider */}
        <App />
      </RoleProvider>
    </Provider>
  </React.StrictMode>,
);
