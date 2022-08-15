import React from 'react';
import './JournalView.scss';
import { clearJournal, selectJournal } from '../../../Redux/calendarSlice';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

const JournalView = () => {
  const dispatch = useDispatch();
  const journal = useSelector(selectJournal);

  if (journal.title === '') {
    return <Navigate to='/journal-entry' />;
  }

  let textArr = [];
  if (journal && journal.text) {
    textArr = journal.text.split('\n\n');
  }
  return (
    <div className='JournalView'>
      <div className='TitleBox'>
        <Link to='/calendar' className='Link'>
          <div className='Btn' onClick={() => dispatch(clearJournal())}>
            Back
          </div>
        </Link>
        <p className='Title'>{journal.title}</p>
        <Link to='/journal-entry' className='Link'>
          <div className='Btn'>Edit</div>
        </Link>
      </div>
      <div className='Content'>
        <div className='PictureFrame'>
          <img className='Img' src={`api/journal/image/${journal.image_filename}`} />
        </div>
        <div className='Text'>
          {textArr.map((text) => (
            <p>{text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalView;
