import React from 'react';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { motion } from 'framer-motion';

import './Cover.scss'

const Cover = () => {
  return (
    <div className='app__cover section__padding'> 
      <h2>helping great minds bring <span className='header-gradient'>innovative ideas</span> into life</h2>

      <motion.div className='app__cover-title'
        whileInView={{ y: [-100,0], opacity: [0, 1] }}
        transition={{duration: 0.5}}
      >
        <h1>Warlon Escander</h1>
        <p>Full Stack Web Developer</p>
      </motion.div>

      <div className='app__cover-link'>
        <a href='#content'>
          LEARN MORE
          <BsChevronDoubleDown />
        </a>
      </div>
    </div>
  )
}

export default Cover