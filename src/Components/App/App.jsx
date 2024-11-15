import './App.css'
import React, { useEffect } from 'react';
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
import AuthProvider from '../AuthProvider/AuthProvider';
import ProtectedPage from '../ProtectedPage/ProtectedPage';
import EventDetails from '../../Pages/EventDetails/EventDetails';
import EventsCreate from '../../Pages/EventsCreate/EventsCreate';

export default function App()
{
    const elem = 
        <AuthProvider>
            <Root/>
        </AuthProvider>

    const router = createBrowserRouter([
        {
          path: "/",
          element: elem,
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
                path: "/events/:title",
                element: <EventDetails/>
            },
            {
                path: "/events/create",
                element: <ProtectedPage><EventsCreate/></ProtectedPage>
            },
            {
                path: "/compte",
                element: <ProtectedPage><User/></ProtectedPage>
            },
            {
                path: "/connexion",
                element: <Connexion/>
            },
            {
                path: "/contact",
                element: <Contact/>
            }

          ]
        }
    ]);
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}