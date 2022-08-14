import React from 'react';
import './App.scss';
import Home from './UI/Pages/Home/Home.jsx';
import AdminLogin from './UI/Pages/AdminLogin/AdminLogin.jsx';
import Navbar from './UI/Components/Navbar/Navbar.jsx';
import Footer from './UI/Components/Footer/Footer.jsx';
import Lists from './UI/Pages/Lists/Lists.jsx';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className='App-Main'>
      <div className='App-Background' />
      <div className='App-Content'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/admin-login' element={<AdminLogin />} />
          <Route exact path='/lists' element={<Lists />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
