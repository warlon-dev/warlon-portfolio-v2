import {useState, useEffect} from 'react';

import { client } from '../../client';
import { Tags } from '../../components';
import './ExperienceCard.scss';

const ExperienceCard = ({handleClick, expProps}) => {
  const { position='', company, description, dates, tags, dateFrom, dateTo, isCurrent } = expProps;
  const [skillList, setSkillList] = useState([]);

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
  
  useEffect(() => {
    const fetchData = async (exp) => {
      try {
        const skillResults = await Promise.all(
          exp.skills.map((skill) => {
           return  client.fetch(`*[_id == "${skill._ref}"][0]`)
          })
        );
        setSkillList(skillResults);

      } catch (err) {
        console.error(err)
      }
    }
    fetchData(expProps);
  }, [])

  return (
    <div className='exp__container' onClick={handleClick}>
      <div className='exp__container-dates'>
        <p>{`${formatDate(dateFrom)} - ${isCurrent?'CURRENT':formatDate(dateTo)}`}</p>
      </div>
      <div className='exp__container-content'>
        <h1 className='section__subheading'>{`${position} · ${company}`}</h1>
        <p className='p__subtext'>{description}</p>
        <div className='exp__container-content_tags'>
          {skillList && 
            skillList?.map((item,index) => (
              <Tags key={item+index} name={item.name}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard