import './CharacterItem.css';
import { Link } from 'react-router-dom';
import { deleteCharacter } from '../../store/characters'
import { useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';



function CharacterItem ({character}) { 
  
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteCharacter = (e) => {
    e.preventDefault();
    dispatch(deleteCharacter(character._id));
    // history.push('/user/characters');
    window.location.reload()//needs to be fixed ....
  };

  


  return (
    <Link to="/character/show">
      <div className="character">
        <ul id='charStuff'>
          <button onClick={handleDeleteCharacter}>Delete</button>
          name<li>{character.name}</li>
          arms<li>{character.arms}</li>
          heart<li>{character.heart}</li>
          legs<li>{character.legs}</li>
          outfit<li>{character.outfit}</li>
          points<li>{character.points}</li>
          shoes<li>{character.shoes}</li>
        </ul>
      </div>
    </Link>
  );
}

export default CharacterItem;