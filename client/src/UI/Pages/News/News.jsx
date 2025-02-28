import React from 'react';
import './News.scss';
import { getWorldNews, selectWorldNews } from '../../../Redux/worldNewsAPISlice';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const News = () => {
  const dispatch = useDispatch();
  const worldNews = useSelector(selectWorldNews);

  const click = () => {
    dispatch(getWorldNews());
    console.log(worldNews);
  };

  console.log(worldNews);

  return (<div className='News'>
    <button onClick={() => click()}>get news</button>
  </div>)
}

export default News;
