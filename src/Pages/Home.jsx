import React, { useEffect, useState } from 'react';
import "./home.css"
import { useNavigate } from 'react-router-dom';
import Youtubelogo from './YoutubeLogo.png';

function Home() {
    const [videos, setVideos] = useState([]);

    const router = useNavigate();

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/ott/show?limit=100', {
                headers: {
                    'accept': 'application/json',
                    'projectID': 'jscjwatei3cb'
                }
            });
            const data = await response.json();
            setVideos(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handelClick = (e) => {
        const videoCard = e.currentTarget.closest('.video-card');
        const videoId = videoCard.dataset.id;
        console.log(videoId);
    }

    return (
        <>
            <nav className="navbar">
                <img src={Youtubelogo} alt='YouTube Logo' onClick={() => { router("/") }} />
                <div className="right">
                    <button className="signin-btn" onClick={() => { router("/signup") }}>Sign Up</button>
                </div>
            </nav>
            <div className="home-page">
                <div className="video-list">
                    {videos.map(video => (
                        <div key={video._id} className="video-card" data-id={video._id} onClick={handelClick}>
                            <img src={video.thumbnail} alt={video.title} />
                            <div className="video-info">
                                <h3>{video.title}</h3>
                                <div className='h23232323'>
                                    <span className='video-type'> <i class="fa-solid fa-video"/> {video.type}</span>
                                    <span className='video-director'> <i class="fa-regular fa-circle-user"/> {video.director}</span>
                                </div>
                                <p className='video-cast'> <i class="fa-solid fa-user-group"/> {video.cast.join(', ')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;