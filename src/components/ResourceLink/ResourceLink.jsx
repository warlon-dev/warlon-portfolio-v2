import React from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';
import { FaBehanceSquare } from 'react-icons/fa';
import { FiFigma } from 'react-icons/fi';

import './ResourceLink.scss';

const ResourceLink = ({type, href}) => {
  const linkImage = () => {
    switch(type){
      case "github": {
        return <AiOutlineGithub />
      }
      case "website": {
        return <BsGlobe />
      }
      case "figma": {
        return <FiFigma />
      }
      case "behance": {
        return <FaBehanceSquare />
      }
      default: {
        return ""
      }
    }
  }

  return (
    <a className='resourcelink__container' href={href} target='_blank' rel='noreferrer'>
      {linkImage()}
    </a>
  )
};

export default ResourceLink;