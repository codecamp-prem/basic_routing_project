import { Navigate, createBrowserRouter, useRouteError } from "react-router-dom";
import { RootLayout } from "./Layouts/RootLayout";
import { PostsRoute } from "./pages/Posts";
import { UsersRoute } from "./pages/Users";
import { TodosRoute } from "./pages/Todos";
import { SinglePostRoute } from "./pages/SinglePost";
import { SingleUserRoute } from "./pages/SingleUser";

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <RootLayout />,
        children: [
            {
                errorElement: <ErrorPage />,
                children:[
                    {index: true, element: <Navigate to="/posts" /> },
                    { 
                        path: "posts",
                        children: [
                            { 
                                index: true, 
                                ...PostsRoute
                            },
                            {  
                                ...SinglePostRoute
                            }
                        ],
                    },
                    {
                        path: "users", 
                        children: [
                            {
                                index: true,
                                ...UsersRoute
                            },
                            { 
                                ...SingleUserRoute
                            }
                        ]
                    },
                    {
                        path: "todos", 
                        ...TodosRoute
                    },
                    {
                        path: "*",
                        element: <h1>404</h1>
                    }
                ]
            }
        ]
    }
])

function ErrorPage(){
    const error =  useRouteError()

    return (
        <>
        <h1>Something went wrong!</h1>
        {import.meta.env.Mode !== "production" && (
            <>
            <pre>{error.message}</pre>
            <pre>{error.stack}</pre>
            </>
        )}
        </>
    )
}