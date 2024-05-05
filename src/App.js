import "./index.css";
import * as React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Details from "./Pages/Details";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLogin, setLogIn] = React.useState(false);
  const [token, setToken] = React.useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate replace to="/home"/>
    },
    {
      path: "/signup/",
      element: <Signup/>
    },
    {
      path: "/signin/",
      element: <Signin setLogIn={setLogIn} setToken={setToken}/> 
    },
    {
      path: "/home/",
      element: <Home/>
    },
    {
      path: "/home/:id",
      element: isLogin ? <Details token={token}/> : <Navigate replace to="/signin"/> // Redirect to Signin if not logged in else to details page
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;

