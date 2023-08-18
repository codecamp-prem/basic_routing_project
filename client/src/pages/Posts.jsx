import { useLoaderData } from "react-router-dom"
import { getPosts } from "../api/posts"
import { PostCard } from "../components/PostCard"

function Posts(){
  const posts = useLoaderData()

  return (
    <>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map(post => {
          return (
            <PostCard key={post.id} {...post} />
          )
        })}
      </div>
    </>  
  )
}

function loader({ request: {signal} }){
  return getPosts({ signal })
}

export const PostsRoute = {
  loader,
  element: <Posts />,
}