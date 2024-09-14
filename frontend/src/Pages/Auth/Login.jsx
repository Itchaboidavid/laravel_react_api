import {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {AppContext} from '../../Context/AppContext.jsx';

const Login = () => {

    const [formData, setFormData] = useState({
        'email': '',
        'password': '',
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

        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        console.log(data)

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
      <h1 className='text-xl font-bold text-center text-neutral-800 mb-2'>Create an account</h1>
      {errors.credentials && <p className='text-red-500 text-sm ps-1 font-bold text-center mb-2'>{errors.credentials[0]}</p>}
      <form className='w-1/3 mx-auto space-y-4' onSubmit={handleSubmit}>
        <div>
            <input className='block w-full border py-2 px-4 rounded-md' onChange={handleChange} value={formData.email} type="text" name='email' placeholder='Enter your email' />
            {errors.email && <p className='text-red-500 text-sm ps-1 font-bold'>{errors.email[0]}</p>}
        </div>
        <div>
            <input className='block w-full border py-2 px-4 rounded-md' onChange={handleChange} value={formData.password} type="password" name='password' placeholder='Enter your password' />
            {errors.password && <p className='text-red-500 text-sm ps-1 font-bold'>{errors.password[0]}</p>}
        </div>
        <button className='block w-full font-bold text-neutral-200 bg-blue-500 py-2 rounded-md hover:bg-blue-400'>Login</button>
      </form>
    </div>
  )
}

export default Login
