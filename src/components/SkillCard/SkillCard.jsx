import { useEffect, useState } from 'react'

import { Tooltip } from '../../components'
import './SkillCard.scss'

const SkillCard = ({handleClick, image, skillProps, isColored=false, size='big'}) => {
  const {name='', bgColor='#1BBC9B', proficiency} = skillProps;

  const [isHovered, setIsHovered] = useState(false);
  const [isWhiteLogo, setIsWhiteLogo] = useState(true);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(image);
        const blob = await response.blob();
        const imageBitmap = await createImageBitmap(blob);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        ctx.drawImage(imageBitmap, 0, 0);

        const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const isLogoWhite = Array.from(pixelData).some((val, index) => {
          if ((index + 1) % 4 !== 0) {
            const red = pixelData[index];
            const green = pixelData[index + 1];
            const blue = pixelData[index + 2];
            const isGray = red === green && green === blue;
            return val !== 0 && val !== 255 && !isGray;
          }
          return false;
        });

        setIsWhiteLogo(!isLogoWhite);
      } catch (error) {
      }
      
    };

    fetchImage();
  }, [isHovered, name, image])

  return (
    <>
      <Tooltip title={name} itemProps={proficiency}>
        <div 
          className={`skill__container 
            ${isHovered ? 'skill__hovered' : ''} 
            ${isWhiteLogo && 'skill__container-white'}
            ${size==='small' && 'skill__container-small'}
          `}
          style={{ backgroundColor: isHovered && (isWhiteLogo?bgColor:'#292B2D')  }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {!isColored && <div className={`logo-mask-container ${isWhiteLogo ? 'logo-mask-white' : 'logo-mask-color'}`}></div>}
          <img src={image} alt={name} />
        </div>
      </Tooltip>
    </>
  )
}

export default SkillCard;