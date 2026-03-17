import React, { useState } from 'react';
import './AddTaskModal.scss';

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
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const [startTime, onChangeStartTime] = useState(dayjs().hour(16).minute(20));
  const [endTime, onChangeEndTime] = useState(dayjs().hour(16).minute(20));
  const [startDate, onChangeDate] = useState(dayjs().tz('America/Toronto').add(1, 'day'));
  const [activeStartTime, setActiveStartTime] = useState(false);
  const [activeEndTime, setActiveEndTime] = useState(false);
  const [activeDate, setActiveDate] = useState(false);
  const [text, setText] = useState("")

  return (
    <div className='AddTaskModal' onClick={() => setAddTaskModal(false)}>
      <div className='content' onClick={(e) => e.stopPropagation()}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {activeStartTime && (<MobileTimePicker label="Start Time" className='time-picker' value={startTime} onChange={onChangeStartTime}/>)}
          {activeEndTime && (<MobileTimePicker label="End Time" className='time-picker' value={endTime} onChange={onChangeEndTime}/>)}
          {activeDate && (<MobileDatePicker label="Date" className='time-picker'value={startDate} onChange={onChangeDate}/>)}
        </LocalizationProvider>
        {(!activeStartTime || !activeEndTime || !activeDate) && (<div className='active-buttons'>
          {!activeStartTime && (<button className='active-button' onClick={() => setActiveStartTime(true)}>Start Time</button>)}
          {!activeEndTime && (<button className='active-button' onClick={() => setActiveEndTime(true)}>End Time</button>)}
          {!activeDate && (<button className='active-button' onClick={() => setActiveDate(true)}>Date</button>)}
        </div>)}
        <textarea onChange={(e) => setText(e.target.value)} placeholder='Task details' rows="5" cols="50"/>
        <button onClick={() => setAddTaskModal(false)} className='submit'>Submit</button>
      </div>
    </div>
  )
}

export default AddTaskModal;
