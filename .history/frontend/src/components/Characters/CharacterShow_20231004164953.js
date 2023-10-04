import './CharacterShow.css';
import  { useHistory } from React
import React from 'react';

const CharacterShow = () => {

const history = useHistory();
const {characterId} 

    return (
        <>
            Hello from the CharacterShow Page

            <div id='charactershow-runsbutton'>
                <button id='charactershow-runspage' onClick={() => history.push(`/runs/character/:characterId`)}></button>
            </div>
        </>
    )
}

export default CharacterShow;