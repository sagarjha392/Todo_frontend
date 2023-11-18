import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, serverUrl } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';
const Login = () => {

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if(isAuthenticated) return <Navigate to={"/"}/>

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${serverUrl}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
           "Content-Type":"application/json"
          },
          withCredentials: true,
        }
      );

      toast.success(data.message)
      setIsAuthenticated(true);
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false)
      console.log(error);
    }
  }


  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler} >
        <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder='Email'
          />

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder='Password' />
          <button type="submit" disabled={loading}>Login</button>
          <h4>or</h4>
          <Link to="/register">Sign up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login