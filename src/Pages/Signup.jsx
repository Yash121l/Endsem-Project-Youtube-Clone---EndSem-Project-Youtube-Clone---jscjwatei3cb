import React, { useState } from 'react';
import "./signup.css";
import { Link, useNavigate } from 'react-router-dom';
import Youtubelogo from './YoutubeLogo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component for user signup
const Signup = () => {
  // Create an instance of the useNavigate hook to navigate between pages
  const router = useNavigate();

  // Initialize state for signup form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    appType: 'ott'
  });

  // Handle changes to the signup form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle submission of the signup form
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    try {
      // Send a POST request to the server with the signup form data
      const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
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

      // Handle signup failure
      if (data.status === "fail") {
        toast.error(data.message, {
          theme: "dark"
        })
      }
      // Handle signup success
      else {
        toast.success("Account created Successfully!", {
          theme: "dark"
        })
        router("/signin");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Render the signup component
  return (
    <>
            // Navigation bar with YouTube logo and signin button
      <nav className="navbar">
        <img src={Youtubelogo} className='logo' alt='YouTube Logo' onClick={() => { router("/") }} />
        <div className="right">
          <button className="signin-btn" onClick={() => { router("/signin") }}>Sign In</button>
        </div>
      </nav>

            // Signup form
      <div className="signupContainer">
        <form className="signupForm" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
                    // Name input field
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
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
          <button type="submit">Sign Up</button>
                    // Link to signin page
          <span className='span'>Already have an account?</span> <Link to="/signin">Sign in here.</Link>
        </form>
      </div>
    </>
  );
};

export default Signup;