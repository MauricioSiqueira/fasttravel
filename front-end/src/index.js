import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Pages/Login/index.js';
import Globals from './styles/globals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Globals />
    <Login />
  </React.StrictMode>
);

