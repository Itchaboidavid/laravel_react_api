import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {

    const [formData, setFormData] = useState({
        'title': '',
        'body': ''
    });

    const {token} = useContext(AppContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        const res = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        
        if (!res.ok || data.errors) {
            setErrors(data.errors)
        } else {
            navigate('/');
        }
    }

    async function getPost() {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();

        setFormData({
            'title': data.post.title,
            'body': data.post.body
        })
    }

    useEffect(() => {
        getPost();
    }, []);

  return (
    <div>
      <h1 className='text-neutral-800 font-bold text-2xl text-center mb-6'>Edit Post</h1>

      <form className='w-1/2 mx-auto space-y-4' onSubmit={handleSubmit}>
        <div>
            <input type="text" name="title" placeholder='Post title' className='block w-full border rounded-md py-2 px-4' value={formData.title} onChange={handleChange}/>
            {errors.title && <p className='text-red-500 text-sm ps-1'>{errors.title}</p>}
        </div>
        <div>
            <textarea name="body" rows="6" placeholder='Content here...' className='block w-full border rounded-md py-2 px-4' value={formData.body} onChange={handleChange}></textarea>
            {errors.body && <p className='text-red-500 text-sm ps-1'>{errors.body}</p>}
        </div>
        <button type='submit' className='block w-full bg-blue-500 rounded-md hover:bg-blue-400 text-white py-2'>Save</button>
      </form>
    </div>
  )
}

export default Edit
