import './CharacterItem.css';
import { Link } from 'react-router-dom';
import { deleteCharacter } from '../../store/characters'
import { useDispatch } from 'react-redux';




function CharacterItem ({character}) { 


  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const handleDeleteCharacter = (e) => {
    e.preventDefault();
    // Dispatch the thunk action when the button is clicked
    dispatch(deleteCharacter(character._id));
  };
  // console.log(character._id)


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