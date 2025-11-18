import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import "./style/main.css"

import { store } from './redux/store';
import { Provider } from 'react-redux'

import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader before the bootstrapModule/bootstrapApplication call.
defineCustomElements(window);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
  <Provider store={store} >
    <App />
  </Provider>
  </React.StrictMode>
);
