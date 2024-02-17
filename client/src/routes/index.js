import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Home, SignIn, SignUp, Tutorial, ChangePassword, ForgotPassword, ResetPassword } from '../pages'

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
    },
    {
        path: '/change-password',
        element: <ChangePassword />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    },
    {
        path: '/reset-password/:token?',
        element: <ResetPassword />
    }
])

export default router