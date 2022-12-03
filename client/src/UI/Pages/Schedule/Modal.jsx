import React, { useState } from 'react';
import './Modal.scss';

import { useDispatch } from 'react-redux';

const Modal = ({ toggleModal, Func, initState, title }) => {
  const [item, setItem] = useState(initState);
  const dispatch = useDispatch();
  
  const submitClicked = (e) => {
    e.stopPropagation();
    console.log(item);
    dispatch(Func(item));
    toggleModal(false);
  };
  
  const inputChanged = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <div className='Modal-Background' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2 className='Title'>{title}</h2>
        <input type='text' className='Input' name='task' onChange={(e) => inputChanged(e)} value={item.task}/>
        <div className='Btn' onClick={(e) => submitClicked(e)}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default Modal;
