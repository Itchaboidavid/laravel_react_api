import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../../Context/AppContext";

const Show = () => {

    const {id} = useParams();
    const [post, setPost] = useState(null);
    const {token, user} = useContext(AppContext);
    const navigate = useNavigate();

    async function getPost() {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        
        if(res.ok) {
            setPost(data.post);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();

        if (user && user.id === post.user_id) {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            const data = await res.json();
            console.log(data.message);
    
            if(res.ok) {
            navigate('/');
            }
        }   
    }

    useEffect(() => {
        getPost();
    }, []);

  return (
    post ? (       
            <div className="w-1/2 mx-auto shadow-lg p-10">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold tracking-tight">{post.title}</h2>
                </div>
                <div className="text-start">
                    <p className="text-sm tracking-tight mb-6">{post.body}</p>
                </div>
                {post.user_id === user.id ? (
                     <div className="flex items-center justify-end space-x-3 text-sm mt-6">
                     <Link to={`/posts/edit/${post.id}`} className="text-white bg-blue-500 px-4 py-1 rounded-md font-semibold hover:bg-blue-400">Edit</Link>
                     <form onSubmit={handleDelete}>
                         <button className="text-white bg-red-500 px-4 py-1 rounded-md font-semibold hover:bg-red-400">Delete</button>
                     </form>
                 </div>
                ) : (<div></div>)} 
               
            </div>
    ) : (<p>Post not found</p>)
    
  )
}

export default Show
