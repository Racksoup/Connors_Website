import React, { useState } from 'react';
import './Modal.scss';

import { useDispatch } from 'react-redux';

const Modal = ({ toggleModal, createListFunc, initState, title, resize }) => {
  const [item, setItem] = useState(initState);
  const dispatch = useDispatch();

  const submitClicked = (e) => {
    e.stopPropagation();
    dispatch(createListFunc(item));
    toggleModal(false);
  };

  const inputChanged = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <div className='Modal-Background' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2 className='Title'>{title}</h2>
        {resize == false && (
          <input
            className='Input'
            value={item.title}
            onChange={(e) => inputChanged(e)}
            name='title'
          />
        )}
        {resize == true && (
          <textarea
            className='Input'
            value={item.title}
            onChange={(e) => inputChanged(e)}
            name='title'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitClicked(e);
              }
            }}
          />
        )}
        <div className='Btn' onClick={(e) => submitClicked(e)}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default Modal;
