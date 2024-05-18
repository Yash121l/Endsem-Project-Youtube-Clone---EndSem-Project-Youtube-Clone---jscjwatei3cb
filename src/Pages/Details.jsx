import { useNavigate, useParams } from "react-router-dom";
import './details.css';
import { useEffect, useState } from "react";
import Youtubelogo from './YoutubeLogo.png';

// Component for displaying video details
function Details({ token, userName }) {
    // Initialize state for video data
    let [data, setData] = useState()

    // Import useNavigate hook from react-router-dom to navigate between pages
    const router = useNavigate();

    // Fetch video data when the component mounts
    useEffect(() => {
        fetchVideos();   // eslint-disable-next-line
    },[]);

    // Get video ID from the URL parameters
    const { id } = useParams();

    // Function to fetch video data from the server
    const fetchVideos = async () => {
        try {
            // Send a GET request to the server with the video ID, project ID, and authorization token
            const response = await fetch(`https://academics.newtonschool.co/api/v1/ottx/show/${id}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'projectID': 'jscjwatei3cb',
                    'Authorization': `Bearer ${token}`
                }
            });

            // Parse the response as JSON and update the state with the video data
            const data = await response.json();
            setData(data.data);
            console.log("data fetch from server")
        } catch (error) {
            // Log any errors that occur during the fetch request
            console.error('Error fetching data:', error);
        }
    };

    // Render the component
    return (
        <>
            // Render the navigation bar with the YouTube logo and user name
            <nav className="navbar">
                <img src={Youtubelogo} alt='YouTube Logo' className="logo" onClick={() => { router("/") }} />
                <h1 className="right-text"><i class="fa-solid fa-user fa-sm"></i> {userName}</h1>
            </nav>

            // Render the video details if data is available, otherwise render "No data"
            {data? (
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
                <h1>No data</h1> 
            )}
        </>
    )
}

export default Details;