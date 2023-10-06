import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserCharacters,
  clearCharacterErrors,
} from "../../store/characters";
import CharacterItem from "../Characters/CharacterItem";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import CharacterForm from "../Characters/CreateCharacterModal"; //set this up
import "./Profile.css";
import pic from "./back2.png";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userCharacters = useSelector((state) =>
    Object.values(state.characters.user)
  );
  const history = useHistory();
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  if (userCharacters.length === 0) {
    return (
      <div>
        <button className="log-btn" onClick={logoutUser}>
          Logout
        </button>
        <button className="new-btn" onClick={toggleForm}>
          New Character
        </button>
        {isFormOpen && <CharacterForm id="form-char" onClose={toggleForm} />}
        <img className="back-image" src={pic} alt="Backgr" />
      </div>
    );
  } else {
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
            {userCharacters.map((character, index) => (
            <CharacterItem key={character._id} character={character} />
            ))}
        </div>
        {isFormOpen && <CharacterForm id="form-char" onClose={toggleForm} />}
        <img className="back-image" src={pic} alt="Backgr" />
      </div>
    );
  }
}

export default Profile;
