import React from 'react';
import './ScheduleV2.scss';

const ScheduleV2 = () => {
  
  return (
    <div className='ScheduleV2'>
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
      <button className='add-task'>Add Task</button>
    </div>
  )
}

export default ScheduleV2;
