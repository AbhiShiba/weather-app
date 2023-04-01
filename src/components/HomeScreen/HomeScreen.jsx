import React, { useContext } from 'react'
import { WeatherContext } from '../../App'
import './HomeScreen.css'

export function HomeScreen() {
    const contextData = useContext(WeatherContext);
    const w_data = contextData.weatherData[0];
    console.log(w_data); 
  return (
    <div className='home-screen'>
        <div className="current-weather">
            <div className="search-bar-section">
                <input type="text" disabled/> search
            </div>
            <h1>{w_data.name}</h1>
            <h2>{Math.round(w_data.main.temp)}°c</h2>
            <h3>Humidity {w_data.main.humidity}</h3>
        </div>
        <div className="favorites">
            No Locations Added to Your List.
        </div>
    </div>
  )
}
