import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCharacter, clearCharacterErrors } from '../../store/characters';
import CharacterItem from '../Characters/CharacterItem';
import { logout } from '../../store/session';
import { useHistory } from "react-router-dom";

function Profile () {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userCharacters = useSelector(state => Object.values(state.characters.user))
    const history = useHistory();

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

    if (userCharacters.length === 0) {
        return (
            <>
                <button onClick={logoutUser} >Logout</button>
                <button>New Game</button>
            </>
        )
    } else {
        return (
        <>
            <button onClick={logoutUser} >Logout</button>
            <h2>All of {currentUser.username}'s Characters</h2>
            <button>New Game</button>
            {userCharacters.map(character => (
            <CharacterItem
                key={character._id}
                character={character}
            />
            ))}
        </>
        );
    }
}

export default Profile;