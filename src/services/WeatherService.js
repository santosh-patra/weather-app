import { DateTime } from "luxon";
import axios from 'axios';
const API_KEY = 'fe4feefa8543e06d4f3c66d92c61b69c';
// const base_url = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'
const base_url = 'https://api.openweathermap.org/data/2.5'

const getWeatherData =  async (infoType,searchParams)=>{
    const url = new URL(base_url+ '/' +infoType)
    url.search = new URLSearchParams({...searchParams,appid:API_KEY})
    // console.log("URL--->",url)
    // let value = await axios.get(url).catch(err=>{
    //     console.log("Error Occured--->",err.message)
    // });
    // console.log("Value--->",value.data)
    // return value.data;
    return fetch(url).then(res=>res.json())
}

const formatCurrentWeather = (data)=>{
    // console.log("GetData--->",data)
    const {
        coord:{lat,lon},
        main:{temp,feels_like,temp_min,temp_max,humidity},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed}
    } = data;
 
    const {main:details,icon} = weather[0];


    return { lat,lon,temp,feels_like,temp_min,temp_max,humidity,name,dt,country,sunrise,sunset,details,icon,speed }
}
const formatForecastWeather = (data)=>{
    let { timezone,daily,hourly} = data;
    daily = daily.slice(1,6).map(d=>{
        return{
            title:formatToLocalTime(d.dt,timezone,'ccc'),
            temp:d.temp.day,
            icon:d.weather[0].icon
        }
    })

    hourly = hourly.slice(1,6).map(d=>{
        return{
            title:formatToLocalTime(d.dt,timezone,'hh:mm a'),
            temp:d.temp,
            icon:d.weather[0].icon
        }
    })

    return { timezone,daily,hourly}
}



const getFormattedWeatherData = async (searchParams)=>{
     const formattedCurrentWeather = await getWeatherData('weather',searchParams).then(formatCurrentWeather)

    const {lat,lon} = formattedCurrentWeather;
    const formattedForecastWeather = await getWeatherData('onecall',{
        lat,lon,exclude:'current,minutely,alerts',units:searchParams.units
    }).then(formatForecastWeather)

     return {...formattedCurrentWeather,...formattedForecastWeather}
}

const formatToLocalTime = (secs,zone,format = "cccc, dd LLL yyyy' | Local time:'hh:mm a")=>{
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

}

const iconUrlFromCode = (code)=>{
    return `https://openweathermap.org/img/wn/${code}@2x.png`}


export default getFormattedWeatherData;

export { iconUrlFromCode,formatToLocalTime}

