import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [cloud_pct, setCloud_pct] = useState(0)
  const [feels_like, setFeels_like] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [max_temp, setMax_temp] = useState(0)
  const [min_temp, setMin_temp] = useState(0)
  const [sunrise, setSunrise] = useState(0)
  const [sunset, setSunset] = useState(0)
  const [temp, setTemp] = useState(0)
  const [wind_degrees, setWind_degrees] = useState(0)
  const [wind_speed, setWind_speed] = useState(0)

  async function getData() {
    setIsLoading(true);
    const url = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": import.meta.env.VITE_API_NINJAS_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      const weatherUrl = `https://api.api-ninjas.com/v1/weather?lat=${json[0]?.latitude}&lon=${json[0]?.longitude}`;
      const weatherResponse = await fetch(weatherUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": import.meta.env.VITE_API_NINJAS_API_KEY 
        }
      });

      if (!weatherResponse.ok) {
        throw new Error(`Response status: ${weatherResponse.status}`);
      }

      const weatherJson = await weatherResponse.json();
      setCloud_pct(weatherJson.cloud_pct);
      setFeels_like(weatherJson.feels_like);
      setHumidity(weatherJson.humidity);
      setMax_temp(weatherJson.max_temp);
      setMin_temp(weatherJson.min_temp);
      setSunrise(weatherJson.sunrise);
      setSunset(weatherJson.sunset);
      setTemp(weatherJson.temp);
      setWind_degrees(weatherJson.wind_degrees);
      setWind_speed(weatherJson.wind_speed);
      setIsLoading(false);
      console.log(weatherJson);
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleUpdateCity = (event) => {
    setCity(event.target.value);
  }

  const handleUpdateCountry = (event) => {
    setCountry(event.target.value);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div>
          <p>Cloud Coverage: {cloud_pct ? cloud_pct : null}%</p>
          <p>Feels Like: {feels_like ? feels_like : null}°C</p>
          <p>Humidity: {humidity ? humidity : null}%</p>
          <p>High: {max_temp ? max_temp : null}°C</p>
          <p>Low: {min_temp ? min_temp : null}°C</p>
          <p>Sunrise: {sunrise ? new Date(sunrise * 1000).toLocaleTimeString() : null}</p>
          <p>Sunset: {sunset ? new Date(sunset * 1000).toLocaleTimeString() : null}</p>
          <p>Temperature: {temp ? temp : null}°C</p>
          <p>Wind Degrees: {wind_degrees ? wind_degrees : null}°</p>
          <p>Wind Speed: {wind_speed ? wind_speed : null} km/h</p>
          <p>Enter your city and country to find the weather data</p>
          <p>City
            <input type='text' onChange={handleUpdateCity}></input>
          </p>
          <p>Country
            <input type='text' onChange={handleUpdateCountry}></input>
          </p>
        </div>
        <div>
          {isLoading ? <img src={reactLogo} className="logo react spin" alt="React logo" /> : <button className="m-vertical--30" onClick={getData}>Get Data</button>}
        </div>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
