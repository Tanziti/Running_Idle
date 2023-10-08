import './CharacterAnimations/CharacterShow.css';
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveCharacter, updateCharacter } from "../../store/characters"
import JumpingRopeAnimation from './CharacterAnimations/JumpingRopeAnimation'
import { logout } from "../../store/session";
import RunningAnimation from './CharacterAnimations/RunningAnimation'
import ArmsAnimation from './CharacterAnimations/ArmsAnimation'

const CharacterShow = () => {

    const dispatch = useDispatch();
    const history = useHistory();    
    const {characterId} = useParams();
    const character = useSelector(state => state.characters.activeCharacter);

    useEffect(() => {
        dispatch(fetchActiveCharacter(characterId))
        setArmsXp(character?.arms)
        setLegsXp(character?.legs)
        setHeartXp(character?.heart)
        setPoints(character?.points)
    }, [dispatch, characterId, character?.heart, character?.legs, character?.arms, character?.points])

// console.log("hey***********",character?.arms)

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

    let [armsXp, setArmsXp] = useState(0);
    let [legsXp, setLegsXp] = useState(0);
    let [heartXp, setHeartXp] = useState(0);
    let [points, setPoints] = useState(0);

    if (!character || !character.name) return null

    const handleShowArms = () => {
        setShowArmsAnimation(true);
        setShowRunningAnimation(false);
        setShowJumpingRopeAnimation(false);
        
        if (character.points > 0) {
            armsXp = armsXp + 10;
            points = points - 1;
            
            const updatedCharacter = { ...character, points: points, arms: armsXp };
            dispatch(updateCharacter(updatedCharacter))
        }
    };

    const handleShowJumpingRope = () => {
        setShowJumpingRopeAnimation(true);
        setShowRunningAnimation(false); 
        setShowArmsAnimation(false);

        if (character.points > 0) {
            legsXp =legsXp + 10;
            points =points - 1;
            
            const updatedCharacter = { ...character, points: points, legs: legsXp };
            dispatch(updateCharacter(updatedCharacter))
        }
    };

    const handleShowRunning = () => {
        setShowRunningAnimation(true);
        setShowJumpingRopeAnimation(false); 
        setShowArmsAnimation(false);

        if (character.points > 0) {
            heartXp = heartXp + 10;
            points = points - 1;
            
            const updatedCharacter = { ...character, points: points, heart: heartXp };
            dispatch(updateCharacter(updatedCharacter))
        }
    };

    const getArmsColor = () => {
        if ((armsXp%100) < 40) {
            return "#ff0000";
        } else if ((armsXp%100) < 70) {
            return "#ffa500"
        }
        return "#2ecc71"
    }

    const getLegsColor = () => {
        if ((legsXp%100) < 40) {
            return "#ff0000";
        } else if ((legsXp%100) < 70) {
            return "#ffa500"
        }
        return "#2ecc71"
    }

    const getHeartColor = () => {
        if ((heartXp%100) < 40) {
            return "#ff0000";
        } else if ((heartXp%100) < 70) {
            return "#ffa500"
        }
        return "#2ecc71"
    }

    const cheat = () => {
        const updatedCharacter = { ...character, points: character.points + 50 };
        dispatch(updateCharacter(updatedCharacter))
    }


    return (
        <>
            <div id="showPageContainer">
                <div id='showPageNavBar'>
                    <div id='CharacterName'>{character.name}</div>
                    <div id='CharPoints'>${character.points}</div>
                    <img onClick={cheat} alt="CharImg" src={`/assets/${character.outfit}_Outfit/${character.outfit}_Outfit_${character.shoes}_Shoes1.png`} id="charStaticImgIcon" />
                    <button className='charShowButtons' id='charShowNavButtons' onClick={() => history.push(`/runs/character/${characterId}`)}>Runs!</button>
                    <button onClick={goToChars} className='charShowButtons' id='charShowNavButtons'>Profile</button>
                    <button onClick={logoutUser} className='charShowButtons' id='charShowNavButtons'>Logout</button>
                </div>
                <div id="charsStuffContainer">

                    <div id="charStats">
                        <div className='attributeBar'>
                            <button onClick={handleShowArms} className='charShowButtons' id='armsButton'>Arms +</button>
                            <div className='xpBar'>
                                <div className='xpBar' id='xpFillBar' style={{ width: `${armsXp%100}%`, backgroundColor: getArmsColor() }}></div>
                            </div>
                            <div id='xpPercent'>{armsXp%100}%</div>
                            <div id='xpLevel'>L{Math.floor(armsXp/100)}</div>
                        </div>

                        <div className='attributeBar'>
                        <button onClick={handleShowJumpingRope} className='charShowButtons' id='legsButton'>Legs +</button>
                            <div className='xpBar'>
                                <div className='xpBar' id='xpFillBar' style={{ width: `${(legsXp%100)}%`, backgroundColor: getLegsColor() }}></div>
                            </div>
                            <div id='xpPercent'>{(legsXp%100)}%</div>
                            <div id='xpLevel'>L{Math.floor(legsXp/100)}</div>
                        </div>

                        <div className='attributeBar'>
                        <button onClick={handleShowRunning} className='charShowButtons' id='heartButton'>Heart +</button>
                            <div className='xpBar'>
                                <div className='xpBar' id='xpFillBar' style={{ width: `${heartXp%100}%`, backgroundColor: getHeartColor() }}></div>
                            </div>
                            <div id='xpPercent'>{heartXp%100}%</div>
                            <div id='xpLevel'>L{Math.floor(heartXp/100)}</div>
                        </div>
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