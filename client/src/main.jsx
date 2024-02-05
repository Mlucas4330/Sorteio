import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import Tutorial from './pages/Tutorial.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/signin',
        element: <SignIn />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/tutorial',
        element: <Tutorial />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </StrictMode>
);
