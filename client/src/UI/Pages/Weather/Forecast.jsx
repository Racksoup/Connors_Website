import React, { useEffect, useState } from 'react';
import './Weather.scss';
import { getFourDay, selectForecast } from '../../../Redux/weatherSlice';

import { useDispatch, useSelector } from 'react-redux';

const Forecast = () => {
  const dispatch = useDispatch();
  const forecast = useSelector(selectForecast);

  useEffect(() => {
    dispatch(getFourDay());
  }, []);

  useEffect(() => {
    if (forecast || forecast !== null || undefined || '') {
      setForecast();
    }
  }, [forecast]);

  const [dayForecast, setDayForecast] = useState({
    day1: '',
    day2: '',
    day3: '',
    day4: '',
    day5: '',
    day6: '',
  });

  const setForecast = () => {
    let previousDay;
    let count = 0;
    let days = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    };

    forecast.list.map((data) => {
      const timeAndDay = data.dt_txt.split(' ');
      const day = timeAndDay[0].split('-');
      const currentDay = day[2];
      let time = timeAndDay[1].replace(/0/g, '');
      let tag;
      time = time.replace(/:/g, '');
      if (time < 12) {
        tag = 'am';
      } else {
        tag = 'pm';
      }
      if (parseInt(time) > 13) {
        time -= 12;
      }
      if (time === '') {
        time = '12';
      }
      if (!previousDay) {
        previousDay = currentDay;
      }
      if (previousDay !== currentDay) {
        count++;
      }
      days[count].push({
        day: currentDay,
        date: timeAndDay[0],
        time: time,
        temp: data.main.feels_like,
        tag: tag,
        weather: data.weather[0].main,
      });
      previousDay = currentDay;
    });

    if (days[5].length != 0) {
      setDayForecast({
        ...dayForecast,
        day1: days[0],
        day2: days[1],
        day3: days[2],
        day4: days[3],
        day5: days[4],
        day6: days[5],
      });
    } else {
      setDayForecast({
        ...dayForecast,
        day1: days[0],
        day2: days[1],
        day3: days[2],
        day4: days[3],
        day5: days[4],
      });
    }
  };

  return (
    <div className='Weather'>
      <h1 className='Title'>Forecast</h1>

      <div className='Forecast'>
        <div className='Forecast-DayFlex'>
          <h4>{dayForecast.day1 && dayForecast.day1[0].day}</h4>
          {dayForecast.day1 &&
            dayForecast.day1.map((hour) => {
              return (
                <div className='Forecast-HourFlex'>
                  <div className='Forecast-HourItem'>
                    <div>{hour.time}</div>
                    <div>{hour.tag}</div>
                  </div>
                  <div className='Forecast-HourItem'>{(hour.temp - 273.15).toFixed(2)}</div>
                  <div className='Forecast-HourItem'>{hour.weather}</div>
                </div>
              );
            })}
        </div>
        <div className='Forecast-DayFlex'>
          <h4>{dayForecast.day2 && dayForecast.day2[0].day}</h4>
          {dayForecast.day2 &&
            dayForecast.day2.map((hour) => {
              return (
                <div className='Forecast-HourFlex'>
                  <div className='Forecast-HourItem'>
                    <div>{hour.time}</div>
                    <div>{hour.tag}</div>
                  </div>
                  <div className='Forecast-HourItem'>{(hour.temp - 273.15).toFixed(2)}</div>
                  <div className='Forecast-HourItem'>{hour.weather}</div>
                </div>
              );
            })}
        </div>
        <div className='Forecast-DayFlex'>
          <h4>{dayForecast.day3 && dayForecast.day3[0].day}</h4>
          {dayForecast.day3 &&
            dayForecast.day3.map((hour) => {
              return (
                <div className='Forecast-HourFlex'>
                  <div className='Forecast-HourItem'>
                    <div>{hour.time}</div>
                    <div>{hour.tag}</div>
                  </div>
                  <div className='Forecast-HourItem'>{(hour.temp - 273.15).toFixed(2)}</div>
                  <div className='Forecast-HourItem'>{hour.weather}</div>
                </div>
              );
            })}
        </div>
        <div className='Forecast-DayFlex'>
          <h4>{dayForecast.day4 && dayForecast.day4[0].day}</h4>
          {dayForecast.day4 &&
            dayForecast.day4.map((hour) => {
              return (
                <div className='Forecast-HourFlex'>
                  <div className='Forecast-HourItem'>
                    <div>{hour.time}</div>
                    <div>{hour.tag}</div>
                  </div>
                  <div className='Forecast-HourItem'>{(hour.temp - 273.15).toFixed(2)}</div>
                  <div className='Forecast-HourItem'>{hour.weather}</div>
                </div>
              );
            })}
        </div>
        <div className='Forecast-DayFlex'>
          <h4>{dayForecast.day5 && dayForecast.day5[0].day}</h4>
          {dayForecast.day5 &&
            dayForecast.day5.map((hour) => {
              return (
                <div className='Forecast-HourFlex'>
                  <div className='Forecast-HourItem'>
                    <div>{hour.time}</div>
                    <div>{hour.tag}</div>
                  </div>
                  <div className='Forecast-HourItem'>{(hour.temp - 273.15).toFixed(2)}</div>
                  <div className='Forecast-HourItem'>{hour.weather}</div>
                </div>
              );
            })}
        </div>
        <div className='Forecast-DayFlex'>
          <h4>{dayForecast.day6 && dayForecast.day6[0].day}</h4>
          {dayForecast.day6 &&
            dayForecast.day6.map((hour) => {
              return (
                <div className='Forecast-HourFlex'>
                  <div className='Forecast-HourItem'>
                    <div>{hour.time}</div>
                    <div>{hour.tag}</div>
                  </div>
                  <div className='Forecast-HourItem'>{(hour.temp - 273.15).toFixed(2)}</div>
                  <div className='Forecast-HourItem'>{hour.weather}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
