import React from 'react';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaFacebookMessenger } from 'react-icons/fa';

import { Overlay } from '../../components';
import './Connect.scss'

const Connect = ({active, setActiveOverlay}) => {
  return (
    <Overlay active={active} onClose={() => setActiveOverlay('')}>
        <div className='app__connect'>
            <a href='https://calendly.com/escander-warlon/30-minute-call' target='_blank'>
                <div className='app__connect-appointment'>
                    <BsFillCalendarEventFill />
                    <h1>Let's schedule a call</h1>
                </div>
            </a>
            <div className='app__connect-email' onClick={() => setActiveOverlay('contact')}>
                <MdEmail />
                <h1>Send me a message</h1>
            </div>
            <a href='https://m.me/warlonescander' target='_blank'>
                <div className='app__connect-message'>
                    <FaFacebookMessenger />
                    <h1>Let's have a quick chat</h1>
                </div>
            </a>
        </div>
    </Overlay>
  )
};

export default Connect;