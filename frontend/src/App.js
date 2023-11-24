//Antonio David Alonso Ramos

import React from 'react'
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Informes from './components/Informes';
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