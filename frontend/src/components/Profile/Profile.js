import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCharacter, clearCharacterErrors } from '../../store/characters';
import CharacterItem from '../Characters/CharacterItem';
import { logout } from '../../store/session';
import { useHistory } from "react-router-dom";
import CharacterForm from '../Characters/CreateCharacterModal'//set this up


function Profile () {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userCharacters = useSelector(state => Object.values(state.characters.user))
    const history = useHistory();
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUserCharacter(currentUser._id));
        }
        return () => dispatch(clearCharacterErrors());
    }, [currentUser, dispatch]);

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
        history.push("/");
    }

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen); // Toggle the form's visibility
    };



    if (userCharacters.length === 0) {
        return (
            <div>
                <button onClick={logoutUser} >Logout</button>
                <button onClick={toggleForm} >New Game</button>
                {isFormOpen && <CharacterForm onClose={toggleForm} />}
            </div>
        )
    } else {
        return (
        <div>
            <button onClick={logoutUser} >Logout</button>
            <h2>All of {currentUser.username}'s Characters</h2>
            <button onClick={toggleForm} >New Game</button>
            {userCharacters.map(character => (
            <CharacterItem
                key={character._id}
                character={character}
            />
            ))}
            {isFormOpen && <CharacterForm onClose={toggleForm} />}
        </div>
        );
    }
}

export default Profile;