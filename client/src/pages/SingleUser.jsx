import { useLoaderData } from "react-router-dom"
import { getUser } from "../api/users"
import { getPostByUserId } from "../api/posts"
import { getTodosByUserId } from "../api/todos"
import { TodoItem } from "../components/TodoItem"
import { PostCard } from "../components/PostCard"

function SingleUser(){
    const {user, posts, todos} = useLoaderData()

    return (
        <>
        <h1 className="page-title">{user.name}</h1>
        <div className="page-subtitle">{user.email}</div>
        <div><b>Company:</b> {user.company.name}</div>
        <div><b>Website:</b> {user.website}</div>
        <div><b>Address:</b> {user.address.street} {user.address.suite}, {user.address.city}, {user.address.zipcode}</div>
        <h3 className="mt-4 mb-2">Posts</h3>
        <div className="card-grid">
        {posts.map(post => {
            return (
                <PostCard key={post.id} {...post} />
            )
        })}
        </div>
        <h3 className="mt-4 mb-2">Todos</h3>
        <ul>
            {todos.map(todo => {
                return (<TodoItem key={todo.id} {...todo} />)
            })}
        </ul>
        </>
    )
}

async function loader({ params, request: { signal } }){
    const user = getUser(params.userId, {signal})
    const posts = getPostByUserId(params.userId, {signal})
    const todos = getTodosByUserId(params.userId, {signal})

    // None of them depend on each other, so we are awaiting all here in the return
    return {user: await user, posts: await posts, todos: await todos} 
}

export const SingleUserRoute = {
    loader,
    path: ":userId",
    element: <SingleUser />
}