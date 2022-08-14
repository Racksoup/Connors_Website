import React, { useEffect } from 'react';
import './App.scss';
import { loadAdmin } from './Redux/adminSlice';
import Home from './UI/Pages/Home/Home.jsx';
import AdminLogin from './UI/Pages/AdminLogin/AdminLogin.jsx';
import Navbar from './UI/Components/Navbar/Navbar.jsx';
import Footer from './UI/Components/Footer/Footer.jsx';
import Lists from './UI/Pages/Lists/Lists.jsx';
import Weather from './UI/Pages/Weather/Weather.jsx';

import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdmin());
  }, []);

  return (
    <div className='App-Main'>
      <div className='App-Background' />
      <div className='App-Content'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/admin-login' element={<AdminLogin />} />
          <Route exact path='/lists' element={<Lists />} />
          <Route exact path='/weather' element={<Weather />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
