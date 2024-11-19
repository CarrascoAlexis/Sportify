import React, { useEffect } from 'react';
import Root from '../Root/Root';
import ErrorPage from '../../Pages/Error/Error';
import '../../Stylesheets/Main.css'
import '../../Stylesheets/simple-grid.min.css'

import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    
} from "react-router-dom";
import Admin from '../../Pages/Admin/Admin';
import Events from '../../Pages/Events/Events';
import User from '../../Pages/User/User';
import Connexion from '../../Pages/User/Connexion';
import Contact from '../../Pages/Contact/Contact';
import AuthProvider from './AuthProvider';
import ProtectedPage from '../ProtectedPage/ProtectedPage';
import EventDetails from '../../Pages/Events/EventDetails/EventDetails';
import EventsCreate from '../../Pages/Events/EventsCreate';
import UsersPanel from '../../Pages/Admin/UsersPanel';
import EventsPanel from '../../Pages/Admin/EventsPanel';
import UserCreation from '../../Pages/Admin/UserCreation';
import CreateAccount from '../../Pages/User/CreateAccount';

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
                path: "/compte/connexion",
                element: <Connexion/>
            },
            {
                path: "/compte/creation",
                element: <CreateAccount/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/admin",
                element: <Outlet/>,
                children:[
                    {
                        index: true,
                        element: <Admin/>
                    },
                    {
                        path:"/admin/users",
                        element:<Admin><UsersPanel/></Admin>
                    },
                    {
                        path:"/admin/users/create",
                        element:<Admin><UserCreation/></Admin>
                    },
                    {
                        path:"/admin/events",
                        element:<Admin><EventsPanel/></Admin>
                    }
                ]
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