import React from 'react';
import ReactDOM from 'react-dom';
import './signin.css';
import './userPannel.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL
// axios.defaults.baseURL = "https://trading-calc-api.herokuapp.com/api/v1"
const store = configureStore();

window.store = store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));

serviceWorker.unregister()