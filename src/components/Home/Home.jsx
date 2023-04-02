import React, { useContext } from 'react'
import { WeatherContext } from '../../App'
import { HomeScreen } from '../HomeScreen/HomeScreen';
import './Home.css'

export function Home() {
    const contextData = useContext(WeatherContext);
    const Loading = contextData.loading[0]
  return (
    <div>
        {Loading ? "......loading" : 
        <div>
            <HomeScreen/>
        </div>}
    </div>
  )
}
