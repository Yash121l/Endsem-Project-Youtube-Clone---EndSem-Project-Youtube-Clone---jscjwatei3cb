import React, { useState } from 'react';
import "./signin.css"
import { Link, useNavigate } from 'react-router-dom';
import Youtubelogo from './YoutubeLogo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component for user signin
const Signin = ({ setLogIn, setToken, setUserName }) => {
  // Create an instance of the useNavigate hook to navigate between pages
  const router = useNavigate();

  // Initialize state for signin form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    appType: 'ott'
  });

  // Handle changes to the signin form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle submission of the signin form
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    try {
      // Send a POST request to the server with the signin form data
      const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'projectID': 'jscjwatei3cb',
          'accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Parse the response as JSON
      const data = await response.json();

      // Handle signin failure
      if (data.status === "fail") {
        toast.error(data.message, {
          theme: "dark"
        })
      }
      // Handle signin success
      else {
        toast.success("Logged In Successfully", {
          theme: "dark"
        })
        setLogIn(true);
        setUserName(data.data.user.name)
        setToken(data.token);
        router("/home");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Render the signin component
  return (
    <>
            // Navigation bar with YouTube logo and signin button
      <nav className="navbar">
        <img src={Youtubelogo} className='logo' alt='YouTube Logo' onClick={() => { router("/") }} />
        <div className="right">
          <button className="signin-btn" onClick={() => { router("/signup") }}>Sign Up</button>
        </div>
      </nav>

            // Signin form
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
                    // Email input field
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
                    // Password input field
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
                    // Signin button
          <button type="submit">Sign In</button>
                    // Link to signup page
          <span className='span'>New to YouTube? </span> <Link to="/signup">Sign up here.</Link>
        </form>
      </div>
    </>
  );
};

export default Signin;