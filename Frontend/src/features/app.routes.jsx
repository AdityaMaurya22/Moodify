import { createBrowserRouter } from "react-router";
import Register from "./auth/pages/Register";
import Login from "./auth/pages/Login";
import Protected from "./auth/components/Protected";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected> <h1>home</h1> </Protected>
    },
    {
        path: "register",
        element: <Register />
    },
    {
        path: "login",
        element: <Login />
    }
])