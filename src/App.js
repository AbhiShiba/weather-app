import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import "./App.css";
import { Home } from "./components/Home/Home";
import Axios from "./utils/Axios";
import { Search } from "./components/Search/Search";

export const WeatherContext = createContext();

export const weatherAPI = {
  key: "96d2ab1ab80def308960240434f2d417",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    setLoading(true);
    const getCurrentWeatherDate = async () => {
      if (coords === undefined) {
        return;
      }
      const info = await Axios(
        `${weatherAPI.base}weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${weatherAPI.key}`
      );
      setWeatherData(info.data);
      setLoading(false);
    };

    getCurrentWeatherDate();
  }, [coords]);

  return (
    <BrowserRouter>
      <WeatherContext.Provider
        value={{
          weatherData: [weatherData, setWeatherData],
          loading: [loading, setLoading],
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </WeatherContext.Provider>
    </BrowserRouter>
  );
}

export default App;
