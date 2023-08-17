import axios from "axios"
import { useLoaderData } from "react-router-dom"

function Todos(){
    const todos = useLoaderData()
    
    return (
        <>
            <h1 className="page-title">Todos</h1>
            <ul>
            {todos.map(todo => {
                return (
                        todo.completed ? 
                        <li className="strike-through" key={todo.id}>{todo.title}</li> : 
                        <li key={todo.id}>{todo.title}</li>
                )
            })}
            </ul>
        </>
    )
}

function loader({ request: {signal} }){
    return axios.get("http://localhost:3000/todos", {signal})
            .then(res => res.data)
}

export const TodosRoute = {
    loader,
    element: <Todos />
}