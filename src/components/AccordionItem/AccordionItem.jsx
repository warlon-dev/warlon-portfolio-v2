import React, { useEffect, useRef } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';
import './AccordionItem.scss'

const AccordionItem = ({collapsed, setActiveItem, index, itemProps}) => {
  const { name='', description, type, image, link, list } = itemProps
  useEffect(() => {
    console.log(link)
  })
  const accordionContent = (type, image, link, list) => {
    switch(type) {
      case 'video': {
        return (
          // <iframe 
          //   width="560" 
          //   height="315" 
          //   src={link}
          //   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          //   allowFullScreen>
          // </iframe>
          <YouTubePlayer videoId={link} isPlaying={!collapsed} />
        )

      }
    }
  }

  return (
    <div 
      className={`accordionItem__container ${collapsed&&'collapsed'}`}
      onClick={() => {
        collapsed ? setActiveItem(index) : setActiveItem(-1)
      }}
    >
      <div className={`accordionItem__container-heading ${collapsed&&'collapsed'}`}>
        <h1 className='section__subheading'>{name}</h1>
        {collapsed ? <AiOutlineDown /> : <AiOutlineUp />}
      </div>
      <div className={`accordionItem__container-content ${collapsed?'collapsed':'expanded'}`}>
        {accordionContent(type, image, link, list)}
      </div>
    </div>
  )
}

export default AccordionItem