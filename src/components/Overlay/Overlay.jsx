import React from 'react'

import './Overlay.scss'

const Overlay = ({ active, onClose, children }) => {

    const handleOverlayClick = (e) => {
        if(e.target === e.currentTarget) {
            onClose();
        }
    }

  return (
    <div className={`overlay__padding app__overlay ${active?'active':''}`} onClick={handleOverlayClick}>
        {children}
    </div>
  )
}

export default Overlay