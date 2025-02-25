import React from 'react';
import './Weather.scss';
import { selectCurrent } from '../../../Redux/weatherSlice';

import { useSelector } from 'react-redux';


const Current = () => {
  const currentWeather = useSelector(selectCurrent);

  console.log(currentWeather);
  
  if (currentWeather)
    return <div className='Current'>
      <h3 className='Date'>{currentWeather.dt}</h3>
      <div className='Temp'>

      </div>
      <div className='Info'>

      </div>
    </div>
}

export default Current;
