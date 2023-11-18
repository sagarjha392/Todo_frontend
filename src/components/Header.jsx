import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, serverUrl } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'

const Header = () => {

  const { isAuthenticated, setIsAuthenticated ,loading, setLoading} = useContext(Context);

  const logoutHandler = async (e) => {
    setLoading(true);
    try {
      await axios.get(
        `${serverUrl}/users/logout`,

        {
          withCredentials: true,
        }
      );

      toast.success("Logged out successfully");
      setIsAuthenticated(false);
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  }

  return (
    <nav className='header'>
      <div><h2>Todo App</h2></div>
      <article>
        <Link to={"/"}>Home</Link>
        {
          isAuthenticated ? (
            <>
        <Link to={"/profile"}>Profile</Link>

            <button className='btn' disabled={loading} onClick={logoutHandler}>Logout</button>
            </>
          ) : (
            <Link to={"/login"}>Login</Link>)
        }


      </article>
    </nav>
  );
}

export default Header