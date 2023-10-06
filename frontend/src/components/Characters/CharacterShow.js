import './CharacterAnimations/CharacterShow.css';
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacter } from '../../store/characters';
import { fetchCharacter } from "../../store/characters"
import JumpingRopeAnimation from './CharacterAnimations/JumpingRopeAnimation'
import { logout } from "../../store/session";
import RunningAnimation from './CharacterAnimations/RunningAnimation'
import ArmsAnimation from './CharacterAnimations/ArmsAnimation'

const CharacterShow = () => {

const dispatch = useDispatch();

const history = useHistory();    
const {characterId} = useParams();
const character = useSelector(getCharacter(characterId));

    useEffect(() => {

        dispatch(fetchCharacter(characterId))
    }, [dispatch,characterId])

// console.log(character.id)

const goToChars = (e) => {
    e.preventDefault();
    history.push("/user/characters");
}

    const logoutUser = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push("/");
    };

    const [showArmsAnimation, setShowArmsAnimation] = useState(true);
    const [showJumpingRopeAnimation, setShowJumpingRopeAnimation] = useState(false);
    const [showRunningAnimation, setShowRunningAnimation] = useState(false);

    const handleShowArms = () => {
        setShowArmsAnimation(true);
        setShowRunningAnimation(false);
        setShowJumpingRopeAnimation(false); 
    };

    const handleShowJumpingRope = () => {
        setShowJumpingRopeAnimation(true);
        setShowRunningAnimation(false); 
        setShowArmsAnimation(false);
    };

    const handleShowRunning = () => {
        setShowRunningAnimation(true);
        setShowJumpingRopeAnimation(false); 
        setShowArmsAnimation(false);
    };



    if (!character || !character.name) return null
    return (
        <>
            <div id="showPageContainer">
                <div id='showPageNavBar'>
                    <div id='CharacterName'>{character.name}</div>
                    <img alt="CharImg" src={`/assets/${character.outfit}_Outfit/${character.outfit}_Outfit_${character.shoes}_Shoes1.png`} id="charStaticImgIcon" />
                    <button className='charShowButtons' id='charShowNavButtons' onClick={() => history.push(`/runs/character/${characterId}`)}>Runs!</button>
                    <button onClick={goToChars} className='charShowButtons' id='charShowNavButtons'>Profile</button>
                    <button onClick={logoutUser} className='charShowButtons' id='charShowNavButtons'>Logout</button>
                </div>
                <div id="charsStuffContainer">
                    <div id="charStats">
                        <button onClick={handleShowArms} className='charShowButtons' id='armsButton'>Arms +</button>
                        <button onClick={handleShowJumpingRope} className='charShowButtons' id='legsButton'>Legs +</button>
                        <button onClick={handleShowRunning} className='charShowButtons' id='heartButton'>Heart +</button>
                    </div>
                    <div id="charSprite">
                        {showArmsAnimation && <ArmsAnimation character={character}></ArmsAnimation>}
                        {showJumpingRopeAnimation && <JumpingRopeAnimation character={character}></JumpingRopeAnimation>}
                        {showRunningAnimation && <RunningAnimation character={character}></RunningAnimation>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CharacterShow;