import { useContext, useState } from "react"
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const [formData, setFormData] = useState({
        'title': '',
        'body': ''
    });

    const {token} = useContext(AppContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        console.log(data);
        
        if (!res.ok || data.errors) {
            setErrors(data.errors)
        } else {
            navigate('/');
        }
    }

  return (
    <div>
      <h1 className='text-neutral-800 font-bold text-2xl text-center mb-6'>Create a new post</h1>

      <form className='w-1/2 mx-auto space-y-4' onSubmit={handleSubmit}>
        <div>
            <input type="text" name="title" placeholder='Post title' className='block w-full border rounded-md py-2 px-4' value={formData.title} onChange={handleChange}/>
            {errors.title && <p className='text-red-500 text-sm ps-1'>{errors.title}</p>}
        </div>
        <div>
            <textarea name="body" rows="6" placeholder='Content here...' className='block w-full border rounded-md py-2 px-4' value={formData.body} onChange={handleChange}></textarea>
            {errors.body && <p className='text-red-500 text-sm ps-1'>{errors.body}</p>}
        </div>
        <button type='submit' className='block w-full bg-blue-500 rounded-md hover:bg-blue-400 text-white py-2'>Create</button>
      </form>
    </div>
  )
}

export default Create
