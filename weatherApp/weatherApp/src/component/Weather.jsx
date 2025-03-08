import React, { useEffect, useRef, useState } from 'react';
import './weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import wind_icon from '../assets/wind.png'
import snow_icon from '../assets/snow.png'
import drizzle_icon from '../assets/drizzle.png'

export default function Weather(){
    const inputRef = useRef();
    const [ weatherData , setWeaterData] = useState({
        humidity: '',
        windSpeed: '',
        temprature: '',
        location: '',
        icon: clear_icon
    });
    
    const allIcons={
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : cloud_icon,
        "02n" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : drizzle_icon,
        "04n" : drizzle_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "13d" : snow_icon,
        "13n" : snow_icon,
    }

    const search = async (city)=>{
        if(city===""){
            alert('Enter City Name');
            return;
        }
        try{
         const api_key ='477fed2119fdffa8fbfc1b05ac2eb20f'
         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
         const response = await fetch(url);
         const jsonResponse = await response.json();
         console.log(jsonResponse);
         if(!response.ok){
            alert(jsonResponse.message);
            return;
         }
         const icon = jsonResponse.weather && jsonResponse.weather[0] && allIcons[jsonResponse.weather[0].icon] || clear_icon;

         setWeaterData({
            humidity:jsonResponse.main.humidity,
            windSpeed : jsonResponse.wind.speed,
            temprature: Math.floor(jsonResponse.main.temp),
            location : jsonResponse.name,
            icon : icon

         });
         
        }catch(error){
            setWeaterData(false);
           console.error("erron in featching data")
        }
    }
    console.log(weatherData);
         console.log("its okay")
    useEffect(()=>{
        search("London");
    },[])
  return (
    <div className='weather'>
        <div className="search-input">
            <input ref={inputRef} type="text" placeholder='search' />
            <img src={search_icon} alt="not found" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData ? <>
            <img src={weatherData.icon} alt="not found"  className='weather-icon'/>
        <p className='temprature'>{weatherData.temprature} deg</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
            <img src={humidity_icon} alt="not found"  className='humidity-icon'/>
            <div>
                <p>{weatherData.humidity}</p>
                <span>himidity</span>
            </div>
            </div>
            <div className="col">
            <img src={wind_icon} alt="not found"  className='wind-icon'/>
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>

            </div>
        </div>
        
        </>:<></>}
        
    </div>
  )
}

