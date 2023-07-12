import { useEffect, useState } from 'react'

import { SkillCard, Tags } from '../../components';
import { SkillInfo } from '../../container';
import { client, urlFor } from '../../client';
import './Skills.scss';
import { useFetchContext } from '../../FetchProvider';

const Skills = () => {
  const { setIsSkillsComplete } = useFetchContext();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [skills, setSkills] = useState(null);
  const [tags, setTags] = useState([]);
  const [skill, setSkill] = useState(null);

  useEffect(() => {
    const query = '*[_type == "skills"]'
    client.fetch(query)
      .then((data) => {
        setSkills(data);
      }
    )

    const queryTags = '*[_type == "tags"]'
    client.fetch(queryTags)
      .then((data) => {
        setTags(data);
        setIsSkillsComplete(true);
      }
    )
  }, [])


  const hasItem = (arr, property, value) => {
    if(arr) {
      return arr.some(obj => obj[property] === value);
    }
  }

  return (
    <div id='skills' className={`app__skills `}>
      <h1 className='section__title header-gradient'>SKILLS</h1>
       
      {hasItem(skills, 'type','design') && (
        <div className='app__skills-group'>
          <h2 className='section__heading'>UI/UX | WEB DESIGN</h2>
          <div className='app__skills-container'>
            {skills?.map((skill,index) => {
              if(skill.type==='design'){
                return (
                  <SkillCard 
                    key={`design-${skill}-${index}`} 
                    skillProps = {skill} 
                    image={skill.icon?urlFor(skill.icon):''}
                    handleClick = {() => {
                      setSkill(skill);
                      setOverlayVisible(true)
                    }} 
                  />
                )
              } else {
                return ''
              }
            })}
          </div>
        </div>
      )}

      {hasItem(skills, 'type','frontend') && (
        <div className='app__skills-group'>
          <h2 className='section__heading'>FRONT END DEVELOPMENT</h2>
          <div className='app__skills-container'>
            {skills?.map((skill,index) => {
              if(skill.type==='frontend'){
                return (
                  <SkillCard 
                    key={`frontend-${skill}-${index}`} 
                    skillProps = {skill} 
                    image={skill.icon?urlFor(skill.icon):''}
                    handleClick = {() => {
                      setSkill(skill);
                      setOverlayVisible(true)
                    }} 
                  />
                )
              } else {
                return ''
              }
            })}
          </div>
        </div>
      )}

      {hasItem(skills, 'type','backend') && (
        <div className='app__skills-group'>
          <h2 className='section__heading'>BACK END DEVELOPMENT</h2>
          <div className='app__skills-container'>
            {skills?.map((skill,index) => {
              if(skill.type==='backend'){
                return (
                  <SkillCard 
                    key={`backend-${skill}-${index}`} 
                    skillProps = {skill} 
                    image={skill.icon?urlFor(skill.icon):''}
                    handleClick = {() => {
                      setSkill(skill);
                      setOverlayVisible(true)
                    }} 
                  />
                )
              } else {
                return ''
              }
            })}
          </div>
        </div>
      )}

      <div className='app__skills-tags'>
        {hasItem(tags, 'type','tools') && ( 
          <div className='app__skills-tools'>
            <h2 className='section__heading'>TOOLS</h2>
            <div>
              {tags?.map((item,index) => {
                if(item.type==='tools'){
                  return <Tags key={item+index} name={item.name} link={item.link} />
                } else {
                  return ''
                }
              })}
            </div>
          </div>
        )}

        {hasItem(tags, 'type','others') && ( 
          <div className='app__skills-others'>
            <h2 className='section__heading'>OTHERS</h2>
            <div>
              {tags?.map((item,index) => {
                if(item.type==='others'){
                  return <Tags key={item+index} name={item.name} link={item.link} />
                } else {
                  return ''
                }
              })}
            </div>
          </div>
        )} 
      </div>
      {
        skill && 
        <SkillInfo 
          active={overlayVisible} 
          skilProps={skill} 
          image={urlFor(skill.icon)} 
          handleClose={() => setOverlayVisible(false)} 
        />
      }
    </div>
  )
}

export default Skills