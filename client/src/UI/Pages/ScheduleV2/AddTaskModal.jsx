import React, { useState } from 'react';
import './AddTaskModal.scss';
import { createTask } from '../../../Redux/scheduleSlice';

import { useDispatch } from 'react-redux';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const AddTaskModal = ({ addTaskModal, setAddTaskModal}) => {
  const dispatch = useDispatch();
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const [startTime, onChangeStartTime] = useState(dayjs().hour(16).minute(20));
  const [endTime, onChangeEndTime] = useState(dayjs().hour(16).minute(20));
  const [startDate, onChangeDate] = useState(dayjs().tz('America/Toronto').add(1, 'day'));
  const [activeStartTime, setActiveStartTime] = useState(false);
  const [activeEndTime, setActiveEndTime] = useState(false);
  const [activeDate, setActiveDate] = useState(false);
  const [text, setText] = useState("")
  const [task, setTask] = useState({ task: '', date: dayjs().tz('America/Toronto').add(1, 'day'), start_time: dayjs().hour(16).minute(20), end_time: dayjs().hour(16).minute(20) });

  return (
    <div className='AddTaskModal' onClick={() => setAddTaskModal(false)}>
      <div className='content' onClick={(e) => e.stopPropagation()}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {activeStartTime && (<MobileTimePicker label="Start Time" className='time-picker' value={task.start_time} onChange={(newValue) => setTask({ ...task, start_time: newValue})}/>)}
          {activeEndTime && (<MobileTimePicker label="End Time" className='time-picker' value={task.end_time} onChange={(newValue) => setTask({ ...task, end_time: newValue})}/>)}
          {activeDate && (<MobileDatePicker label="Date" className='time-picker' value={task.date} onChange={(newValue) => setTask({ ...task, date: newValue})}/>)}
        </LocalizationProvider>
        {(!activeStartTime || !activeEndTime || !activeDate) && (<div className='active-buttons'>
          {!activeStartTime && (<button className='active-button' onClick={() => setActiveStartTime(true)}>Start Time</button>)}
          {!activeEndTime && (<button className='active-button' onClick={() => setActiveEndTime(true)}>End Time</button>)}
          {!activeDate && (<button className='active-button' onClick={() => setActiveDate(true)}>Date</button>)}
        </div>)}
        <textarea onChange={(e) => setTask({ ...task, task: e.target.value})} placeholder='Task details' rows="5" cols="50"/>
        <button onClick={() => {setAddTaskModal(false); dispatch(createTask(task))}} className='submit'>Submit</button>
      </div>
    </div>
  )
}

export default AddTaskModal;
