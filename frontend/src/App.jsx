import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from "./Pages/Layout"
import Home from "./Pages/Home"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import { useContext } from "react"
import { AppContext } from "./Context/AppContext"
import Create from "./Pages/Post/Create"
import Show from "./Pages/Post/Show"
import Edit from "./Pages/Post/Edit"

const App = () => {
  const {user} = useContext(AppContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>

          <Route path="/login" element={user ? <Home/> : <Login/>}/>
          <Route path="/register" element={user ? <Home/>: <Register/>}/>

          <Route path="/create" element={user ? <Create/> : <Login/>}/>
          <Route path="/posts/:id" element={ <Show/> }/>
          <Route path="/posts/edit/:id" element={user ? <Edit/> :  <Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
