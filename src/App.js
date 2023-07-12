import React, { useEffect, useRef, useState } from 'react';

import { Cover, Navbar, About, Skills, Projects, Experiences, Footer, SkillInfo, ProjectInfo, ExperienceInfo, Contact, Connect } from './container'
import './App.scss';
import { FetchProvider, useFetchContext } from './FetchProvider';

function App() {
  const { isExperiencesComplete, isSkillsComplete, isProjectsComplete } = useFetchContext();
  const contentSectionRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(4000);
  const [activeOverlay, setActiveOverlay] = useState('');
  const [linkScrolled, setLinkScrolled] = useState('About');

  useEffect(() => {
    if ( isExperiencesComplete && isSkillsComplete && isProjectsComplete) {
      const contentSection = contentSectionRef.current;
      const updateContentHeight = () => {
        if (contentSection) {
          const contentHeight = contentSection.offsetHeight + 100;
          setContentHeight(contentHeight);
        }
      };

      updateContentHeight();
    }
  }, [isExperiencesComplete, isSkillsComplete, isProjectsComplete]);

  useEffect(() => {
    if (activeOverlay!=='') {
      document.body.classList.add('disable-scroll');
    } else {
      document.body.classList.remove('disable-scroll');
    }

    return () => {
      document.body.classList.remove('disable-scroll');
    };
  }, [activeOverlay]);
  
  useEffect(() => {
    const handleScroll = debounce(() => {
      const sections = ["about","skills","projects","experiences"]
      for(let i=0; i < sections.length; i++){
        const item = sections[i];
        const section = document.getElementById(item);
        const rect = section.getBoundingClientRect();
        let isVisible = false;
        if((rect.top) >= 0 && (rect.bottom) <= window.innerHeight){    // IF SECTION IS CONTAINED IN THE SCREENVIEW
          isVisible=true;
        } else if((rect.top) <= 0 && (rect.bottom) >= window.innerHeight){   // IF SECTION IS COVERS THE SCREENVIEW
          isVisible=true;
        }

        if (isVisible) {
          setLinkScrolled(item);
          break;
        }
      }
      
    },500);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const debounce = (func, delay) => {
    let timerId;
    return(...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    }
  }

  return (
    <div className="App">
      <Cover />

      <div id='content' ref={contentSectionRef} className='app__content section__padding'>
        <div className='bg__container' />
        <div className='app__content-left' style={{ height: contentHeight }}>
          <Navbar setActiveOverlay={setActiveOverlay} linkScrolled ={linkScrolled}/>
        </div>
        <div className='app__content-right'>
          <About />
          <Skills />
          <Projects />
          <Experiences />
          <Footer />
        </div>
        <Connect active={activeOverlay==='connect'?true:false} setActiveOverlay={setActiveOverlay} />
        <Contact active={activeOverlay==='contact'?true:false} setActiveOverlay={setActiveOverlay} />
      </div>

    </div>
  );
}

export default function Root() {
  return (
    <FetchProvider>
      <App />
    </FetchProvider>
  )
};
