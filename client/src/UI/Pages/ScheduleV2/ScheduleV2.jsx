import React, {useState, useEffect} from 'react';
import './ScheduleV2.scss';
import {
  selectTasks,
  deleteTask,
  updateTask,
  getTasks,
} from '../../../Redux/scheduleSlice';
import { selectIsAuthenticated, selectLoading } from '../../../Redux/adminSlice';
import AddTaskModal from './AddTaskModal.jsx';

import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

const ScheduleV2 = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const tasks = useSelector(selectTasks);
  const [addTaskModal, setAddTaskModal] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
  }, [])

  const formatTime = (t) => {
    return dayjs(t).format('h:mmA').toLowerCase(); // 5:20pm
  };

  if (!isAuthenticated && !loading) {
    return <Navigate to='/admin-login' />;
  }
    
  console.log(tasks);
  if (tasks) { return (
    <div className='ScheduleV2'>
      {addTaskModal && (<AddTaskModal addTaskModal={addTaskModal} setAddTaskModal={setAddTaskModal}/>)}
       <div className='tasks'>
         {tasks.map((task) => {return (
           <div className='task'>
             <div className='time'>
               <p className='start'>{formatTime(task.start_time)}</p>
               <p className='end'>{formatTime(task.end_time)}</p>
             </div>
             <div className='spacer'></div>
             <p className='info'> {task.task} </p>
          </div>
        )})}
      </div>
      <button className='add-task' onClick={() => setAddTaskModal(true)}>Add Task</button>
    </div>
  )}
}

export default ScheduleV2;
