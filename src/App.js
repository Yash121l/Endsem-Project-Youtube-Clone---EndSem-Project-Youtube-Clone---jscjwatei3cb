import "./index.css";
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthForm from "./Pages/Auth";
import Home from "./Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthForm/>,
  },
  {
    path: "/homepage",
    element: <Home/>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
