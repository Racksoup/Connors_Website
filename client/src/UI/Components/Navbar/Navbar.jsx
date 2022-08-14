import React from 'react';
import './Navbar.scss';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, selectLoading } from '../../../Redux/adminSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);

  if (auth && !loading) {
    return (
      <div className='Navbar'>
        <Link className='Btn' to='/'>
          Home
        </Link>
        <Link className='Btn' to='/lists'>
          Lists
        </Link>
        <Link className='Btn' to='/weather'>
          Weather
        </Link>
      </div>
    );
  } else {
    return null;
  }
};

export default Navbar;
