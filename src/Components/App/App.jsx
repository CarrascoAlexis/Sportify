import './App.css'
import React from 'react';
import Root from '../Root/Root';
import ErrorPage from '../../Pages/Error/Error';

import {
    createBrowserRouter,
    RouterProvider,
    
} from "react-router-dom";
export default function App()
{
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Root/>,
          errorElement: <ErrorPage/>,
          children: [
            {
                path: "/test",
                element: <p>TEST SALE PUTE</p>
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