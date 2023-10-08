import React, { useState, useEffect } from 'react';

const LegsIconAnimation = ({character})  => {
    const [isImage1Visible, setIsImage1Visible] = useState(true);

    // console.log(character.outfit)
    useEffect(() => {
        const interval = setInterval(() => {
        setIsImage1Visible((prevIsImage1Visible) => !prevIsImage1Visible);
        }, 500); 

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);

    return (
        <>
            {isImage1Visible ? (
            <img
                className='LegIcon'
                id='bodyIcons'
                src={`/assets/leg/leg1.png`}
                alt="Arm1"
            />
            ) : (
            <img
                className='LegIcon'
                id='bodyIcons'
                src={`/assets/leg/leg2.png`}
                alt="Arm2"
            />
            )}
        </>
    );
}

export default LegsIconAnimation;