import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component for user signin
const Signin = ({setButtonText, setButtonPath, setLogin, setToken, setUser}) => {
    // Create an instance of the useNavigate hook to navigate between pages
    const router = useNavigate();
    setButtonText('Sign Up')
    setButtonPath('/signup')

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
                setLogin(true);
                setUser(data.data.user.name)
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
            {/* // Signin form */}
            <div className="flex justify-center text-center items-center bg-black h-[100dvh]">
                <form className="max-w-[400px] w-full bg-[#333] text-[white] p-10 rounded-[10px] h-max" onSubmit={handleSubmit}>
                    <h1 className='text-center text-[x-large] mb-5'>Sign In</h1>
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
                    <button type="submit" className='w-full bg-[red] text-[white] cursor-pointer p-2.5 rounded-[5px] border-[none] hover:bg-[rgba(255,0,0,0.777)]'>Sign In</button>
                    {/* // Link to signup page */}
                    <span className='text-[gray]'>New to YouTube? </span> <Link to="/signup">Sign up here.</Link>
                </form>
            </div>
        </>
    );
};

export default Signin;