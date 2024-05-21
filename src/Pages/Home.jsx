// Import required libraries and components
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Home component
function Home({ setButtonText, setButtonPath, login , user}) {
    // Initialize state variables
    const [videos, setVideos] = useState([]);
    if (login) {
        setButtonText(`${user}`)
        setButtonPath('/')
    } else {
        setButtonText('Sign Up')
        setButtonPath('/signin')
    }

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
            <div className="bg-[black] text-[white] mx-auto my-0 px-5 py-2.5 pt-28">
                <div className='overflow-x-auto flex items-center flex-row mb-5'>
                    <button className='bg-[#25292c] border mr-2.5 px-4 py-1.5 rounded-full border-solid border-[hsla(0,0%,100%,0.05882)]'>All</button>
                    <button className='bg-[#25292c] border mr-2.5 px-4 py-1.5 rounded-full border-solid border-[hsla(0,0%,100%,0.05882)]'>web series</button>
                    <button className='bg-[#25292c] border mr-2.5 px-4 py-1.5 rounded-full border-solid border-[hsla(0,0%,100%,0.05882)]'>video song</button>
                    <button className='bg-[#25292c] border mr-2.5 px-4 py-1.5 rounded-full border-solid border-[hsla(0,0%,100%,0.05882)]'>tv show</button>
                    <button className='bg-[#25292c] border mr-2.5 px-4 py-1.5 rounded-full border-solid border-[hsla(0,0%,100%,0.05882)]'>short film</button>
                    <button className='bg-[#25292c] border mr-2.5 px-4 py-1.5 rounded-full border-solid border-[hsla(0,0%,100%,0.05882)]'>documentary</button>
                    <button className='bg-[#25292c] border mr-2.5 px-4 py-1.5 rounded-full border-solid border-[hsla(0,0%,100%,0.05882)]'>movie</button>
                    <button className='bg-[#25292c] border mr-2.5 px-4 py-1.5 rounded-full border-solid border-[hsla(0,0%,100%,0.05882)]'>trailer</button>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-5">
                    {videos.map(video => (
                        <div key={video._id} className={login? " overflow-hidden transition-[0.5s] p-[5px] rounded-[5px] hover:transition-[1s] hover cursor-pointer :bg-[rgba(128,128,128,0.24)]  " : " overflow-hidden transition-[0.5s] p-[5px] rounded-[5px] hover:transition-[1s] hover:bg-[rgba(128,128,128,0.24)]" } data-id={video._id} onClick={(e) => {
                            router(`/home/${video._id}`)
                        }}>
                            <img src={video.thumbnail} alt={video.title} 
                                className=' w-full h-[200px] transition-[2s] rounded hover:transition-[2s] hover:scale-110'
                            />
                            <div className="pt-2.5 pb-[5px] px-2.5">
                                <h3 className='mb-2.5'>{video.title}</h3>
                                <div className='flex justify-between'>
                                    <span className='text-[gray]'> <i className="fa-solid fa-video" /> {video.type}</span>
                                    <span className='text-[gray]'> <i className="fa-regular fa-circle-user" /> {video.director}</span>
                                </div>
                                <p className='text-[gray] mb-1'> <i className="fa-solid fa-user-group" /> {video.cast.join(', ')}</p>
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