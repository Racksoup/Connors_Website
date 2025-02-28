import React from 'react';
import './Home.scss';

import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdmin, selectIsAuthenticated } from '../../../Redux/adminSlice';
import {
  getRandomWiki,
  getTranslation,
  selectEnglish,
  selectFrench,
} from '../../../Redux/newsSlice';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const french = useSelector(selectFrench);
  const english = useSelector(selectEnglish);
  const auth = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(getRandomWiki());
  }, []);

  useEffect(() => {
    if (english.title) {
      const article = { title: english.title, content: english.content };
      dispatch(getTranslation(article));
    }
  }, [english]);

  if (!auth) {
    return <Navigate to='/admin-login' />;
  } else {
    return (
      <div className='Home'>
        <button className='Btn' onClick={() => dispatch(getRandomWiki())}>
          New Article
        </button>
        {french && (
          <div className='Articles'>
            <div className='Side'>
              <h2>{french.title}</h2>
              <p>{french.content}</p>
            </div>
            {english && (
              <div className='Side'>
                <h2>{english.title}</h2>
                <p>{english.content}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default Home;
