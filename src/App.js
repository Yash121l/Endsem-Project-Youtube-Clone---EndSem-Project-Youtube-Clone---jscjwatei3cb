import "./index.css";
import * as React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Details from "./Pages/Details";
import 'bootstrap/dist/css/bootstrap.min.css';


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
    element: <Signin/>
  },
  {
    path: "/home/",
    element: <Home/>
  },
  {
    path: "/home/:id",
    element: <Details/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;