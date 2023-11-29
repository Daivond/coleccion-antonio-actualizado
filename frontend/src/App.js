//Antonio David Alonso Ramos

import React from 'react'
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Informes from './components/Informes';
import Usuarios from './components/Usuarios';
import Ayuda from './components/Ayuda';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/Home',
        element: <Home />
      },
      {
        path: '/Informes',
        element: <Informes />
      },
      {
        path : '/Usuarios',
        element: <Usuarios />
      },
      {
        path : '/Ayuda',
        element: <Ayuda />
      }
    ]
  }
])

function App() {
  return(
    <RouterProvider router = {router} />
  );
}

export default App;