import React from 'react';
import './Home.scss';

import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdmin, selectIsAuthenticated } from '../../../Redux/adminSlice';

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectIsAuthenticated);

  if (!auth) {
    return <Navigate to='/admin-login' />;
  } else {
    return <div className='Home'>Home</div>;
  }
};

export default Home;
