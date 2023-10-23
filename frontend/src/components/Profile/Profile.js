import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCharacters, clearCharacterErrors } from "../../store/characters";
import CharacterItem from "../Characters/CharacterItem";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import CharacterForm from "../Characters/CreateCharacterModal"; //set this up
import "./Profile.css";
import pic from "./back2.png";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userCharacters = useSelector((state) => state.characters.allCharacters ?? []);
  const history = useHistory();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserCharacters(currentUser._id));
    }
    return () => dispatch(clearCharacterErrors());
  }, [currentUser, dispatch]);

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

      const toggleInfoModal  = () => {
        setShowInfoModal(!showInfoModal);
    }


  return (
    <div className="ret-form">
      <button className="log-btn" onClick={logoutUser}>
        Logout
      </button>
      <h2 className="char-header">
        All of {currentUser.username}'s Characters
      </h2>
      <button className="new-btn" onClick={toggleForm}>
        New Character
      </button>

      <div className="char-container">
                                <button id='info-button' onClick={toggleInfoModal}>
                        <i class="fas fa-circle-info"></i>
                    </button>
          {userCharacters.map((character, index) => (
          <CharacterItem key={character._id} character={character} />
          ))}
      </div>
      {isFormOpen && <CharacterForm id="form-char" onClose={() => setIsFormOpen(false)} />}
      <img className="back-image" src={pic} alt="Backgr" />
              {showInfoModal && (
          <div id="info-modal">
          <div id="info-modal-content">
              {/* Your modal content here */}
              <button onClick={toggleInfoModal}>X</button>
              <p className='modal-text'>
              Character Save File Page<br/><br/>
              -- This is where you can create your characters
              <br/><br/><br/><br/>
              Character File<br/><br/>
              -- Create a new character with your choice of color and name<br/><br/>
              -- Click on file to see there game page and start working on them<br/><br/>
              -- Hit the delete button to delete the character<br/><br/>
              -- Use the log out button to return to the home page<br/><br/>

              </p>
          </div>
          </div>
      )}
    </div>
  );
}


export default Profile;
