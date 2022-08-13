import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='Footer'>
      <div className='Content'>
        <div className='Half'>
          <div className='Col'>
            <h4 className='Title'>FLD</h4>
            <div className='Line' />
          </div>
          <div className='Col'>
            <h4 className='Title'>xvx</h4>
            <div className='Line' />
          </div>
          <div className='Col'>
            <h4 className='Title'>Grinder</h4>
            <div className='Line' />
          </div>
        </div>
        <div className='Half'>
          <div className='Col Right-Col'>
            <div className='Title'>Newsletter</div>
            <div className='Line' />
            <p className='Item'>Enter your email to subscribe to our newsletter</p>
            <input type='text' className='Input' placeholder='Email' />
            <button className='Btn'>Subscribe</button>
          </div>
        </div>
      </div>
      <div className='EndBG' />
    </div>
  );
};

export default Footer;
