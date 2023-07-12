import { useState } from 'react'

import AccordionItem from '../AccordionItem/AccordionItem'
import './Accordion.scss'

const Accordion = ({data}) => {
  const [activeItem, setActiveItem] = useState(-1)

  return (
    <div className='accordion__container'>
      {data.map((item,index)=>(
        <AccordionItem 
          key={item+index} 
          itemProps={item} 
          collapsed={activeItem===index?false:true} 
          index={index} 
          setActiveItem={setActiveItem}
        />
      ))}
    </div>
  )
}

export default Accordion