import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = ({setButtonText, setButtonPath, setLogin, setToken, setUser}) => {
  // Create an instance of the useNavigate hook to navigate between pages
  const router = useNavigate();
  setButtonText('Sign In')
  setButtonPath('/signin')

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
        setLogin(true)
        setToken(data.token)
        setUser(data.data.user.name)
        router("/home");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Render the signup component
  return (
    <>
      {/* // Signup form */}
      <div className="flex justify-center text-center items-center bg-black h-[100dvh]">
        <form className="max-w-[400px] w-full bg-[#333] text-[white] p-10 rounded-[10px] h-max" onSubmit={handleSubmit}>
          <h1 className='text-center text-[x-large] mb-5' >Sign Up</h1>
          {/* // Name input field */}
          <input
            className='w-full bg-[#555] text-[white] mb-[15px] p-2.5 rounded-[5px] border-[none]'
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
         {/* // Email input field */}
          <input
            className='w-full bg-[#555] text-[white] mb-[15px] p-2.5 rounded-[5px] border-[none]'
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {/* // Password input field */}
          <input
            className='w-full bg-[#555] text-[white] mb-[15px] p-2.5 rounded-[5px] border-[none]'
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
                    {/* // Signin button */}
          <button type="submit" 
          className='w-full bg-[red] text-[white] cursor-pointer p-2.5 rounded-[5px] border-[none] hover:bg-[rgba(255,0,0,0.777)]'
          >Sign Up</button>
                    {/* // Link to signin page */}
          <span className='text-[gray]'>Already have an account?</span> <Link to="/signin">Sign in here.</Link>
        </form>
      </div>
    </>
  );
};

export default Signup;