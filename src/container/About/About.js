import { useEffect } from 'react';

import './About.scss';

const About = () => {
  return (
    <div id='about' className='app__about'>
      <h1 className='section__title header-gradient'>About me</h1>
      <p className='p__text'>
        Hey there! I've been working as a software developer since 2015, teaming up with different companies and diving into exciting projects. From creating accounting software to handling payroll systems, I've had the chance to build solutions that make business processes smoother. And you know what? My passion lies in helping great minds like yours bring innovative ideas to life!
      </p>
      <p className='p__text'>
        Throughout my journey, I've specialized in crafting software for various crucial aspects of businesses. By harnessing the power of technology, I've been able to optimize operations, boost efficiency, and increase productivity. It's incredible to witness how technology can transform the way we manage resources, and I'm here to be a part of that transformation with you!
      </p>
      <p className='p__text'>
        When it comes to software development, I'm all about creating impact. I'm not just about meeting functional requirements; I strive to deliver seamless user experiences that truly make a difference. By blending my technical expertise with a user-centric approach, I empower businesses and individuals with software that's intuitive and powerful. So, let's team up and make your innovative ideas a reality!
      </p>
    </div>
  )
}

export default About