import React from 'react';
import './Home_Mobile.scss';
import cloud from '../../../images/cloud.png';
import { selectCurrent, selectHourly } from '../../../Redux/weatherSlice';
import Mobile_Footer from '../../Components/Mobile_Footer/Mobile_Footer.jsx'

import { useSelector } from 'react-redux';

const Home_Mobile = () => {
  const currentWeather = useSelector(selectCurrent);
  const hourlyWeather = useSelector(selectHourly);
  
  if (!currentWeather || !hourlyWeather) return null;
  console.log(hourlyWeather);

  const next18Hours = hourlyWeather.slice(0,18);

  const {high, low} = next18Hours.reduce(
    (acc, hour) => {
      acc.high = Math.max(acc.high, hour.temp);
      acc.low = Math.min(acc.low, hour.temp);
      return acc;
    },
    { high: -Infinity, low: Infinity }
  );

  const highC = Math.round(high - 273.15);
  const lowC = Math.round(low - 273.15);


  const dateObj = new Date(currentWeather.dt * 1000);

  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const weekday = dateObj.toLocaleString("en-US", { weekday: "long" });
  const month = dateObj.toLocaleString("en-US", { month: "long" });

  const formattedDate = `${weekday}, ${month} ${getOrdinal(dateObj.getDate())}`;

  return(
    <div className='home_mobile'>
      <div className='content'>
        <p className='quote'>
          a quote goes here
        </p>
        <div className='weather'>
          <img src={cloud} alt='weather-img' className='weather-img'/>
          <div className='info'>
            <p className='date'>{formattedDate}</p>
            <div className='temp-row'>
              <div className='temp-box'>
                <p className='temp'>{Math.floor(currentWeather.temp - 273.15)}</p>
                <p className='deg'>°</p>
              </div>
              <div className='real-box'>
                <p className='real-text'>feel</p>
                <p className='real-temp'>{Math.floor(currentWeather.feels_like - 273.15)}</p>
                <p className='deg'>°</p>
              </div>
            </div>
            <div className='misc-info'>
              <div className='text-info'>
                <p className='weather-condition'>{currentWeather.weather[0].main}</p>
                <p className='wind'>Wind: {Math.floor(currentWeather.wind_speed)}</p>
                <p className='humidity'>Humidity: {Math.floor(currentWeather.humidity)}</p>
              </div>
              <div className='high-low'>
                <div className='high-low-row'>
                  <p>H</p><p>{highC}</p>
                </div>
                <div className='high-low-row'>
                  <p>L</p><p>{lowC}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='tasks'>
          <div className='task'>
            <div className='time'>
              <p className='start'>1:00pm</p>
              <p className='end'>3:00pm</p>
            </div>
            <div className='spacer'></div>
            <p className='info'>
              Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class!Go to class!
            </p>
          </div>
          <div className='task'>
            <div className='time'>
              <p className='start'>1:00pm</p>
              <p className='end'>3:00pm</p>
            </div>
            <div className='spacer'></div>
            <p className='info'>
              Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class!Go to class!
            </p>
          </div>
          <div className='task'>
            <div className='time'>
              <p className='start'>1:00pm</p>
              <p className='end'>3:00pm</p>
            </div>
            <div className='spacer'></div>
            <p className='info'>
              Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class!Go to class!
            </p>
          </div>
        </div>
        <div className='quick-btns'>
          <button className='btn'>Add Task</button>
          <button className='btn'>Ask AI</button>
          <button className='btn'>Quick Note</button>
        </div>
      </div>
      <Mobile_Footer />
    </div>
  )
}

export default Home_Mobile;

