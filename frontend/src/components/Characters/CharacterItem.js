import "./CharacterItem.css";
import { Link } from "react-router-dom";
import { deleteCharacter } from "../../store/characters";
import { useDispatch } from "react-redux";
// import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';

function CharacterItem({ character }) {
  // const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteCharacter = (e) => {
    e.preventDefault();
    dispatch(deleteCharacter(character._id));
    // history.push('/user/characters');
    // window.location.reload(); //needs to be fixed ....
  };

  return (
    <div className="form-cont">
      <Link id="linkss" to={`/character/${character._id}`}>
        <div className="character">
          <div className="char-name">{character.name.toUpperCase()}</div>
          <div className="char-points">Points: {character.points}</div>
          <div>
            <button className="del-btn" onClick={handleDeleteCharacter}>
              Delete
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CharacterItem;
