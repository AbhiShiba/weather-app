import React, { useState } from "react";
import { AiTwotoneStar } from 'react-icons/ai'
import { weatherAPI } from "../../App";
import Axios from "../../utils/Axios";
import "./Search.css";
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

export function Search() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [d_loading, setD_loading] = useState(true);

  const LoacationName = (e) => {
    setQuery(e.target.value);
  };

  const search = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    setD_loading(true);
    const weatherOfSearched = async () => {
      const info = await Axios(
        `${weatherAPI.base}weather?q=${query}&units=metric&appid=${weatherAPI.key}`
      );
      setWeather(info.data);
      setD_loading(false);
      // getForeCast(info.data.coord.lat,info.data.coord.lon)
    };
    weatherOfSearched();
    setQuery("");
  };

  const addToFav = () => {
        let favData;
        if(localStorage.getItem('favData') === null){
            favData = [];
        } else {
            favData = JSON.parse(localStorage.getItem('favData'));
        }
        let isThereAData = favData.some((item) => {
            return item.name.toLowerCase() === weather.name.toLowerCase();
        })

        if(isThereAData){
            return
        }
        favData.push(weather);
        localStorage.setItem("favData",JSON.stringify(favData))
  }
  
  return (
    <div className="search">
      <div className="search-bar">
        <input
          type="text"
          onChange={LoacationName}
          value={query}
          onKeyPress={search}
        />
      </div>
      {d_loading ? (
        "Search the Name"
      ) : (
        <div className="searched-location">
          <div className="weather-info">
            <h1>{weather.name}</h1>
            <h2>{Math.round(weather.main.temp)}°c</h2>
            <h4>Humidity {weather.main.humidity}</h4>
          </div>
          <div className="fav-btn">
                <AiTwotoneStar style={{cursor:"pointer",fontSize:"1.2rem",color:"white"}} onClick={addToFav}/>
          </div>
        </div>
      )}
    </div>
  );
}
