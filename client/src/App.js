import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

/* import all components */

import Reset from "./components/Reset";
import Register from "./components/Register";
import Recovery from "./components/Recovery";
import Profile from "./components/Profile";
import Password from "./components/Password";
import PageNotFound from "./components/PageNotFound";
import Username from "./components/username";

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";

/** root routes */

const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute> <Password/> </ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser> <Profile/> </AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '*',                             // '*' for invalid route in application 
        element : <PageNotFound></PageNotFound>
    },
])
export default function App(){
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
} 