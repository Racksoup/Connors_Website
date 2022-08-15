import React, { useState, useEffect } from 'react';
import './JournalEntry.scss';
import {
  createJournalPost,
  updateJournalPost,
  clearJournal,
  selectJournal,
} from '../../../Redux/calendarSlice';
import { selectIsAuthenticated, selectLoading } from '../../../Redux/adminSlice';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const JournalEntry = () => {
  const dispatch = useDispatch();
  const journal = useSelector(selectJournal);
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

    if (!journal) {
      if (title !== '' && text !== '' && newFile !== '') {
        createJournalPost(newJournal, newFile);
        setRedirect(true);
      }
    } else {
      setNewJournal({ ...newJournal, id: journal._id });
      updateJournalPost(newJournal, newFile);
      setRedirect(true);
    }
  };

  const inputClicked = () => {
    inputFileRef.current.click();
  };

  if (redirect) {
    return <Navigate to='/home' />;
  }

  if (!isAuthenticated && !loading) {
    return <Navigate to='/' />;
  }

  if (journal) {
    return (
      <div className='JournalEntry'>
        <div className='TitleBox'>
          <Link className='Link' to='/home'>
            <div className='Btn' onClick={() => clearJournal()}>
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
          <Textarea
            className='Input'
            type='text'
            name='text'
            value={text}
            onChange={(e) => onChange(e)}
          ></Textarea>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default JournalEntry;
