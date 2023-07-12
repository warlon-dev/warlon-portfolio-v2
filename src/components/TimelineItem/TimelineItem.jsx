import React from 'react'

import './TimelineItem.scss'

const TimelineItem = ({placement='left', active, onClick, onMouseEnter, onMouseLeave, ...props}) => {
  const {position, company, dateFrom, dateTo, isCurrent} = props.itemProps

  const formatDate = (date) => {
    const options = { month: 'short', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);

    // Split the formatted date into day, month, and year parts
    const [month, year] = formattedDate.split(' ');

    // Convert the month abbreviation to uppercase
    const capitalizedMonth = month.toUpperCase();

    // Return the formatted date with uppercase month abbreviation and desired format
    return `${capitalizedMonth} ${year}`;
  }
  
  return (
    <div 
      className={`timelineItem__container ${active&&'active'}`}
      style={{textAlign: placement==='left'?'right':'left'}}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p>{`${formatDate(dateFrom)} - ${isCurrent?'CURRENT':formatDate(dateTo)}`}</p>
      <h1 className='section__subheading'>{`${position}`}</h1>
      <h2 className='section__subheading'>{`${company}`}</h2>
    </div>
  )
}

export default TimelineItem