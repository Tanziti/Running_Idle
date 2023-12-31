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

      {userCharacters.length < 3 &&
      <button className="new-btn" onClick={toggleForm}>
        New Characters!
      </button>
      }

      {userCharacters.length >= 3 &&
      <button className="new-btn">
        3 Max Characters!
      </button>
      }


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
      <div className="profile-page-links" id="profile-actual-links">
        Zi
        <a target="_blank" href="https://www.linkedin.com/in/tanzitian/">
          <img
            id="links1"
            src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"
          />
        </a>
        <a target="_blank" href="https://github.com/Tanziti">
          <img
            id="links1"
            src=" https://img.icons8.com/sf-ultralight/52/000000/github.png"
          />
        </a>
        Mo
        <a
          target="_blank"
          href="https://www.linkedin.com/in/muhammad-amray-b94983207/"
        >
          <img
            id="links2"
            src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"
          />
        </a>
        <a target="_blank" href="https://github.com/muhammadamray">
          <img
            id="links2"
            src=" https://img.icons8.com/sf-ultralight/52/000000/github.png"
          />
        </a>
        Avery
        <a
          target="_blank"
          href="https://www.linkedin.com/in/avery-berry-6a562a253/"
        >
          <img
            id="links3"
            src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"
          />
        </a>
        <a target="_blank" href="https://github.com/AveryRBerry">
          <img
            id="links3"
            src=" https://img.icons8.com/sf-ultralight/52/000000/github.png"
          />
        </a>
        Alex
        <a
          target="_blank"
          href="https://www.linkedin.com/in/alex-brown-85a330198/"
        >
          <img
            id="links4"
            src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"
          />
        </a>
        <a target="_blank" href="https://github.com/ajb-4">
          <img
            id="links4"
            src=" https://img.icons8.com/sf-ultralight/52/000000/github.png"
          />
        </a>
      </div>
    </div>
  );
}


export default Profile;
