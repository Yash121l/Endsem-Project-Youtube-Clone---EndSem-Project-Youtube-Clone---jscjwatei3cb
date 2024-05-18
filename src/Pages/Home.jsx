// Import required libraries and components
import React, { useEffect, useState } from 'react';
import "./home.css"
import { useNavigate } from 'react-router-dom';
import Youtubelogo from './YoutubeLogo.png';

// Home component
function Home({isLogin, userName}) {
    // Initialize state variables
    const [videos, setVideos] = useState([]);

    // Get a reference to the router
    const router = useNavigate();

    // Fetch videos from the server when the component mounts
    useEffect(() => {
        fetchVideos();
    }, []);

    // Fetch videos from the server
    const fetchVideos = async () => {
        try {
            // Send a GET request to the server
            const response = await fetch('https://academics.newtonschool.co/api/v1/ott/show?limit=200', {
                headers: {
                    'accept': 'application/json',
                    'projectID': 'jscjwatei3cb'
                }
            });

            // Extract data from the response
            const data = await response.json();
            setVideos(data.data);
            console.log("data fetch from server")
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Render the component
    return (
        <>
            <nav className="navbar">
                <img src={Youtubelogo} className='logo' alt='YouTube Logo' onClick={() => { router("/") }} />
                {isLogin? <h1 className="right-text"><i class="fa-solid fa-user fa-sm"></i> {userName}</h1> : 
                <div className="right">
                    <button className="signin-btn" onClick={() => { router("/signup") }}>Sign Up</button>
                </div>}
            </nav>
            <div className="home-page">
                <div className='filter-bar'>
                    <button>All</button>
                    <button>web series</button>
                    <button>video song</button>
                    <button>tv show</button>
                    <button>short film</button>
                    <button>documentary</button>
                    <button>movie</button>
                    <button>trailer</button>
                </div>
                <div className="video-list">
                    {videos.map(video => (
                        <div key={video._id} className={isLogin? "video-card pointer" : "video-card" } data-id={video._id} onClick={(e) => {
                            const videoCard = e.currentTarget.closest('.video-card');
                            const videoId = videoCard.dataset.id;
                            console.log(`/home/${videoId}`);
                            router(`/home/${videoId}`)
                        }}>
                            <img src={video.thumbnail} alt={video.title} />
                            <div className="video-info">
                                <h3>{video.title}</h3>
                                <div className='h23232323'>
                                    <span className='video-type'> <i className="fa-solid fa-video" /> {video.type}</span>
                                    <span className='video-director'> <i className="fa-regular fa-circle-user" /> {video.director}</span>
                                </div>
                                <p className='video-cast'> <i className="fa-solid fa-user-group" /> {video.cast.join(', ')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

// Export the Home component
export default Home;