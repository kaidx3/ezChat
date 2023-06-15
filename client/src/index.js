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
import Conversation from './pages/main/conversation';
import Account from './pages/main/account';

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
    element: <Home auth={auth}/>,
  },
  {
    path: "/create-chat",
    element: <CreateChat auth={auth}/>,
  },
  {
    path: "/conversation",
    element: <Conversation auth={auth}/>
  },
  {
    path: "/account",
    element: <Account auth={auth}/>
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
    if (window.location.pathname == "/" || window.location.pathname == "/login" || window.location.pathname == "/create-account") {
      window.location.href = "/home";
    }
  } else {
    if (window.location.pathname != "/" && window.location.pathname != "/login" && window.location.pathname != "/create-account" && window.location.pathname != "/reset-password") {
      window.location.href = "/";
    }
  }
});
