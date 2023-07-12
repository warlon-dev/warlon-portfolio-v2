import emailjs from '@emailjs/browser';
import swal from 'sweetalert';
import { AiOutlineClose } from 'react-icons/ai';

import { Overlay } from '../../components'
import './Contact.scss'

const Contact = ({active, setActiveOverlay}) => {

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_xi1dnaw','template_wffy0r1',e.target,'MpjwJ5dhmZz1vHkWn')
    swal({
      title: 'Your message has been sent!',
      text: "Let me check it and I'll make sure to respond to you within 24 hours",
      icon: 'success'
    });
    e.target.reset();
    setActiveOverlay('');
  }

  return (
    <Overlay active={active} onClose={() => setActiveOverlay('')}>
      <div className='app__contact'>
        <form id='contactForm' className='app__contact-form' onSubmit={sendEmail}>
          <h1 className='section__heading'>Thanks for taking the time to reach out.<br/>How can I help you?</h1>
          <div className='app__contact-inputs'>
            <div>
              <label htmlFor='fullname' className='section__subheading'>Name</label>
              <input  id='fullname' type='text' name='full_name' placeholder='Your full name here' required autoFocus />
            </div>
            
            <div>
              <label htmlFor='email' className='section__subheading'>Email</label>
              <input id='email' type='email' name='email_from' placeholder='Your email here' required />
            </div>
          </div>

          <div className='app__contact-message'>
            <label htmlFor='message' className='section__subheading'>Message</label>
            <textarea id='message' name='message' placeholder='Your message here' rows={4} required />
          </div>

          <button type='submit'>Submit</button>
        </form>
          <AiOutlineClose onClick={() => setActiveOverlay('')} />
      </div>
    </Overlay>
  )
}

export default Contact