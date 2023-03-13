  import React from 'react'
  import '../styles/Footer.css';
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import io from 'socket.io-client';
  import { useState, useEffect } from 'react';

  import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

  const socket=io('http://127.0.0.1:5050');
  export const Footer = () => {
    const [weatherData, setWeatherData] = useState('');

    useEffect(() => {
      socket.on('weatherData', setWeatherData);
      console.log(weatherData,'weather');
      return () => {
        socket.off('weatherData', setWeatherData);
      };
    }, []);

    return (
    <div className='footer-container'>
      <h2 className='footer-title'> visit us at social media</h2>
      <div className='social-container'>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="youtube social">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a href="https://www.facebook.com/learnbuildteach/"
            className="facebook social">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.twitter.com" className="twitter social">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://www.instagram.com"
            className="instagram social">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </div>
      {weatherData ? (
        <>
          <p>Temperature: {weatherData.temperature} °C</p>
          <p>Description: {weatherData.description}</p> 
        </>
         ) : (
          <p>Loading...</p>
        )}
    </div>
  )
}
