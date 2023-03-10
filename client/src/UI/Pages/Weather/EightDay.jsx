import React, { useEffect, useState } from 'react';
import './Weather.scss';
import { selectDaily } from '../../../Redux/weatherSlice';

import { useSelector } from 'react-redux';

const EightDay = () => {
  const Daily = useSelector(selectDaily);

  return (
    <div className='EightDay'>
      {Daily.map((x, i) => {
        const date = new Date(x.dt * 1000);
        const dayOfMonth = date.getDate();

        return (
          <div className='Day' key={i}>
            <div className='Date'>{dayOfMonth}</div>
            <div className='TempLine'>
              <p className='Time'>Morning</p>
              <p className='Temp'>{Math.floor((x.temp.morn - 273.15) * 100) / 100}</p>
            </div>
            <div className='TempLine'>
              <p className='Time'>Day</p>
              <p className='Temp'>{Math.floor((x.temp.day - 273.15) * 100) / 100}</p>
            </div>
            <div className='TempLine'>
              <p className='Time'>Eve</p>
              <p className='Temp'>{Math.floor((x.temp.eve - 273.15) * 100) / 100}</p>
            </div>
            <div className='TempLine'>
              <p className='Time'>Night</p>
              <p className='Temp'>{Math.floor((x.temp.night - 273.15) * 100) / 100}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EightDay;
