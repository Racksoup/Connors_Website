import React from 'react';
import './Calendar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const MonthLayout = ({
  leftYearButtonClicked,
  rightYearButtonClicked,
  toggleCalendarLayout,
  monthItemClicked,
  currentYear,
  monthsOfYear,
}) => {
  return (
    <div className='Calendar'>
      <div className='TitleBox'>
        <div className='MonthNavBtn' onClick={() => leftYearButtonClicked()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <p className='Title-Month' onClick={() => toggleCalendarLayout(2)}>
          {currentYear}
        </p>
        <div className='MonthNavBtn' onClick={() => rightYearButtonClicked()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <div className='Grid-Month'>
        {monthsOfYear.map((month, i) => {
          return (
            <div className='Month' onClick={() => monthItemClicked(i)}>
              {month}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthLayout;
