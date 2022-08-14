import React from 'react';
import './Navbar.scss';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../../Redux/adminSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectIsAuthenticated);

  if (auth) {
    return (
      <div className='Navbar'>
        <Link className='Btn' to='/lists'>
          Lists
        </Link>
      </div>
    );
  } else {
    return null;
  }
};

export default Navbar;
