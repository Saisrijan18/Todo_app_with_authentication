import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { HashRouter,Routes, Route } from "react-router-dom"
import SignUpLogin from "./Components/login"
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider store={store}>
  <React.StrictMode>
    <HashRouter>
    <Routes>
        <Route path="/" element={<SignUpLogin/>}/>
        <Route exact path="/dashboard" element={<App/>}/>
    </Routes>
    </HashRouter>
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
