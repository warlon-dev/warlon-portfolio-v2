import { useState, useEffect} from 'react';
import { client, urlFor } from '../../client';

import { Tags } from '../../components';
import './ProjectCard.scss';

const ProjectCard = ({ handleClick, projectProps}) => {
  const { name, description, photo } = projectProps;
  const [designTools, setDesignTools] = useState([]);
  const [frontendTools, setFrontendTools] = useState([]);
  const [backendTools, setBackendTools] = useState([]);
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchData = async (project) => {
      try {
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
    <div className='project__container' onClick={handleClick}>
      <div className='project__container-image'>
        <img src={photo? (photo?urlFor(photo):'') :''} alt={name} />
      </div>
      <div className='project__container-content'>
        <h1 className='section__subheading'>{name}</h1>
        <p className='p__subtext'>{description}</p>
        <div className='project__container-content_tags'>
            {designTools && designTools?.map((item, index) => (
              <Tags key={item+index} name={item.name} link={item.link} />
            ))}
            {frontendTools && frontendTools?.map((item, index) => (
              <Tags key={item+index} name={item.name} link={item.link} />
            ))}
            {backendTools && backendTools?.map((item, index) => (
              <Tags key={item+index} name={item.name} link={item.link} />
            ))}
            {tags && tags?.map((item, index) => (
              <Tags key={item+index} name={item.name} link={item.link} />
            ))}
          </div>
      </div>
    </div>
  )
}

export default ProjectCard