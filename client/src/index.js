import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseConfig } from './data/firebaseConfig';

import './css/styles.css';

//Components
import Header from './components/header';

//Auth Pages
import Auth from './pages/authentication/auth.js';
import Login from './pages/authentication/login.js';
import CreateAccount from './pages/authentication/create-account.js';
import ResetPassword from './pages/authentication/reset-password';

//Main Pages
import Home from './pages/main/home';
import CreateChat from './pages/main/create-chat';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth/>,
  },
  {
    path: "/login",
    element: <Login auth={auth}/>,
  },
  {
    path: "/create-account",
    element: <CreateAccount auth={auth}/>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword auth={auth}/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/create-chat",
    element: <CreateChat/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header auth={auth}/>
    <RouterProvider router={router} />
  </React.StrictMode>
);

//checks if user is logged in or not
onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
    if (window.location.pathname != "/" && window.location.pathname != "/login" && window.location.pathname != "/create-account" && window.location.pathname != "/reset-password") {
      window.location.href = "/";
    }
  }
});
