import React from 'react';
import ReactDOM from 'react-dom/client';
import 'draft-js/dist/Draft.css';
import './styles/index.css';
import './styles/Home.css';
import "./styles/Tools.css"
import "./styles/Profile.css"
import "./styles/Friends.css"
import "./styles/Map.css"
import App from './App';
import { Provider } from 'react-redux/es/exports';
import store from './store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
