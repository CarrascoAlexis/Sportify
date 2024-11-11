import './App.css'
import React from 'react';
import Root from '../Root/Root';
import ErrorPage from '../../Pages/Error/Error';

import {
    createBrowserRouter,
    RouterProvider,
    
} from "react-router-dom";
import Admin from '../../Pages/Admin/Admin';
import Events from '../../Pages/Events/Events';
import User from '../../Pages/User/User';
import Connexion from '../../Pages/Connexion/Connexion';
import Contact from '../../Pages/Contact/Contact';
export default function App()
{
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Root/>,
          errorElement: <Root error={<ErrorPage/>}/>,
          children: [
            {
                path: "/",
                element: <p>Page d'accueil</p>
            },
            {
                path: "/admin",
                element: <Admin/>
            },
            {
                path: "/events",
                element: <Events/>
            },
            {
                path: "/compte",
                element: <User/>
            },
            {
                path: "/connexion",
                element: <Connexion/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },

          ]
        }
    ]);
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}