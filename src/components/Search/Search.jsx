import React, { useState } from 'react'
import { weatherAPI } from '../../App'
import Axios from '../../utils/Axios'
import './Search.css'
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

export function Search() {
    const [query, setQuery] = useState("")
    const [weather,setWeather] = useState(null)
    const [d_loading,setD_loading] = useState(true)

    const LoacationName = (e) => {
        setQuery(e.target.value)
    }

    const search = (e) => {
        if(e.key !== "Enter"){
            return;
        }
        setD_loading(true)
        const weatherOfSearched = async () => {
            const info = await Axios(`${weatherAPI.base}weather?q=${query}&units=metric&appid=${weatherAPI.key}`)
            
            console.log(info);
            setWeather(info.data);
            // getForeCast(info.data.coord.lat,info.data.coord.lon)
        }
        weatherOfSearched()

        const getForeCast = async (lat,lon) => {

            const forecast = await Axios(`${weatherAPI.base}forecast/daily?lat=${lat}&lon=${lon}&appid=${weatherAPI.key}`)
            console.log(forecast);
            setD_loading(false);
        }

        setQuery("");
    }
  return (
    <div className="search">
        <div className="search-bar">
            <input type="text" onChange={LoacationName} value={query} onKeyPress={search} />
        </div>
        {d_loading ? "Search the Name" : <div className='searched-location'>
                <h1>{weather.name}</h1>
                <h2>{Math.round(weather.main.temp)}°c</h2>
                <h4>Humidity {weather.main.humidity}</h4>
        </div>}
    </div>
  )
}
