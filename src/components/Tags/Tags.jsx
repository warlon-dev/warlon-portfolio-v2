import React from 'react';

import './Tags.scss';

const Tags = ({name, link='', onClick}) => {
  return (
    <div className='tag__container'>
      {
      link===''
      ? <p onClick={onClick}>{name}</p>
      : <a href={link} target='_blank' rel='noreferrer' >{name}</a>
      }
    </div>
  )
}

export default Tags