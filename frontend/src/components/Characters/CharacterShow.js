import './CharacterShow.css';
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacter } from '../../store/characters';
import { fetchCharacter } from "../../store/characters"

const CharacterShow = () => {

const dispatch = useDispatch();

const history = useHistory();    
const {characterId} = useParams();
const character = useSelector(getCharacter(characterId));

    useEffect(() => {

        dispatch(fetchCharacter(characterId))
    }, [dispatch,characterId])

// console.log(character)

    if (!character || !character.name) return null
    return (
        <>
            {/* Hello from the {character.name} show page */}
            <div id="showPageContainer">
                <div id='showPageNavBar'>
                    <div id='CharacterName'>{character.name}</div>
                    <div>¯\_(ツ)_/¯</div>
                    <button className='navBarButtons' id='showPageRunsButton' onClick={() => history.push(`/runs/character/${characterId}`)}>Runs!</button>
                    <button className='navBarButtons' id='profile'>Profile</button>
                    <button className='navBarButtons' id='logout'>Logout</button>
                </div>
                <div id="charsStuffContainer">
                    <div id="charStats">
                        <button className='charStatsButtons' id='armsButton'>Arms +</button>
                        <button className='charStatsButtons' id='legsButton'>Legs +</button>
                        <button className='charStatsButtons' id='heartButton'>Heart +</button>
                    </div>
                    <div id="charSprite">

                    </div>
                </div>
            </div>
        </>
    )
}

export default CharacterShow;