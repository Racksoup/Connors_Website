import React from 'react';
import './AddTaskModal.scss';

const AddTaskModal = ({ addTaskModal, setAddTaskModal}) => {
  
  return (
    <div className='AddTaskModal' onClick={() => setAddTaskModal(false)}>
      <div className='content' onClick={(e) => e.stopPropagation()}>
        
      </div>
    </div>
  )
}

export default AddTaskModal;
