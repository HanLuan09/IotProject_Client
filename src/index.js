import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { AuthProvider } from "./auth-context/auth.context";
import reportWebVitals from './reportWebVitals';

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

let user = localStorage.getItem("user");
user = JSON.parse(user);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SoftUIControllerProvider>
        <AuthProvider userData={user}>
          <App />
        </AuthProvider>
      </SoftUIControllerProvider>
    </BrowserRouter>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();