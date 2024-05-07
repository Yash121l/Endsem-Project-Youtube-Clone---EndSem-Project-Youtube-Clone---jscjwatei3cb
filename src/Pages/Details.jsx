import { useNavigate, useParams } from "react-router-dom";
import './details.css';
import { useEffect, useState } from "react";
import Youtubelogo from './YoutubeLogo.png';

function Details({ token }) {
    let [data, setData] = useState()
    const router = useNavigate();
    // let datas = {};
    // function setData(e) {
    //     datas = e;
    // }
    useEffect(() => {
        fetchVideos();
    }, []);

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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    console.log(data)
    return (
        <>
            <nav className="navbar">
                <img src={Youtubelogo} alt='YouTube Logo' className="logo" onClick={() => { router("/") }} />
                <div className="right">
                    <button className="signin-btn" onClick={() => { router("/signup") }}>Sign Up</button>
                </div>
            </nav>
            <div className="randeringscreen">

            </div>
        </>
    )
}

export default Details;
