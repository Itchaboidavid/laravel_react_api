import { useContext } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { AppContext } from "../Context/AppContext"

const Layout = () => {
  const {user, token, setUser, setToken} = useContext(AppContext)
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      navigate('/');
    }
  }

  return (
    <div>
      <header className="bg-slate-50 shadow-lg">
        <nav className="max-w-screen-lg mx-auto p-6  flex items-center justify-between font-bold text-neutral-800">
            <Link to="/" className="hover:text-neutral-600 hover:underline">Home</Link>

            {user ? 
            <div className="flex items-center space-x-6">
              <p>Welcome back, {user.name}!</p>
              <Link to="/create" className="text-blue-500 hover:underline">New Post</Link> 
              <form onSubmit={handleSubmit}>
                <button type="submit" className="text-red-500 hover:underline">Logout</button>
              </form>
            </div> : 
              <div className="space-x-4">
                  <Link to='/login' className="hover:text-neutral-600 hover:underline">Login</Link>
                  <Link to='/register' className="hover:text-neutral-600 hover:underline">Register</Link>
              </div>
            }
        </nav>
      </header>

      <main className="p-10">
        <Outlet/>
      </main>
    </div>
  )
}

export default Layout
