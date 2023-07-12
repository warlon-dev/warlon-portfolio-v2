import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { client, urlFor } from '../../client';

import { Overlay, SkillCard, Tags, ResourceLink, Accordion } from '../../components';
import './ProjectInfo.scss';



const ProjectInfo = ({active, handleClose, projectProps, image}) => {
  const { name, description, github, figma, behance, website } = projectProps;
  const [designTools, setDesignTools] = useState([]);
  const [frontendTools, setFrontendTools] = useState([]);
  const [backendTools, setBackendTools] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async (project) => {
      try {
        console.log(project)
        if(project.design){
          const designResults = await Promise.all(
            project.design.map((skill) => {
             return  client.fetch(`*[_id == "${skill._ref}"][0]`)
            })
          );
          setDesignTools(designResults);
        } else {
          setDesignTools([]);
        }

        if(project.frontend){
          const frontendResults = await Promise.all(
            project.frontend.map((skill) => {
             return  client.fetch(`*[_id == "${skill._ref}"][0]`)
            })
          );
          setFrontendTools(frontendResults);
        } else {
          setFrontendTools([]);
        }
          
        if(project.backend){
          const backendResults = await Promise.all(
            project.backend.map((skill) => {
             return  client.fetch(`*[_id == "${skill._ref}"][0]`)
            })
          );
          setBackendTools(backendResults);
        } else {
          setBackendTools([]);
        }
        
        if(project.others){
          const tagsResult = await Promise.all(
            project.others.map((tag) => {
             return  client.fetch(`*[_id == "${tag._ref}"][0]`)
            })
          );
          setTags(tagsResult);
        } else {
          setTags([]);
        }

      } catch (err) {
        console.error(err)
      }
    }
    fetchData(projectProps);
  }, [projectProps])

  return (
    <Overlay active={active} onClose={() => handleClose()}>
      <div className='app__project'>
        <div className='app__project-info'>
          <div className='app__project-heading'>
            <div>
              <img src={image} alt={name}/>
              <h1 className='section__heading'>{name}</h1>
            </div>
            <p className='p__subtext'>{description}</p>
          </div>
          
          <div className='app__project-tech'>
            {designTools.length > 0 && 
              <>
                <h2 className='p__text'>Designed using</h2>
                <div className='app__project-tech_stack'>
                  {designTools?.map((skill,index) => (
                    <SkillCard 
                      key={`design-${skill}-${index}`} 
                      skillProps = {skill} 
                      image={urlFor(skill.icon)}
                      isColored={true} 
                      size='small'
                    />
                  ))}
                </div>
              </>
            }
            {frontendTools.length > 0 && 
              <>
                <h2 className='p__text'>Frontend built with</h2>
                <div className='app__project-tech_stack'>
                  {frontendTools?.map((skill,index) => (
                    <SkillCard 
                      key={`frontend-${skill}-${index}`} 
                      skillProps = {skill} 
                      image={urlFor(skill.icon)}
                      isColored={true} 
                      size='small'
                    />
                  ))}
                </div>
              </>
            }
            {backendTools.length > 0 && 
              <>
                <h2 className='p__text'>Backend built with</h2>
                <div className='app__project-tech_stack'>
                  {backendTools?.map((skill,index) => (
                    <SkillCard 
                      key={`backend-${skill}-${index}`} 
                      skillProps = {skill} 
                      image={urlFor(skill.icon)}
                      isColored={true} 
                      size='small'
                    />
                  ))}
                </div>
              </>
            }
          </div>

          {tags &&
            <div className='app__project-other'>
              <h2 className='p__text'>Frameworks & Libraries</h2>
              <div className='app__project-other_tech'>
                {tags?.map((item,index) => (
                  <Tags key={item+index} name={item.name} link={item.link} />
                ))}
              </div>
            </div>
          }
        </div>

        <div className='app__project-resources'>
          <div className='app__project-resources_links'>
            <h2 className='p__text'>Project Links</h2>
            <div>
              {github && <ResourceLink type='github' href={github}/>}
              {website && <ResourceLink type='website' href={website}/>}
              {figma && <ResourceLink type='figma' href={figma}/>}
              {behance && <ResourceLink type='behance' href={behance}/>}
            </div>
          </div>

          {projectProps.resources && <Accordion data={projectProps.resources} />}
        </div>

        <AiOutlineClose onClick={handleClose} />
      </div>
    </Overlay>
  )
};

export default ProjectInfo;