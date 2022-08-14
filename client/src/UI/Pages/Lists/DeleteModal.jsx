import React from 'react';
import './Modal.scss';

const DeleteModal = ({ toggleModal, delFunc, state }) => {
  const submitClicked = (e) => {
    e.stopPropagation();
    delFunc(state._id);
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
