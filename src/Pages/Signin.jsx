// Signin.js
import React, { useState } from 'react';
import "./signin.css"
import { Link, useNavigate } from 'react-router-dom';
import Youtubelogo from './YoutubeLogo.png';

const Signin = ({ setLogIn, setToken }) => {
    const router = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        appType: 'ott'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectID': 'jscjwatei3cb',
                    'accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.status === "fail") {
                alert(data.message);
                console.log(data.message);
            } else {
                setLogIn(true);
                alert("Logged In Successfully!");
                setToken(data.token);
                console.log(data.token)
                router("/home");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <nav className="navbar">
                <img src={Youtubelogo} alt='YouTube Logo' onClick={() => { router("/" )}}/> 
                <div className="right">
                    <button className="signin-btn" onClick={() => { router("/signup" ) }}>Sign Up</button>
                </div>
            </nav>
            <div className="signin-container">
                <form className="signin-form" onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Sign In</button>
                    <span className='span'>New to YouTube? </span> <Link to="/signup">Sign up here.</Link>
                </form>
            </div>
        </>
    );
};

export default Signin;
