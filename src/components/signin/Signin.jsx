import "./signin.css";
import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SigninComponent({setIsLoggedIn}) {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleClick = async (e) => {
        try {
          e.preventDefault()
          let values = {
            email,
            password
          };
          const response = await axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/user/signin`,
            data: values,
          });
          if(response.status === 200) {
            setSuccess('Logged in')
            localStorage.setItem('token', response.data.token)
            setIsLoggedIn(true)
            setTimeout(() => {
              navigate('/')
            }, 1500)
          }
        } catch (error) {
          console.log(error.response);
          if(error.response.status == 400) {
            setError(error.response.data.msg)
            
          }
        }
      }

  return (
    <div className="form-container">
      <form className="register-form">
        { success && <div className="success-message">{success}</div>}
        <input
          className="form-field"
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="form-field"
          type="text"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {error && <span id="email-error">{error}</span>}
        <button className="form-field" onClick={handleClick}>
          Login
        </button>
      </form>
      <p>Don't have an account?? Click to <Link to="/register">Sign up</Link></p>
    </div>
  );
}