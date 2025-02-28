import React from 'react';
import './Weather.scss';
import { selectCurrent } from '../../../Redux/weatherSlice';

import { useSelector } from 'react-redux';

const Current = () => {
  const currentWeather = useSelector(selectCurrent);

  console.log(currentWeather);
  
  if (currentWeather)
    return <div className='Current'>
      <h3 className='Date'>
        <p>{new Date(currentWeather.dt * 1000).toLocaleString('en-us',{month:'long'})}</p>
        <p>&nbsp;</p>
        <p>{new Date(currentWeather.dt * 1000).getDate()}</p>
      </h3>
      <div className='Temp'>
        <div className='Left'>
          <p> Current </p>
          <p className='Val'>{Math.floor((currentWeather.temp - 273.15) *100) /100}</p>
        </div>
        <div className='Right'>
          <p> Feel </p>
          <p className='Val'>{Math.floor((currentWeather.feels_like - 273.15) *100) /100}</p>
        </div>
      </div>
      <div className='Info'>

      </div>
    </div>
}

export default Current;



