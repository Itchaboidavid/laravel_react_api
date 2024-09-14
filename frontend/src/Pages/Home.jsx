import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Home = () => {

  const [posts, setPosts] = useState([]);

  async function getPost() {
    const res = await fetch('/api/posts');
    const data = await res.json();

    setPosts(data.data);
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="w-full mx-auto text-neutral-800">
      <h1 className="text-2xl font-bold mb-6 text-center">Latest Post</h1>
      <div id="posts-container" className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-6">
        {posts.length > 0 ? posts.map((post) =>  (
          <div key={post.id} className="flex flex-col rounded-md shadow-md p-5 bg-neutral-100 text-neutral-800">
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold tracking-tight">{post.title}</h2>
                <small className="capitalize">{post.user.name}&nbsp;{new Date(post.created_at).toLocaleTimeString()}</small>
              </div>
              <div className="text-start overflow-hidden">
                <p className="text-sm tracking-tight mb-6">{post.body.length > 30 ? `${post.body.substring(0, 50)}...` : post.body}</p>
                <Link to={`posts/${post.id}`} className="text-xs text-blue-500">Read more &raquo;</Link>
              </div>
            </div>
          </div>
        )) : <p>There are no post available.</p>}
      </div>
      
    </div>
  )
}

export default Home
