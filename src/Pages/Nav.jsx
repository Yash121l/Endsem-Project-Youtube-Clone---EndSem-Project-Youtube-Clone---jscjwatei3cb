import React from 'react'
import { Link } from 'react-router-dom'
import Youtubelogo from './YoutubeLogo.png';

const Nav = ({buttonText, buttonPath}) => {
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-black flex flex-row justify-between text-white items-center">
            <div className='p-3  '>
                <Link to='/'><img src={Youtubelogo} className='h-[60px]' alt='YouTube Logo'/></Link>
            </div>
            <div className='p-3 '>
                <Link to={buttonPath}><p className='bg-[#d60017] rounded-md py-1 px-2'><i className="fa-solid fa-user"/> {buttonText}</p></Link>
            </div>
        </nav>
        </div>
    )
}

export default Nav
