import React, { useState } from 'react';
import './Weather.css';

const api = {
    key: "fc6c7fbf5d3e45c0d7ea611505cc3284",
    base: "https://api.openweathermap.org/data/2.5/"
};

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery('');
                console.log(result);
            });
        }
    };

    

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };

    return (
        <div>
            <main>
                <div className='search-box'>
                    <input
                        type='text'
                        className='search-bar'
                        placeholder='Enter city'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={search}
                    />
                </div>

                {(typeof weather.main != "undefined") ? (
                <div className="main">
                    <div className="location-box">
                        <div className="place-date">
                        <div className="location">
                            {weather.name}, {weather.sys.country}
                        </div>
                        <div className="date">
                            {dateBuilder(new Date())}
                        </div>
                        <div className="temp">
                                {Math.round(weather.main.temp)}°C
                            </div>
                        </div>
                        <div className="weather-box">
                            
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                        <div className="btm-box">
                            <div className="description">
                                Description: {weather.weather[0].description}
                            </div>
                            <div className="more">
                                Feels like: {Math.round(weather.main.feels_like)}°C
                            </div>
                            <div className="humidity">
                                Humidity: {weather.main.humidity}%
                            </div>
                        </div>
                </div>
                ) : ('')}
            </main>
        </div>
    );
};

export default Weather;
