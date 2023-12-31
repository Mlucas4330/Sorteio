import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'

export const URL = import.meta.env.VITE_API_URL

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/signin',
        element: <SignIn />
    },
    {
        path: 'signup',
        element: <SignUp />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </StrictMode>
)
