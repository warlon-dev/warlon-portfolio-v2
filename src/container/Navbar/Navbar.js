import { useState, useEffect } from 'react';
import { BsGithub, BsFacebook, BsBehance, BsLinkedin } from 'react-icons/bs';
import { GiNinjaStar } from 'react-icons/gi';
import { AiOutlineDoubleRight } from 'react-icons/ai';

import { MenuLink } from '../../components';
import './Navbar.scss';

const Navbar = ({setActiveOverlay, linkScrolled}) => {
  const [toggleMenu, setToggleMenu] = useState(true)
  const [isMediaScreen, setIsMediaScreen] = useState(false);
  const [activeLink, setActiveLink] = useState('About');

  useEffect(() => {
    // Create a media query for the desired screen size
    const mediaQuery = window.matchMedia('(max-width: 1000px)');

    // Set the initial state based on the current screen size
    setIsMediaScreen(mediaQuery.matches);

    // Add a listener to track changes in the media query
    const handleMediaChange = (event) => {
      setIsMediaScreen(event.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // Clean up the listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if(linkScrolled.toLowerCase() !== activeLink.toLowerCase()) {
      setActiveLink(linkScrolled.toLowerCase());
    }
  }, [linkScrolled]);


  return (
    <>
      <div className={`app__navbar ${!isMediaScreen?'slide-right':(toggleMenu?'slide-right':'slide-left')}`}>
        <div className='app__navbar-header'>
          <h1>Warlon Escander</h1>
          <h2>FULL STACK WEB DEVELOPER</h2>
          <div>
            <p>helping great minds bring</p> 
            <p><span className='header-gradient'>innovative ideas</span> into life</p>
          </div>
        </div>

        <div className='app__navbar-links'>
          <MenuLink menu='About' href='#about' activeLink={activeLink} setActiveLink={setActiveLink} setToggleMenu={setToggleMenu}/>
          <MenuLink menu='Skills' href='#skills' activeLink={activeLink} setActiveLink={setActiveLink} setToggleMenu={setToggleMenu}/>
          <MenuLink menu='Projects' href='#projects' activeLink={activeLink} setActiveLink={setActiveLink} setToggleMenu={setToggleMenu}/>
          <MenuLink menu='Experiences' href='#experiences'activeLink={activeLink} setActiveLink={setActiveLink} setToggleMenu={setToggleMenu}/>
        </div>

        <div className='app__navbar-contacts'>
          <div className='app__navbar-contacts_socials'>
            <a href='https://github.com/warlon-dev/' target='_blank' rel='noreferrer'><BsGithub /></a>
            <a href='https://www.behance.net/warlonescander' target='_blank' rel='noreferrer'><BsBehance /></a>
            <a href='https://www.facebook.com/warlonescander/' target='_blank' rel='noreferrer'><BsFacebook /></a>
            <a href='https://www.linkedin.com/in/warlonescander/' target='_blank' rel='noreferrer'><BsLinkedin /></a>
          </div>
          <a href='mailto:escander.warlon@gmail.com' >escander.warlon@gmail.com</a>
          <button type='button' onClick={()=>{
            setActiveOverlay('connect')
            setToggleMenu(false)
          }}>Connect With Me</button>
        </div>
        <div id="nav_close"><GiNinjaStar onClick={() => setToggleMenu(false)} /></div>
      </div>
      <div className={`app__navbar-collapsed ${toggleMenu?'closed':''}`}  onClick={() => setToggleMenu(true)}>
        <AiOutlineDoubleRight />
      </div>
    </>
  )
}

export default Navbar