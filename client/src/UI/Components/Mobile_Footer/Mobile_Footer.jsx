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
import { Link } from 'react-router-dom';


const Mobile_Footer = () => {
  
  return(
    <div className='mobile_footer'>
      <Link className='btn' to='/'>
        <FontAwesomeIcon icon={faHouse} className="icon" />
      </Link>
      <Link className='btn' to='/lists'>
        <FontAwesomeIcon icon={faBook} className="icon" />
      </Link>
      <Link className='btn' to='/schedule'>
        <FontAwesomeIcon icon={faCheck} className="icon" />
      </Link>
      <Link className='btn'>
        <p>AI</p>
      </Link>
      <Link className='btn' to='/news'>
        <FontAwesomeIcon icon={faScroll} className="icon" />
      </Link>
      <Link className='btn' to='/weather'>
        <FontAwesomeIcon icon={faSun} className="icon" />
      </Link>
      <Link className='btn' to='/calendar'>
        <FontAwesomeIcon icon={faCalendar} className="icon" />
      </Link>
      <Link className='btn'>
        <FontAwesomeIcon icon={faBullseye} className="icon" />
      </Link>
    </div>
  )
}

export default Mobile_Footer;
