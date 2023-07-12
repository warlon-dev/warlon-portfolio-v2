import React, { useEffect, useState } from 'react'

import TimelineItem from '../TimelineItem/TimelineItem'
import './Timeline.scss';

const Timeline = ({ list, onItemChanged, selected }) => {
  const [activeItem, setActiveItem] = useState(0)
  const [hoverItem, setHoverItem] = useState(-1)

  useEffect(() => {
    list.map((item,index) => {
      if(item._id === selected._id){
        setActiveItem(index);
        return;
      }
    })
  },[selected])

  function compareDatesDescending(a, b) {
    const dateA = a.dateFrom;
    const dateB = b.dateFrom;

    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }
    return 0;
  }

  return (
    <div className='timeline__container'>
      {
        list.sort(compareDatesDescending)
        .map((item, index) => (
          <React.Fragment key={index}>
            {
              index%2===0
              ? <TimelineItem 
                  key={item+index} 
                  itemProps={item} 
                  placement='left'
                  active={activeItem===index?true:false}
                  onClick={() => {
                    setActiveItem(index)
                    onItemChanged(item)
                  }} 
                  onMouseEnter={() => setHoverItem(index)}
                  onMouseLeave={() => setHoverItem(-1)}
                />
              : <div className='timeline__empty'/>
            }
            <div className='timeline__divider'>
              <div className='timeline__divider-line'/>
              <div className={`timeline__divider-dot ${activeItem===index && 'active'} ${hoverItem===index && 'hovered'}`}/>
            </div>
            {
              index%2===1
              ? <TimelineItem 
                  key={item+index} 
                  itemProps={item} 
                  placement='right' 
                  active={activeItem===index?true:false} 
                  onClick={() => {
                    setActiveItem(index)
                    onItemChanged(item)
                  }} 
                  onMouseEnter={() => setHoverItem(index)}
                  onMouseLeave={() => setHoverItem(-1)}
                />
              : <div className='timeline__empty'/>
            }
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default Timeline