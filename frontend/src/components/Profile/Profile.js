import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCharacters, clearCharacterErrors } from '../../store/characters';
import CharacterItem from '../Characters/CharacterItem';
import { logout } from '../../store/session';
import { useHistory } from "react-router-dom";
import CharacterForm from '../Characters/CreateCharacterModal'//set this up
import './Profile.css'
import pic from './background1.png'

function Profile () {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userCharacters = useSelector(state => Object.values(state.characters.user))
    const history = useHistory();
    const [isFormOpen, setIsFormOpen] = useState(false);
    

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUserCharacters(currentUser._id));
        }
        return () => dispatch(clearCharacterErrors());
    }, [currentUser, dispatch]);

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
        history.push("/");
    }

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };
    // console.log(userCharacters)

    console.log(userCharacters)
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
            {userCharacters.map((character, index) => (
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