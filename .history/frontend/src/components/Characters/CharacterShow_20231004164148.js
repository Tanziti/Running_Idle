import './CharacterShow.css';
import  { useHistory } from React
import React from 'react';

const CharacterShow = () => {

const history = useHistory();

    return (
        <>
            Hello from the CharacterShow Page

            <div id='charactershow-runsbutton'>
                <button id='charactershow-runspage' onCLick></button>
            </div>
        </>
    )
}

export default CharacterShow;