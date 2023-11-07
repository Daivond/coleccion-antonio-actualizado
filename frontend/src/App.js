//Antonio David Alonso Ramos

import React from 'react'
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
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
        path: 'home',
        element: <Home />
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