import React, { useContext } from 'react'
import { WeatherContext } from '../../App'
import { HomeScreen } from '../HomeScreen/HomeScreen';
import { Search } from '../Search/Search';
import './Home.css'

export function Home() {
    const contextData = useContext(WeatherContext);
    const Loading = contextData.loading[0]
  return (
    <div>
        {Loading ? "......loading" : 
        <div>
            <HomeScreen/>
            <Search/>
        </div>}
    </div>
  )
}
