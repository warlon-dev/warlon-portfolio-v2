import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import './Rating.scss'

let stars = [5,4,3,2,1];

const Rating = ({ item, rating=5 }) => {


  return (
    <div className='rating__container'>
      <p>{item}</p>
      <div>
        {
          stars.map((value, index) => {
            if((rating-value) >= 0) {
              return <AiFillStar key={index} />
            } else {
              return <AiOutlineStar  key={index} opacity={0.25} />
            }
          })
        }
      </div>
    </div>
  )
}

export default Rating