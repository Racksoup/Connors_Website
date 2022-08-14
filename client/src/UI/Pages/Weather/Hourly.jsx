import React, { useState } from 'react';
import { selectHourly } from '../../../Redux/weatherSlice';
import './Weather.scss';

import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

const Hourly = () => {
  const hourly = useSelector(selectHourly);

  const [time, setTime] = useState(
    new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
  );

  let currHour = time.split(' ');
  let dayNight = currHour[2];
  currHour = currHour[1];
  currHour = currHour.substring(0, currHour.length - 6);
  let hourTag = currHour;

  if (hourly) {
    return (
      <div className='Weather'>
        <h1 className='Title'>Hourly</h1>
        <Table bordered variant='dark' style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
          <thead>
            <tr style={{ color: 'white' }}>
              <th>Hour</th>
              <th>Temp</th>
              <th>Weather</th>
              <th>Humidity</th>
              <th>Pressure</th>
              <th>Wind Speed</th>
              <th>Clouds</th>
              <th>Pop</th>
            </tr>
          </thead>
          <tbody>
            {hourly.map((hour) => {
              if (hourTag > 11) {
                hourTag = 0;
                if (dayNight === 'PM') {
                  dayNight = 'AM';
                } else if (dayNight === 'AM') {
                  dayNight = 'PM';
                }
              }
              hourTag++;
              return (
                <tr style={{ color: 'white' }}>
                  <td>
                    {hourTag}
                    {dayNight}
                  </td>
                  <td>{(hour.feels_like - 273.15).toFixed(2)}&#176;</td>
                  <td>{hour.weather[0].main}</td>
                  <td>{hour.humidity}%</td>
                  <td>{hour.pressure}</td>
                  <td>{hour.wind_speed}</td>
                  <td>{hour.clouds}%</td>
                  <td>{Math.round(hour.pop * 100)}%</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  } else return null;
};

export default Hourly;
