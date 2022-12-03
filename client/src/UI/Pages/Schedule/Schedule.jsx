import React, { useState, useEffect } from 'react';
import './Schedule.scss';
import {
  selectTasks,
  deleteTask,
  updateTask,
  createTask,
  getTasks,
} from '../../../Redux/scheduleSlice';
import Modal from './Modal.jsx';

import { useSelector, useDispatch } from 'react-redux';

const Schedule = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const [task, setTask] = useState({task: '', date: ''});
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const xDate = new Date();
  const currDate = new Date(xDate.getFullYear(), xDate.getMonth(), xDate.getDate());
  const [next14Days, setNext14Days] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    let daysArr = [];
    for (let i = 0; i < 14; i++) {
      daysArr.push(new Date(currDate.getTime() + i * 86400000));
    }
    setNext14Days(daysArr);
    dispatch(getTasks(daysArr));
  }, []);

  if (tasks) {
    return (
      <div className='Schedule'>
        {updateModal == true && (
          <Modal
            toggleModal={setUpdateModal}
            Func={updateTask}
            initState={task}
            title='Update Task'
          />
        )}
        {createModal == true && (
          <Modal
            toggleModal={setCreateModal}
            Func={createTask}
            initState={task}
            title='Add Task'
          />
        )}
        <h2>Schedule</h2>
        <div className='Table'>
          {next14Days.map((day, i) => {
            let daysTasks = tasks.filter((t) => new Date(t.date).getDate() === day.getDate());

            return (
              <div key={i} className='Day'>
                <div className='Header'>
                  <div className='Date'>
                    {daysOfWeek[day.getDay()]} {day.getDate()} {monthsOfYear[day.getMonth() + 1]}
                  </div>
                  <button
                    className='Create'
                    onClick={() => {
                      setTask({ task: '', date: new Date(day.getFullYear(), day.getMonth(), day.getDate())});
                      console.log(task)
                      setCreateModal(true);
                    }}
                  >
                    +
                  </button>
                </div>
                {daysTasks.map((t, j) => (
                  <div key={j} className='Item'>
                    <button className='Delete' onClick={() => dispatch(deleteTask(t._id))}>
                      X
                    </button>
                    <button
                      className='Update'
                      onClick={() => {
                        setTask(t);
                        setUpdateModal(true);
                      }}
                    >
                      &#8593;
                    </button>
                    {t.task}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else return null;
};

export default Schedule;
