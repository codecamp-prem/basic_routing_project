import { Navigate, createBrowserRouter, useNavigation } from "react-router-dom";
import { RootLayout } from "./Layouts/RootLayout";
import { PostsRoute } from "./pages/Posts";
import { UsersRoute } from "./pages/Users";
import { TodosRoute } from "./pages/Todos";

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <RootLayout />,
        errorElement: <h1>Error: Something went wrong</h1>,
        children: [
            {index: true, element: <Navigate to="/posts" /> },
            { 
                path: "posts",
                children: [
                    { 
                        index: true, 
                        ...PostsRoute
                    },
                    { path: ":postId", element: <h1>Single Post details</h1>}
                ],
            },
            {
                path: "users", 
                children: [
                    {
                        index: true,
                        ...UsersRoute
                    },
                    { path: ":userId", element: <h1>Single User details</h1>}
                ]
            },
            {
                path: "todos", 
                ...TodosRoute
            }
        ]
    }
])
