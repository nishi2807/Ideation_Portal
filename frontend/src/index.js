import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const userNameFromLocalStorage = localStorage.getItem("userName");
const userRoleFromLocalStorage = localStorage.getItem("userRole");

// If the user name exists in local storage, dispatch the action to set it in the store
if (userNameFromLocalStorage) {
  store.dispatch({ type: "SET_CURRENT_USER_NAME", payload: userNameFromLocalStorage });
}

// If the user role exists in local storage, dispatch the action to set it in the store
if (userRoleFromLocalStorage) {
  store.dispatch({ type: "SET_CURRENT_USER_ROLE", payload: userRoleFromLocalStorage });
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
