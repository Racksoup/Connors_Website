import React, { useState, useRef } from 'react';
import './JournalEntry.scss';
import {
  createJournalPost,
  updateJournalPost,
  clearJournal,
  selectJournal,
  selectJournalPostSuccessful,
} from '../../../Redux/calendarSlice';
import { selectIsAuthenticated, selectLoading } from '../../../Redux/adminSlice';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

const JournalEntry = () => {
  const dispatch = useDispatch();
  const journal = useSelector(selectJournal);
  const journalPostSuccessful = useSelector(selectJournalPostSuccessful);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);

  const [newJournal, setNewJournal] = useState({
    title: journal.title,
    text: journal.text,
    _id: journal._id,
  });
  const [newFile, setNewFile] = useState('');
  const [redirect, setRedirect] = useState(false);
  const inputFileRef = useRef(null);

  const { title, text } = newJournal;

  const onChange = (e) => {
    setNewJournal({ ...newJournal, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!journal.title && !journal.text && !journal._id) {
      if (title !== '' && text !== '' && newFile !== '') {
        dispatch(createJournalPost(newJournal, newFile));
        //setRedirect(true);
      }
    } else {
      setNewJournal({ ...newJournal, id: journal._id });
      dispatch(updateJournalPost(newJournal, newFile));
      //setRedirect(true);
    }
  };

  const inputClicked = () => {
    inputFileRef.current.click();
  };

  if (redirect) {
    return <Navigate to='/calendar' />;
  }

  if (!isAuthenticated && !loading) {
    return <Navigate to='/admin-login' />;
  }

  if (journal) {
    return (
      <div className='JournalEntry'>
        {journalPostSuccessful && <div className='SuccessModal'>Post Successful</div>}
        <div className='TitleBox'>
          <Link className='Link' to='/calendar'>
            <div className='Btn' onClick={() => dispatch(clearJournal())}>
              Back
            </div>
          </Link>
          <input
            className='Input'
            type='text'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
          <div className='Btn' onClick={(e) => onSubmit(e)}>
            Submit
          </div>
        </div>
        <div className='Content'>
          <div className='ButtonsFrame'>
            {newFile.name ? (
              <p className='Label'>{newFile.name}</p>
            ) : (
              <p className='Label'>Upload Image:</p>
            )}
            <input
              className='ImgInput'
              type='file'
              name='file'
              ref={inputFileRef}
              onChange={(e) => onFileChange(e)}
            ></input>
            <div className='Btn' onClick={() => inputClicked()} />
          </div>
          <div className='EditPictures'>
            {journal.image_filename && (
              <img className='PictureFrame' src={`api/journal/image/${journal.image_filename}`} />
            )}
          </div>
          <textarea
            className='Input'
            type='text'
            name='text'
            value={text}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default JournalEntry;
