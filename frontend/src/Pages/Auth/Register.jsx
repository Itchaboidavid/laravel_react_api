import {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {AppContext} from '../../Context/AppContext.jsx';

const Register = () => {

    const [formData, setFormData] = useState({
        'name': '',
        'email': '',
        'password': '',
        'password_confirmation': ''
    });

    const { setToken } = useContext(AppContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData(prevState => ({
            ...prevState, [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if(data.errors || !res.ok) {
            setErrors(data.errors);
        } else {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            navigate('/');
        }

    }

  return (
    <div>
      <h1 className='text-xl font-bold text-center text-neutral-800 mb-6'>Create an account</h1>
      <form className='w-1/2 mx-auto space-y-4' onSubmit={handleSubmit}>
        <div>
            <input className='block w-full border py-2 px-4 rounded-md' onChange={handleChange} value={formData.name} type="text" name='name' placeholder='Enter your name' />
            {errors.name && <p className='text-red-500 text-sm ps-1'>{errors.name[0]}</p>}
        </div>
        <div>
            <input className='block w-full border py-2 px-4 rounded-md' onChange={handleChange} value={formData.email} type="text" name='email' placeholder='Enter your email' />
            {errors.email && <p className='text-red-500 text-sm ps-1'>{errors.email[0]}</p>}
        </div>
        <div>
            <input className='block w-full border py-2 px-4 rounded-md' onChange={handleChange} value={formData.password} type="password" name='password' placeholder='Enter your password' />
            {errors.password && <p className='text-red-500 text-sm ps-1'>{errors.password[0]}</p>}
        </div>
        <div>
            <input className='block w-full border py-2 px-4 rounded-md' onChange={handleChange} value={formData.password_confirmation} type="password" name='password_confirmation' placeholder='Confirm password' />
        </div>
        <button className='block w-full font-bold text-neutral-200 bg-blue-500 py-2 rounded-md hover:bg-blue-400'>Register</button>
      </form>
    </div>
  )
}

export default Register
