import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopBottons from './components/TopBottons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemparatureAndDetails from './components/TemparatureAndDetails';
import Forecast from './components/Forecast';
// import getWeatherData from './services/WeatherService';
import getFormattedWeatherData from './services/WeatherService';
import {useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({q:'berlin'});
  const [units,setUnits] = useState('metric');
  const [weather,setWeather] = useState(null);

  useEffect(()=>{
    const fetchWeather = async()=>{
      const message = query.q ? query.q : "current location."
      toast.info('Fetching weather for '+message)
      await getFormattedWeatherData({...query,units}).then(data=>{
        toast.success(`Successfully fetched Weather for ${data.name}, ${data.country}.`)
        console.log("WeatherData--->",data)
        setWeather(data)
      })
    }
    fetchWeather()
  },[query,units])
 
  const formatBackground = ()=>{
    if(!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric'? 20 : 60
    if(weather.temp<= threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
  }
  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br 
    h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopBottons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather && (
        <div>
          <TimeAndLocation weather={weather}/>
          <TemparatureAndDetails weather={weather}/>
          <Forecast title="Hourly Forecast" items={weather.hourly}/>
          <Forecast title="Daily Forecast" items = {weather.daily}/>
        </div>
      )}
      


      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
     
  );
}

export default App;
