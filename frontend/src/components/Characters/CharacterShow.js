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
            Hello from the {character.name} show page

            <div id='charactershow-runsbutton'>
                <button id='charactershow-runspage' onClick={() => history.push(`/runs/character/${characterId}`)}></button>
            </div>
        </>
    )
}

export default CharacterShow;