import { useState, useEffect } from 'react';
import { client, urlFor } from '../../client';

import { ProjectInfo } from '../../container';
import { ProjectCard } from '../../components';
import './Projects.scss';
import { useFetchContext } from '../../FetchProvider';

const Projects = () => {
  const { setIsProjectsComplete } = useFetchContext();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const query = '*[_type == "projects"]'

    client.fetch(query)
      .then((data) => {
        setProjects(data);
        setIsProjectsComplete(true);
      })
  }, [])

  return (
    <div id='projects' className={`app__projects `}>
      {projects.length > 0 && (
        <>
          <h1 className='section__title header-gradient'>PROJECTS</h1>
          <div className='app__projects-list'>
            {projects?.map((project,index) => {
              if(project.top){
                return (
                  <ProjectCard 
                    key={project+index} 
                    projectProps={project} 
                    handleClick={()=> {
                      setProject(project)
                      setOverlayVisible(true)
                    }}  
                  />
                )
              }
            })}
          </div>
        </>
      )}
      
      {
        project && 
        <ProjectInfo 
          active={overlayVisible} 
          projectProps={project} 
          image={urlFor(project.photo)} 
          handleClose={() => setOverlayVisible(false)}
        />
      }
    </div>
  )
}

export default Projects