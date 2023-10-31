import "./CharacterAnimations/CharacterShow.css";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveCharacter, updateCharacter } from "../../store/characters";
import JumpingRopeAnimation from "./CharacterAnimations/JumpingRopeAnimation";
import { logout } from "../../store/session";
import RunningAnimation from "./CharacterAnimations/RunningAnimation";
import ArmsAnimation from "./CharacterAnimations/ArmsAnimation";
import ArmsIconAnimation from "./CharacterAnimations/ArmIconAnimation";
import LegsIconAnimation from "./CharacterAnimations/LegIconAnimation";
import HeartIconAnimation from "./CharacterAnimations/HeartIconAnimation";

const CharacterShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { characterId } = useParams();
  const character = useSelector((state) => state.characters.activeCharacter);
  const isAudioMuted = useSelector((state) => state.audio.isPlaying);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    dispatch(fetchActiveCharacter(characterId));
    setArmsXp(character?.arms);
    setLegsXp(character?.legs);
    setHeartXp(character?.heart);
    setPoints(character?.points);
  }, [
    dispatch,
    characterId,
    character?.heart,
    character?.legs,
    character?.arms,
    character?.points,
  ]);

  const levelUpAudio = new Audio();
  levelUpAudio.src = "/assets/sounds/level_up.mp3";
  const playLevelUpSound = () => {
    if (!isAudioMuted) {
      levelUpAudio.volume = 0.0;
      levelUpAudio.play();
    } else {
      levelUpAudio.volume = 0.15;
      levelUpAudio.play();
    }
  };
  // useEffect(() => {
  //  if (!isAudioMuted){
  //      levelUpAudio.volume = 0.00;
  //      console.log(levelUpAudio.volume)
  //  } else {
  //      levelUpAudio.volume = 0.15;
  //      console.log(levelUpAudio.volume)
  //  }
  // },[isAudioMuted])

  // const playLevelUpSound = () => {

  //     const levelUpAudio = new Audio();
  //     levelUpAudio.src = "/assets/sounds/level_up.mp3";
  //     levelUpAudio.volume = 0.15;
  //     if (isAudioMuted){
  //     levelUpAudio.play();
  //     }
  // };

  const goToChars = (e) => {
    e.preventDefault();
    history.push("/user/characters");
  };

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const [showArmsAnimation, setShowArmsAnimation] = useState(true);
  const [showJumpingRopeAnimation, setShowJumpingRopeAnimation] =
    useState(false);
  const [showRunningAnimation, setShowRunningAnimation] = useState(false);

  let [armsXp, setArmsXp] = useState(0);
  let [legsXp, setLegsXp] = useState(0);
  let [heartXp, setHeartXp] = useState(0);
  let [points, setPoints] = useState(0);

  if (!character || !character.name) return null;

  const handleShowArms = () => {
    if (character.points > 0) {
      setShowArmsAnimation(true);
      setShowRunningAnimation(false);
      setShowJumpingRopeAnimation(false);

      if (armsXp < 1000) {
        armsXp = armsXp + 10;
        points = points - 1;
        const updatedCharacter = { ...character, points: points, arms: armsXp };
        dispatch(updateCharacter(updatedCharacter));
      }
    }
    if (armsXp % 100 === 0 && armsXp !== 0) {
      playLevelUpSound(); // Play the level-up sound
    }
  };

  const handleShowJumpingRope = () => {
    if (character.points > 0) {
      setShowJumpingRopeAnimation(true);
      setShowRunningAnimation(false);
      setShowArmsAnimation(false);

      if (legsXp < 1000) {
        legsXp = legsXp + 10;
        points = points - 1;
        const updatedCharacter = { ...character, points: points, legs: legsXp };
        dispatch(updateCharacter(updatedCharacter));
      }
      if (legsXp % 100 === 0 && legsXp !== 0) {
        playLevelUpSound(); // Play the level-up sound
      }
    }
  };

  const handleShowRunning = () => {
    if (character.points > 0) {
      setShowRunningAnimation(true);
      setShowJumpingRopeAnimation(false);
      setShowArmsAnimation(false);

      if (heartXp < 1000) {
        heartXp = heartXp + 10;
        points = points - 1;
        const updatedCharacter = {
          ...character,
          points: points,
          heart: heartXp,
        };
        dispatch(updateCharacter(updatedCharacter));
      }
      if (heartXp % 100 === 0 && heartXp !== 0) {
        playLevelUpSound(); // Play the level-up sound
      }
    }
  };

  const getArmsColor = () => {
    if (armsXp === 1000) return "#ff69b4";
    if (armsXp % 100 < 40) {
      return "#ff0000";
    } else if (armsXp % 100 < 70) {
      return "#ffa500";
    }
    return "#2ecc71";
  };

  const getLegsColor = () => {
    if (legsXp === 1000) return "#ff69b4";
    if (legsXp % 100 < 40) {
      return "#ff0000";
    } else if (legsXp % 100 < 70) {
      return "#ffa500";
    }
    return "#2ecc71";
  };

  const getHeartColor = () => {
    if (heartXp === 1000) return "#ff69b4";
    if (heartXp % 100 < 40) {
      return "#ff0000";
    } else if (heartXp % 100 < 70) {
      return "#ffa500";
    }
    return "#2ecc71";
  };

  const cheat = () => {
    const updatedCharacter = { ...character, points: character.points + 50 };
    dispatch(updateCharacter(updatedCharacter));
  };

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  return (
    <>
      <div id="showPageContainer">
        <div id="showPageNavBar">
          <button id="info-button" onClick={toggleInfoModal}>
            <i class="fas fa-circle-info"></i>
          </button>
          <div id="CharacterName">{character.name}</div>
          <div id="CharPoints">${character.points}</div>
          <div id="cheat-button-text">Cheat&rarr;</div>
          <img
            onClick={cheat}
            alt="CharImg"
            src={`/assets/${character.outfit}_Outfit/${character.outfit}_Outfit_${character.shoes}_Shoes1.png`}
            id="charStaticImgIcon"
          />
          <button
            className="charShowButtons"
            id="charShowNavButtons"
            onClick={() => history.push(`/runs/character/${characterId}`)}
          >
            Runs!{" "}
          </button>
          <button
            onClick={goToChars}
            className="charShowButtons"
            id="charShowNavButtons"
          >
            Profile
          </button>
          <button
            onClick={logoutUser}
            className="charShowButtons"
            id="charShowNavButtons"
          >
            Logout
          </button>
        </div>
        <div id="charsStuffContainer">
          <div id="charStats">
            <div className="attributeBar">
              <button
                onClick={handleShowArms}
                className="charShowButtons"
                id="armsButton"
              >
                Arms +
              </button>
              <div className="xpBar">
                <div
                  className="xpBar"
                  id="xpFillBar"
                  style={{
                    width: `${armsXp % 100}%`,
                    backgroundColor: getArmsColor(),
                  }}
                ></div>
              </div>
              <div id="xpPercent">{armsXp % 100}%</div>
              <div id="xpLevel">L{Math.floor(armsXp / 100)}</div>
              {showArmsAnimation && <ArmsIconAnimation />}
            </div>

            <div className="attributeBar">
              <button
                onClick={handleShowJumpingRope}
                className="charShowButtons"
                id="legsButton"
              >
                Legs +
              </button>
              <div className="xpBar">
                <div
                  className="xpBar"
                  id="xpFillBar"
                  style={{
                    width: `${legsXp % 100}%`,
                    backgroundColor: getLegsColor(),
                  }}
                ></div>
              </div>
              <div id="xpPercent">{legsXp % 100}%</div>
              <div id="xpLevel">L{Math.floor(legsXp / 100)}</div>
              {showJumpingRopeAnimation && <LegsIconAnimation />}
            </div>

            <div className="attributeBar">
              <button
                onClick={handleShowRunning}
                className="charShowButtons"
                id="heartButton"
              >
                Heart +
              </button>
              <div className="xpBar">
                <div
                  className="xpBar"
                  id="xpFillBar"
                  style={{
                    width: `${heartXp % 100}%`,
                    backgroundColor: getHeartColor(),
                  }}
                ></div>
              </div>
              <div id="xpPercent">{heartXp % 100}%</div>
              <div id="xpLevel">L{Math.floor(heartXp / 100)}</div>
              {showRunningAnimation && <HeartIconAnimation />}
            </div>
          </div>

          <div id="charSprite">
            {showArmsAnimation && (
              <ArmsAnimation character={character}></ArmsAnimation>
            )}
            {showJumpingRopeAnimation && (
              <JumpingRopeAnimation
                character={character}
              ></JumpingRopeAnimation>
            )}
            {showRunningAnimation && (
              <RunningAnimation character={character}></RunningAnimation>
            )}
          </div>
        </div>
      </div>
      {/* Info Modal */}
      {showInfoModal && (
        <div id="info-modal">
          <div id="info-modal-content">
            {/* Your modal content here */}
            <button onClick={toggleInfoModal}>X</button>
            <p className="modal-text">
              Character Page
              <br />
              <br />
              -- This is where you can play with the character you created
              <br />
              <br />
              <br />
              <br />
              Points
              <br />
              <br />
              -- This is the currency for leveling up
              <br />
              <br />
              -- Points are obtained by actually running on the runs page
              <br />
              <br />
              -- You will be rewarded points based on the distance you ran
              <br />
              <br />
              -- There is a cheat button for demo purposes
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              Arms/Legs/Heart
              <br />
              <br />
              -- You can spend points on leveling up your character
              <br />
              <br />
              -- Click these buttons to spend points in the corresponding stat
              <br />
              <br />
              -- Requires 100% filled bar to lvl up and can reach a max lvl of
              10
              <br />
              <br />
              <br />
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterShow;
