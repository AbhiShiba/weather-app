import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { WeatherContext } from '../../App'
import './HomeScreen.css'

export function HomeScreen() {
    const contextData = useContext(WeatherContext);
    const w_data = contextData.weatherData[0];
    const navigation = useNavigate()

    const ListOfFav = () => {
        if(localStorage.getItem('favData') === null){
            return "No Locations Added to Your List."
        }

        const arr = JSON.parse(localStorage.getItem('favData'));
        console.log(arr);
        return arr.map((item,index) => {
            return <div className="list-of-fa" key={index}>
                <span>{item.name}</span>
            </div>
        })
    }

    const handleSearch = () => {
        navigation('/search')
    }
  return (
    <div className='home-screen'>
        <div className="current-weather">
            <div className="search-bar-section" onClick={handleSearch}>
                <input type="text" disabled/> <AiOutlineSearch style={{cursor:"pointer"}}/>
            </div>
            <h1>{w_data.name}</h1>
            <h2>{Math.round(w_data.main.temp)}°c</h2>
            <h3>Humidity {w_data.main.humidity}</h3>
        </div>
        <div className="favorites">
            <h2>List Of Favorite Location</h2>
            {ListOfFav()}
        </div>
    </div>
  )
}
