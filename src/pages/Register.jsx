import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, serverUrl } from '../main';
import toast from 'react-hot-toast';
import axios from "axios";


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading,setLoading } = useContext(Context);

  if (isAuthenticated) return <Navigate to={"/"} />

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${serverUrl}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        }
      );

      toast.success(data.message)
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }

  return (

    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            placeholder='Name'
          />
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

          <button
            disabled={loading}
            type="submit">Sign Up</button>
          <h4>or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  )
}

export default Register