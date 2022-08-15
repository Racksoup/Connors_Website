import React from 'react';
import './calendar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const YearLayout = ({
  rightCenturyButtonClicked,
  leftCenturyButtonClicked,
  currentYear,
  yearClicked,
}) => {
  const printYears = () => {
    let preYear = Math.floor(currentYear / 100);
    let arr = [];
    for (let i = 0; i < 100; i++) {
      let postYear = i.toString();
      if (i < 10) {
        postYear = `0${i}`;
      }
      let fullYear = preYear + postYear;
      console.log(fullYear);
      arr.push(
        <div className='Item' onClick={() => yearClicked(fullYear)}>
          {fullYear}
        </div>
      );
    }
    return arr;
  };
  return (
    <div className='Calendar'>
      <div className='TitleBox'>
        <div className='MonthNavBtn' onClick={() => leftCenturyButtonClicked()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <p className='Title-Year'>
          {`${Math.floor(currentYear / 100)}00 - ${Math.floor(currentYear / 100) + 1}00`}
        </p>
        <div className='MonthNavBtn' onClick={() => rightCenturyButtonClicked()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <div className='Grid-Year'>{printYears()}</div>
    </div>
  );
};

export default YearLayout;
