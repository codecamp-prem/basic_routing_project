import { baseApi } from "./base";

export function getTodos(options){
    return baseApi.get("todos", options).then(res => res.data)
}

export function getTodosByUserId(userId, options){
    return baseApi.get(`users/${userId}/todos`, options).then(res => res.data)
}