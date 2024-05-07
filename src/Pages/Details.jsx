import { useNavigate, useParams } from "react-router-dom";
import './details.css';
import { useEffect, useState } from "react";
import Youtubelogo from './YoutubeLogo.png';

function Details({ token, userName }) {
    let [data, setData] = useState()
    const router = useNavigate();
    useEffect(() => {
        fetchVideos();   // eslint-disable-next-line
    },[]);

    const { id } = useParams();
    const fetchVideos = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/ottx/show/${id}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'projectID': 'jscjwatei3cb',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setData(data.data);
            console.log("data fetch from server")
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <>
            <nav className="navbar">
                <img src={Youtubelogo} alt='YouTube Logo' className="logo" onClick={() => { router("/") }} />
                <h1 className="right-text">Hello, {userName}</h1>
            </nav>
            {data ? ( // Check if data exists
                <div className="randeringscreen">
                    <div className="top-part">
                        <video className="video" src={data.video_url} controls />
                        <img src={data.thumbnail} alt="thumbnail of Video"/>
                    </div>
                    <h1 className="title">{data.title}</h1>
                    <p className="description">description: {data.description} </p>
                    {data.keywords.map((keyword, index) => (
                        <span key={index}>
                            {index > 0 && ", "}
                            #{keyword}
                        </span>
                    ))}
                    <br /><br />
                    <i className="fa-solid fa-video" /> Type: {data.type}
                    <br />
                    <i className="fa-regular fa-circle-user" /> Director: {data.director}
                    <br />
                    <i className="fa-solid fa-user-group" /> Cast: {data.cast.join(", ")}
                </div>
            ) : (
                <h1>No data</h1> // Render if data is null or undefined
            )}
        </>
    )
}

export default Details;
