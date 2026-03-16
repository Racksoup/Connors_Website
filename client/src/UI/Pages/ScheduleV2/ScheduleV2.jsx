import React, {useState, useEffect} from 'react';
import './ScheduleV2.scss';
import {
  selectTasks,
  selectLastTasks,
  deleteTask,
  updateTask,
  createTask,
  getTasks,
  getLastTasks,
} from '../../../Redux/scheduleSlice';
import { selectIsAuthenticated, selectLoading } from '../../../Redux/adminSlice';
import AddTaskModal from './AddTaskModal.jsx';

import { useSelector, useDispatch } from 'react-redux';

const ScheduleV2 = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const tasks = useSelector(selectTasks);
  const [addTaskModal, setAddTaskModal] = useState(false);

  if (!isAuthenticated && !loading) {
    return <Navigate to='/admin-login' />;
  }

  return (
    <div className='ScheduleV2'>
      {addTaskModal && (<AddTaskModal addTaskModal={addTaskModal} setAddTaskModal={setAddTaskModal}/>)}
       <div className='tasks'>
          <div className='task'>
            <div className='time'>
              <p className='start'>1:00pm</p>
              <p className='end'>3:00pm</p>
            </div>
            <div className='spacer'></div>
            <p className='info'>
              Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class!Go to class!
            </p>
          </div>
          <div className='task'>
            <div className='time'>
              <p className='start'>1:00pm</p>
              <p className='end'>3:00pm</p>
            </div>
            <div className='spacer'></div>
            <p className='info'>
              Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class!Go to class!
            </p>
          </div>
          <div className='task'>
            <div className='time'>
              <p className='start'>1:00pm</p>
              <p className='end'>3:00pm</p>
            </div>
            <div className='spacer'></div>
            <p className='info'>
              Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class! Go to class!Go to class!
            </p>
          </div>
        </div>
      <button className='add-task' onClick={() => setAddTaskModal(true)}>Add Task</button>
    </div>
  )
}

export default ScheduleV2;
