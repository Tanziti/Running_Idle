import './CharacterItem.css';


function CharacterItem ({character}) { //{ character: { text, author }}
  // const { username } = author;
  console.log("HEY***********", character)
  return (
    <div className="character">
      <ul id='charStuff'>
        name<li>{character.name}</li>
        arms<li>{character.arms}</li>
        heart<li>{character.heart}</li>
        legs<li>{character.legs}</li>
        outfit<li>{character.outfit}</li>
        points<li>{character.points}</li>
      </ul>
    </div>
  );
}

export default CharacterItem;