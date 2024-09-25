import React from 'react';
import './Calendar.scss';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const DayLayout = ({
  leftMonthButtonClicked,
  rightMonthButtonClicked,
  toggleCalendarLayout,
  currentYear,
  daysOfMonth,
  journals,
  todayClicked,
  currentMonth,
}) => {
  return (
    <div className='Calendar'>
      <div className='TitleBox'>
        <div className='MonthNavBtn' onClick={() => leftMonthButtonClicked()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <p className='Title' onClick={() => toggleCalendarLayout(1)}>
          {currentMonth} - {currentYear}
        </p>
        <div className='MonthNavBtn' onClick={() => rightMonthButtonClicked()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <div className='Grid'>
        <p className='DayOfWeek'>{window.innerWidth > 700 ? 'Sunday' : 'Sun'}</p>
        <p className='DayOfWeek'>{window.innerWidth > 700 ? 'Monday' : 'Mon'}</p>
        <p className='DayOfWeek'>{window.innerWidth > 700 ? 'Tuesday' : 'Tues'}</p>
        <p className='DayOfWeek'>{window.innerWidth > 700 ? 'Wednesday' : 'Wed'}</p>
        <p className='DayOfWeek'>{window.innerWidth > 700 ? 'Thursday' : 'Thur'}</p>
        <p className='DayOfWeek'>{window.innerWidth > 700 ? 'Friday' : 'Fri'}</p>
        <p className='DayOfWeek'>{window.innerWidth > 700 ? 'Saturday' : 'Sat'}</p>
        {daysOfMonth &&
          journals &&
          daysOfMonth.map((day) => {
            return (
              <div
                className='Day'
                onClick={() => {
                  todayClicked(journals[day.journalIndex], day.thisDaysDate);
                  console.log(day.thisDaysDate);
                }}
              >
                <Link to='/journal-view' className='Link'>
                  <div className='Content'>
                    {journals[day.journalIndex] &&
                      journals[day.journalIndex].image_filename !== undefined && (
                        <img
                          src={`api/journal/image/${journals[day.journalIndex].image_filename}`}
                          className='Img'
                        />
                      )}
                    <div className='Overlay'>
                      <p className='Num'>{day.dayOfMonth}</p>
                      {journals[day.journalIndex] && (
                        <p className='Title'>{journals[day.journalIndex].title}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DayLayout;
