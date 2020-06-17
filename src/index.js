import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './chart.css';
import './signin.css';
import './userPannel.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000/api/v1";
// axios.defaults.baseURL = "https://trading-calc-api.herokuapp.com/api/v1";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));

serviceWorker.unregister();