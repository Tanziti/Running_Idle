import React, { useState, useEffect } from 'react';

const HeartIconAnimation = ({character})  => {
    const [isImage1Visible, setIsImage1Visible] = useState(true);

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
                id='bodyIcons'
                src={`/assets/heart/heart1.png`}
                alt="Arm1"
            />
            ) : (
            <img
                id='bodyIcons'
                src={`/assets/heart/heart2.png`}
                alt="Arm2"
            />
            )}
        </>
    );
}

export default HeartIconAnimation;