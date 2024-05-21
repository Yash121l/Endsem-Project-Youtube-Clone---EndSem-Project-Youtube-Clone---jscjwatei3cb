import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Nav from "./Pages/Nav";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { useState } from "react";
import Details from "./Pages/Details";


function App() {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonPath, setButtonPath] = useState('');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Str buttonText={buttonText} buttonPath={buttonPath}/>,
      children: [
        {
          path: '/',
          element: <Navigate replace to="/home"/>
        },
        {
          path: '/home',
          element: <Home setButtonText={setButtonText} setButtonPath={setButtonPath} login={login} user={user}/>
        },
        {
          path: '/home/:id',
          element: login ? <Details token={token} setButtonText={setButtonText} setButtonPath={setButtonPath} user={user}/> : <Navigate replace to="/signin"/>
        },
        {
          path: '/signin',
          element: <Signin setButtonText={setButtonText} setButtonPath={setButtonPath} setLogin={setLogin} setToken={setToken} setUser={setUser}/>
        },
        {
          path: '/signup',
          element: <Signup setButtonText={setButtonText} setButtonPath={setButtonPath} setLogin={setLogin} setToken={setToken} setUser={setUser}/>
        }
      ]
    }
  ])
  function Str({buttonText, buttonPath}) {
    return (
      <>
        <header className="fixed w-full"><Nav buttonText={buttonText} buttonPath={buttonPath}/></header>
        <main><Outlet/></main>
      </>
    )
  }

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
