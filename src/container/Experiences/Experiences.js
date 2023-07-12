import { useEffect, useState } from 'react';

import { ExperienceInfo } from '../../container';
import { ExperienceCard } from '../../components';
import { client, urlFor } from '../../client';
import './Experiences.scss';
import { useFetchContext } from '../../FetchProvider';

const Experiences = () => {
  const { setIsExperiencesComplete } = useFetchContext();
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [experiences, setExperiences] = useState([]);
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    const query = '*[_type == "experiences"]'

    client.fetch(query)
      .then((data) => {
        setExperiences(data);
        setIsExperiencesComplete(true);
      })
  }, [])


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
    <div id='experiences' className={`app__experiences `}>
      <h1 className='section__title header-gradient'>Experiences</h1>
      <div className='app__experiences-list'>
        {experiences?.sort(compareDatesDescending).map((exp,index) => (
          <ExperienceCard 
            key={exp+index} 
            expProps={exp} 
            handleClick ={() => {
              setExperience(exp)
              setOverlayVisible(true);
            }} 
          />
        ))}
      </div> 
      
      { experience && (
        <ExperienceInfo 
          active={overlayVisible} 
          experiences={experiences}
          expProps={experience} 
          logo={experience?.logo?urlFor(experience?.logo):''}
          handleClose={() => setOverlayVisible(false)} 
        />
      )}
    </div>
  )
}

export default Experiences