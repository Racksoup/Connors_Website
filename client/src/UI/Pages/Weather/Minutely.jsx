import React, { useState } from 'react';
import './Weather.scss';
import { selectMinutely } from '../../../Redux/weatherSlice';

import { useSelector } from 'react-redux';

const Minutely = () => {
  const minutely = useSelector(selectMinutely);

  const [date, setDate] = useState(
    new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
  );

  let currMinute = date.split(' ');
  currMinute = currMinute[1];
  currMinute = currMinute.substring(0, currMinute.length - 3);
  currMinute = currMinute.substring(currMinute.length - 2, currMinute.length);
  let tagMin = currMinute;

  if (minutely) {
    return (
      <div className='Weather'>
        <h1 className='Title'>Minutely Precipitation</h1>
        <div className='Minutely'>
          {minutely.map((minute, i) => {
            if (tagMin > 59) {
              tagMin = 0;
            }
            tagMin++;
            if (i !== 60) {
              return (
                <div style={{ display: 'flex' }}>
                  Min {tagMin}: {minute.precipitation}
                </div>
              );
            } else return null;
          })}
        </div>
      </div>
    );
  } else return null;
};

export default Minutely;
