import React from 'react';
import './Home.scss';
import Home_Mobile from './Home_Mobile.jsx'
import Navbar from '../../Components/Navbar/Navbar.jsx'

import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdmin, selectIsAuthenticated } from '../../../Redux/adminSlice';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectIsAuthenticated);

  if (!auth) {
    return <Navigate to='/admin-login' />;
  } else {
    return (
      <div className='Home'>
        {window.innerWidth > 412 ?
        <Navbar />
        :
        <Home_Mobile />
        }
      </div>
    );
  }
};

export default Home;
