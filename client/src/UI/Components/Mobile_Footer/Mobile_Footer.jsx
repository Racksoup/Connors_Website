import React from 'react';
import './Mobile_Footer.scss';
import homeIcon from '../../../images/home-icon.jpg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBook,
  faCheck,
  faScroll,
  faSun,
  faCalendar,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";


const Mobile_Footer = () => {
  
  return(
    <div className='mobile_footer'>
      <button className='btn'>
        <FontAwesomeIcon icon={faHouse} className="icon" />
      </button>
      <button className='btn'>
        <FontAwesomeIcon icon={faBook} className="icon" />
      </button>
      <button className='btn'>
        <FontAwesomeIcon icon={faCheck} className="icon" />
      </button>
      <button className='btn'>
        <p>AI</p>
      </button>
      <button className='btn'>
        <FontAwesomeIcon icon={faScroll} className="icon" />
      </button>
      <button className='btn'>
        <FontAwesomeIcon icon={faSun} className="icon" />
      </button>
      <button className='btn'>
        <FontAwesomeIcon icon={faCalendar} className="icon" />
      </button>
      <button className='btn'>
        <FontAwesomeIcon icon={faBullseye} className="icon" />
      </button>
    </div>
  )
}

export default Mobile_Footer;
