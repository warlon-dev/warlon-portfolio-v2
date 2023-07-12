import './MenuLink.scss'

const MenuLink = ({menu, href, activeLink, setActiveLink, setToggleMenu}) => {
  const handleClick = (e) => {
    if(menu.toLowerCase() === activeLink.toLowerCase()) {
      e.stopPropagation();
    } else {
      setActiveLink(menu);
      setToggleMenu(false)
    }
  }

  return (
    <div className={`app__menulink ${(menu.toLowerCase())===activeLink.toLowerCase() && 'app__menulink-active'}`}>
      {(menu.toLowerCase())===activeLink.toLowerCase()? <div className='app__menulink-line_active' /> : <div className='app__menulink-line' />}
      <a href={href} onClick={handleClick}>{menu}</a>
    </div>
  )
}

export default MenuLink