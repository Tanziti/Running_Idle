import React, { useState, useEffect } from 'react';
// import './CharactersIcon.css';

function CharactersIcon() {
  const [isImage1Visible, setIsImage1Visible] = useState(true);

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
            src="/assets/Green_Outfit/Green_Outfit_Green_Shoes4.png"
            alt="Character1"
          />
        ) : (
          <img
            src="/assets/Green_Outfit/Green_Outfit_Green_Shoes5.png"
            alt="Character2"
          />
        )}
      </div>
    </div>
  );
}

export default CharactersIcon;