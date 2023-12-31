import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../hooks/AuthProvider'; 

import "../styles/login.css";

export const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
            const response = await axios.post("https://localhost:4000/auth/login", {
        email,
        password
      },{withCredentials:true});
      window.sessionStorage.setItem("userID", response.data.userID);
      window.sessionStorage.setItem("userName", response.data.username);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your email and password."); 
    }
  };

        const togglePassword = () => {
            setShowPassword((showPassword) => !showPassword);
          };
       

    return (
        <div className="login_container">
            <div className="form-container col-md-6 mt-5">
                <h1 className="title">Sign In</h1>
                <form id="form" onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            id="email"
                            placeholder="me@example.com"
                            value={email}
                            onChange={(event) => setemail(event.target.value)}
                            required                           
                        />
                    </div>              
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="password-input">
                       
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-input"
                            id="password"
                            placeholder="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <button
                       type="button" className="show-password-icon"
                        onClick={togglePassword}
                        >
                            {showPassword?'hide':'show'}
                        </button>
                        </div>                   
                    </div>                
                    <button type="submit" className="login-btn">LOG IN</button>
                       
                    </form>
                    {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <p className="register-text">Don't have an account?<Link className="register-link" to="/register">Sign Up</Link></p>
            </div>

           
        </div>
   
       
    );
};