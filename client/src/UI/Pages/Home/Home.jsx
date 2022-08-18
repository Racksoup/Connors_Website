import React from 'react';
import './Home.scss';

import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdmin, selectIsAuthenticated } from '../../../Redux/adminSlice';
import { getNews, selectNews } from '../../../Redux/newsSlice';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const auth = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(getNews());
  }, []);

  if (news) {
    console.log(news);
  }

  if (!auth) {
    return <Navigate to='/admin-login' />;
  } else {
    return (
      <div className='Home'>
        {news.data && (
          <div className='News'>
            <div className='Side'>
              <h2>{news.data[0].title}</h2>
              <p>{news.data[0].description}</p>
            </div>
            <div className='Side'>
              <h2>{news.data[1].title}</h2>
              <p>{news.data[1].description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Home;
