import React from 'react';
import './Home.scss';

import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdmin, selectIsAuthenticated } from '../../../Redux/adminSlice';
import { getNews, getTranslation, selectEnglish, selectFrench } from '../../../Redux/newsSlice';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const french = useSelector(selectFrench);
  const english = useSelector(selectEnglish);
  const auth = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(getNews());
  }, []);

  useEffect(() => {
    if (french.data) {
      const article = { title: french.data[0].title, description: french.data[0].description };
      dispatch(getTranslation(article));
    }
  }, [french]);

  if (french.data) {
    console.log(french);
  }

  if (!auth) {
    return <Navigate to='/admin-login' />;
  } else {
    return (
      <div className='Home'>
        {french.data && (
          <div className='News'>
            <div className='Side'>
              <h2>{french.data[0].title}</h2>
              <p>{french.data[0].description}</p>
            </div>
            {english && (
              <div className='Side'>
                <h2>{english.title}</h2>
                <p>{english.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default Home;
