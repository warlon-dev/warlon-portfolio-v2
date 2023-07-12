import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { client} from '../../client';

import { ProjectCard, Rating, Tags, Overlay } from '../../components';
import './SkillInfo.scss';

const SkillInfo = ({active, handleClose, image, skilProps}) => {
  const { name, bgColor ='#61DBFB', usingSince, usingFor, usedIn, proficiency,  } = skilProps;
  const [tags, setTags] = useState([]);
  const [projectFilters, setProjectFilters] = useState([]);
  const [projects, setProjects] = useState([]);
  const [otherSkills, setOtherSkills] = useState([]);
  const [projectCount, setProjectCount] = useState(0);

  const fetchData = async (skill) => {
    try {
      if(skill.others) {
        const tagsResult = await Promise.all(
          skill.others.map((tag) => {
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

  const addFilter = (skill) => {
    if(!projectFilters.includes(skill)){
      setProjectFilters([skill, ...projectFilters])
    }
  }

  const removeFilter = (removeSkill) => {
    setProjectFilters(projectFilters.filter(skill => skill !== removeSkill))
  }

  useEffect(() => {
    setProjectFilters([name])
  },[name])

  useEffect(() => {
    fetchData(skilProps);

    const skillsArray = []
    const query = `*[_type == "projects" && (design[]->name match "${name}" || frontend[]->name match "${name}" || backend[]->name match "${name}" )] {
      "design": design[]->name,
      "frontend": frontend[]->name,
      "backend": backend[]->name
    }`;
    client.fetch(query)
    .then(results => {
      setProjectCount(results.length)
      results.map((project => {
        if(project.design){
          project.design.map((skill) => {
            if(!skillsArray.includes(skill) && skill !== name){
              skillsArray.push(skill)
            }
          })
        }

        if(project.frontend){
          project.frontend.map((skill) => {
            if(!skillsArray.includes(skill) && skill !== name){
              skillsArray.push(skill)
            }
          })
        }
        if(project.backend){
          project.backend.map((skill) => {
            if(!skillsArray.includes(skill) && skill !== name){
              skillsArray.push(skill)
            }
          })
        }
      }))
      setOtherSkills(skillsArray)
    })
    
    
  }, [skilProps])

  
  useEffect(() => {
    const skillFilters = projectFilters.map(skill => {
      return `(design[]->name match "${skill}" || frontend[]->name match "${skill}" || backend[]->name match "${skill}" )`;
    }).join(' && ');
    console.log(projectFilters)

    const query = `*[_type == "projects" && (${skillFilters})]`;

    client.fetch(query)
    .then(projects => {
      setProjects(projects);
    })
    .catch(error => {
      console.error(error);

    })

  },[projectFilters])


  return (
    
    <Overlay active={active} onClose={()=>handleClose()}>
      <div className='app__skill'>
        <div className='app__skill-info'>
          <div className='app__skill-info_heading'>
            <div className='app__skill-info_heading-image'>
              <img src={image} alt={name} />
            </div>
            <div className='app__skill-info_heading-text'>
              <h1 
                className='section__heading'
                style={{color:bgColor}}
              >
                {name}
              </h1>
              <div className='app__skill-info_details'>
                <h2 className='p__subtext'>Started using since <span>{usingSince}</span></h2>
                <h2 className='p__subtext'>Used it in <span>{projectCount} Projects</span> as of today</h2>
              </div>
            </div>
          </div>

          {proficiency.length>0 &&
            <div className='app__skill-info_ratings'>
              <h2 className='p__text'>Proficiency</h2>
              <div>
                {proficiency?.map((item,index) => (
                  <Rating key={item+index} item={item.title} rating={item.rating}/>
                ))}
              </div>
            </div>
          }
          {tags.length>0 && 
            <div className='app__skill-info_others'>
              <h2 className='p__text'>Other Frameworks</h2>
              <div >
                {tags?.map((item,index) => (
                  <Tags key={item+index} name={item.name} link={item.link} />
                ))}
              </div>
            </div>
          }
        </div>
        <div className='app__skill-projects'>
          {otherSkills.length > 0 && 
            <div className='app__skill-projects_filters'>
            <h2 className='p__text'>Been used with</h2>
            <div>
              {otherSkills.map((skill, index) => {
                if(!projectFilters.includes(skill)){
                  return<Tags key={skill+index} name={skill} onClick={() => addFilter(skill)}/>
                }
              })
              }
            </div>
          </div>
          }


          <div className='app__skill-projects_list'>
            <div className='app__skill-projects_list-heading'>
              <h1 className='section__subheading'>Projects Made using <span style={{color:bgColor}}>{name}</span></h1>
              {projectFilters.length > 1 && 
                <>
                  <p className='p__subtext'>with</p>
                  <div>
                    {projectFilters.map((skill,index) => {
                      if(skill !== name){
                       return <Tags key={skill+index} name={skill}  onClick={() => removeFilter(skill)}/>
                      }
                    })}
                  </div>
                </>
              }
            </div>

            <div className='app__skill-projects_list-items'>
              {projects.map((project,index) => (
                <ProjectCard key={project+index} projectProps={project} />
              ))}
            </div>
          </div>
        </div>

        <AiOutlineClose onClick={handleClose} />

      </div>
    </Overlay>
  )
}

export default SkillInfo