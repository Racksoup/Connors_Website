import React from 'react';
import './Modal.scss';

import { useDispatch } from 'react-redux';

const DeleteModal = ({ toggleModal, delFunc, state }) => {
  const dispatch = useDispatch();

  const submitClicked = (e) => {
    e.stopPropagation();
    dispatch(delFunc(state._id));
    toggleModal(false);
  };

  return (
    <div className='Modal-Background' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2 className='Title'>Delete Item?</h2>
        <div className='Btn Btn-Del' onClick={(e) => submitClicked(e)}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
