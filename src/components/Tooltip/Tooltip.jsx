import { useState } from 'react';

import { Rating } from '../../components'
import './Tooltip.scss';

const Tooltip = ({title,children, ...props}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  }

  const handleMouseLeave = () => {
    setShowTooltip(false);
  }

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div 
        className='tooltip__container'
       
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {showTooltip && (
        <span className='tooltip__content'>
          <h1>{title}</h1>
          <div>
            {props?.itemProps.map((item,index) => (
              <Rating key={item+index} item={item.title} rating={item.rating}/>
            ))}
          </div>
          <p>Click for more details</p>
        </span>
      )}
    </div>
    
  )
}

export default Tooltip