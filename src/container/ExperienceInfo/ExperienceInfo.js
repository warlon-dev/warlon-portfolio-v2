import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { client, urlFor } from '../../client';
import { Overlay, Tags, Timeline } from '../../components';
import './ExperienceInfo.scss';

const ExperienceInfo = ({active, handleClose, logo, expProps, experiences}) => {
  const [projectList, setProjectList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    setExperience(expProps);
  },[expProps])

  useEffect(() => {
    const fetchData = async (exp) => {
      try {

        if(exp.projects){
          const results = await Promise.all(
            exp.projects.map((project) => {
             return  client.fetch(`*[_id == "${project._ref}"][0]`)
            })
          );
          setProjectList(results);
        } else {
          setProjectList([])
        }
        
        if(exp.skills){
          const skillResults = await Promise.all(
            exp.skills.map((skill) => {
             return  client.fetch(`*[_id == "${skill._ref}"][0]`)
            })
          );
          setSkillList(skillResults);
        } else {
          setSkillList([]);
        }

      } catch (err) {
        console.error(err)
      }
    }
    if(experience){
      fetchData(experience);
    }
  }, [experience])

  const handleItemChanged = (item) => {
    setExperience(item)
  }

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
    <Overlay active={active} onClose={() => handleClose()}>
      {experience && 
        <div className='app__experience'>

          <div className='app__experience-timeline'>
            <h2 className='section__subheading'>My Software Development Journey</h2>
            <Timeline list={experiences} selected ={expProps} onItemChanged={handleItemChanged} />
          </div>

          <div className='app__divider' />

          <div className='app__experience-details'>
            <div className='app__experience-details_heading'>
              <div className='app__experience-details_heading-text'>
                <img src={experience?.logo?urlFor(experience?.logo):''} alt={experience.company?experience.company:'company logo'} />
                <div>
                  <h1 className='section__heading'>{experience.position}</h1>
                  <a href={experience.website} target='_blank' rel='noreferrer' className='section__subheading'>{experience.company}</a>
                  <p>{`${formatDate(experience.dateFrom)} - ${experience.isCurrent?'CURRENT':formatDate(experience.dateTo)}`}</p>
                </div>
              </div>
              <p className='p__subtext'>{experience.description}</p>
            </div>

            <div className='app__experience-details_content'>
              {experience.roles && (
                <div className='app__experience-details_roles'>
                  <h2 className='p__text'>Key Roles</h2>
                  <ul className='p__subtext'>
                    {experience.roles?.map((item,index) => (
                      <li key={item+index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {experience.accomplishments && (
                <div className='app__experience-details_accomplishments'>
                  <h2 className='p__text'>Major Accomplishments</h2>
                  <ul className='p__subtext'>
                    {experience.accomplishments?.map((item,index) => (
                      <li key={item+index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {projectList && (
                <div className='app__experience-details_projects'>
                  <h2 className='p__text'>Projects Built</h2>
                  <ul className='p__subtext'>
                    {projectList?.map((item,index) => (
                      <li key={item+index}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {skillList && (
                <div className='app__experience-details_skills'>
                  <h2 className='p__text'>Skills Honed and Practiced</h2>
                  <div>
                    {skillList?.map((item,index) => (
                      <Tags key={item+index} name={item.name}/>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
          <AiOutlineClose onClick={handleClose} />
        </div>
      }
    </Overlay>
  )
}

export default ExperienceInfo