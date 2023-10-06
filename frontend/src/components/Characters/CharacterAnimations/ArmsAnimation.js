import React, { useState, useEffect } from 'react';

const ArmsAnimation = ({character})  => {
  const [isImage1Visible, setIsImage1Visible] = useState(true);

  console.log(character.outfit)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsImage1Visible((prevIsImage1Visible) => !prevIsImage1Visible);
    }, 500); 

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div>
      <div>
        {isImage1Visible ? (
          <img
            id='CharacterIcon'
            src={`/assets/${character.outfit}_Outfit/${character.outfit}_Outfit_${character.shoes}_Shoes1.png`}
            alt="Character1"
          />
        ) : (
          <img
            id='CharacterIcon'
            src={`/assets/${character.outfit}_Outfit/${character.outfit}_Outfit_${character.shoes}_Shoes1.png`}
            alt="Character2"
          />
        )}
      </div>
    </div>
  );
}

export default ArmsAnimation;