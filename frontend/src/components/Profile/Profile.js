// src/components/Profile/Profile.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCharacter, clearCharacterErrors } from '../../store/characters';
import CharacterItem from '../Characters/CharacterItem';

function Profile () {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userCharacters = useSelector(state => Object.values(state.characters.user))

    useEffect(() => {
        dispatch(fetchUserCharacter(currentUser._id));
        return () => dispatch(clearCharacterErrors());
    }, [currentUser, dispatch]);

// console.log('cool***********', userCharacters)



    if (userCharacters.length === 0) {
        return <button>New Game</button>
    } else {
        return (
        <>
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