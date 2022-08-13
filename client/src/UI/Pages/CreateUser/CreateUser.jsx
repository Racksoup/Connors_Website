import React, { useState } from 'react';
import './CreateUser.scss';
import { createUser, selectIsAuthenticated } from '../../../Redux/userSlice';

import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CreateUser = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(createUser(form));
  };

  if (isAuthenticated) {
    return <Navigate to='/user-dashboard' />;
  }

  return (
    <div className='CreateUser'>
      <h1 className='Title'>Create Account</h1>
      <form className='Form' onSubmit={(e) => submitForm(e)}>
        <label htmlFor='' className='Label'>
          Email
        </label>
        <input
          type='text'
          className='Input'
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <label htmlFor='' className='Label'>
          Username
        </label>
        <input
          type='text'
          className='Input'
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <label htmlFor='' className='Label'>
          Password
        </label>
        <input
          type='password'
          className='Input'
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input type='submit' className='Btn' />
      </form>
    </div>
  );
};

export default CreateUser;
