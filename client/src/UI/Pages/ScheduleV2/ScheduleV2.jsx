import React, { useState, useEffect, useMemo } from 'react';
import './ScheduleV2.scss';
import {
  selectTasks,
  deleteTask,
  getTasks,
} from '../../../Redux/scheduleSlice';
import { selectIsAuthenticated, selectLoading } from '../../../Redux/adminSlice';
import AddTaskModal from './AddTaskModal.jsx';

import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import dayjs from 'dayjs';

const ScheduleV2 = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const tasks = useSelector(selectTasks);
  const [addTaskModal, setAddTaskModal] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const formatTime = (t) => {
    return dayjs(t).format('h:mma'); // 5:20pm
  };

  const formatDayTitle = (dateString) => {
    return dayjs(dateString).format('dddd, MMMM D, YYYY');
  };

  const groupedTasks = useMemo(() => {
    if (!tasks || !Array.isArray(tasks)) return { undated: [], datedGroups: [] };

    const undated = [];
    const datedMap = {};

    tasks.forEach((task) => {
      if (!task.date) {
        undated.push(task);
        return;
      }

      const dayKey = dayjs(task.date).format('YYYY-MM-DD');

      if (!datedMap[dayKey]) {
        datedMap[dayKey] = [];
      }

      datedMap[dayKey].push(task);
    });

    undated.sort((a, b) => {
      const aTime = a.start_time ? dayjs(a.start_time).valueOf() : Number.MAX_SAFE_INTEGER;
      const bTime = b.start_time ? dayjs(b.start_time).valueOf() : Number.MAX_SAFE_INTEGER;
      return aTime - bTime;
    });

    const datedGroups = Object.entries(datedMap)
      .sort(([a], [b]) => dayjs(a).valueOf() - dayjs(b).valueOf())
      .map(([dayKey, dayTasks]) => ({
        dayKey,
        title: formatDayTitle(dayKey),
        tasks: dayTasks.sort((a, b) => {
          const aTime = a.start_time ? dayjs(a.start_time).valueOf() : Number.MAX_SAFE_INTEGER;
          const bTime = b.start_time ? dayjs(b.start_time).valueOf() : Number.MAX_SAFE_INTEGER;
          return aTime - bTime;
        }),
      }));

    return { undated, datedGroups };
  }, [tasks]);

  if (!isAuthenticated && !loading) {
    return <Navigate to='/admin-login' />;
  }
  
  const renderTaskRow = (task) => {
    return (
      <div className='task' key={task._id}>
        <div className='task-main'>
          <div className='time'>
            {task.start_time && (
              <p className='start'>{formatTime(task.start_time)}</p>
            )}
            {task.end_time && (
              <p className='end'>{formatTime(task.end_time)}</p>
            )}
          </div>

          <div className='spacer'></div>

          <p className='info'>{task.task}</p>
        </div>

        <button className='hide-btn' type='button' onClick={() => dispatch(deleteTask(task._id))}>
          X
        </button>
      </div>
    );
  };

  if (tasks) { return (
    <div className='ScheduleV2'>
      {addTaskModal && (<AddTaskModal addTaskModal={addTaskModal} setAddTaskModal={setAddTaskModal}/>)}

       <div className='tasks'>
          {groupedTasks.undated.length > 0 && (
            <div className='task-group'>
              <div className='day-title'>No Date</div>
              <div className='day-tasks'>
                {groupedTasks.undated.map((task) => renderTaskRow(task))}
              </div>
            </div>
          )}

          {groupedTasks.datedGroups.map((group) => (
            <div className='task-group' key={group.dayKey}>
              <div className='day-title'>{group.title}</div>
              <div className='day-tasks'>
                {group.tasks.map((task) => renderTaskRow(task))}
              </div>
            </div>
          ))}
        </div>

      <button className='add-task' onClick={() => setAddTaskModal(true)}>Add Task</button>
    </div>
  )}
}

export default ScheduleV2;
