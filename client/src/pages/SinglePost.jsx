import { Link, useLoaderData } from "react-router-dom"
import { getPost } from "../api/posts"
import { getUser } from "../api/users"
import { getComments } from "../api/comments"

function SinglePost(){
    const {post, user, comments} = useLoaderData()

    return (
        <>
        <h1 className="page-title">
        {post.title}
        </h1>
        <span className="page-subtitle">By: <Link to={`/users/${user.id}`}>{user.name}</Link></span>
        <div>
        {post.body}
        </div>
        <h3 className="mt-4 mb-2">Comments</h3>
        <div className="card-stack">
            {comments.map(comment =>{
                return (
                    <div className="card" key={comment.id}>
                        <div className="card-body">
                            <div className="text-sm mb-1">{comment.email}</div>
                            {comment.body}
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}

async function loader({ params, request: { signal } }){
    const post = await getPost(params.postId, { signal }) // need useId from this post to use in getUser()
    const user = getUser(post.userId, { signal })
    const comments = getComments(params.postId, { signal })

    return {post, user: await user, comments: await comments}
}

export const SinglePostRoute = {
    loader,
    path: ":postId",
    element: <SinglePost />
}