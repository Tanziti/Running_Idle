import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';


const RECEIVE_USER_CHARACTERS = "characters/RECEIVE_USER_CHARACTERS";
const RECEIVE_NEW_CHARACTER = "characters/RECEIVE_NEW_CHARACTER";
const RECEIVE_DELETE_CHARACTER = "characters/DELETE_CHARACTER";
const RECEIVE_UPDATED_CHARACTER = "characters/RECEIVE_UPDATED_CHARACTER";
const SELECT_CHARACTER = "characters/SELECT_CHARACTER"
const RECEIVE_CHARACTER_ERRORS = "characters/RECEIVE_CHARACTER_ERRORS";
const CLEAR_CHARACTER_ERRORS = "characters/CLEAR_CHARACTER_ERRORS";


export const getCharacter = characterId => state => {
    const character = state.characters.find((character) => character._id === characterId);
    return character
}




const receiveUserCharacters = characters => ({
  type: RECEIVE_USER_CHARACTERS,
  characters
});




const receiveNewCharacter = character => ({
  type: RECEIVE_NEW_CHARACTER,
  character
});

const selectCharacter = character => ({
  type: SELECT_CHARACTER,
  character
});

const receiveDeletedCharacter = (characterId) => ({
  type: RECEIVE_DELETE_CHARACTER,
  characterId
});

const receiveUpdatedCharacter = character => ({
  type: RECEIVE_UPDATED_CHARACTER,
  character
});


const receiveErrors = errors => ({
  type: RECEIVE_CHARACTER_ERRORS,
  errors
});

export const clearCharacterErrors = errors => ({
    type: CLEAR_CHARACTER_ERRORS,
    errors
})


export const updateCharacter = (character) =>  async dispatch =>{
  const { _id, name, heart, legs, arms, outfit, shoes, points } = character;
  const data = { name, heart, legs, arms, outfit, shoes, points }
  // try {
    const res = await jwtFetch(`/api/characters/${_id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    const updatedCharacter = await res.json();
    dispatch(receiveUpdatedCharacter(updatedCharacter));
  // } catch(err) {
  //   const resBody = await err.json();
  //   if (resBody.statusCode === 400) {
  //     return dispatch(receiveErrors(resBody.errors));
  //   }
  // }
}



export const fetchUserCharacters = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/characters/user/${id}`);
    const characters = await res.json();
    dispatch(receiveUserCharacters(characters));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};


export const fetchActiveCharacter = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/characters/${id}`);
    const character = await res.json();
    dispatch(selectCharacter(character));
  } catch(err) {
      return dispatch(receiveErrors(err));
  }
};



export const composeCharacter = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/characters/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const character = await res.json();
    dispatch(receiveNewCharacter(character));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};


export const deleteCharacter = (characterId) => async (dispatch) => {
  try {
    // Send a request to your API to delete the character with characterId

    await jwtFetch(`/api/characters/${characterId}`, {
      method: 'DELETE',
    });

    // Dispatch the DELETE_CHARACTER action to remove the character from the state
    dispatch(receiveDeletedCharacter(characterId));
  } catch (error) {
    // Handle any errors here
    console.error('Error deleting character:', error);
  }
};


const nullErrors = null;

export const characterErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_CHARACTER_ERRORS:
      return action.errors;
    case RECEIVE_NEW_CHARACTER:
    case CLEAR_CHARACTER_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};


const initialCharacterState = () => ({
  // The allCharacters of allCharacters characters at any given point in time. 
  // This value will be `null` if the allCharacters hasn't been loaded yet.
  allCharacters: null,
  // The currently selected character, as used on the "view character" screen. 
  // This value be will `null` if no character is selected.
  activeCharacter: null
})


const characterReducer = (state = initialCharacterState(), action) => {
  
  switch(action.type) {
    case RECEIVE_USER_CHARACTERS:
      return {...state, allCharacters: [...action.characters]}

    case RECEIVE_NEW_CHARACTER:
      return {...state, allCharacters: [...state.allCharacters, action.character]}
      // return [...state, action.character]

    case RECEIVE_DELETE_CHARACTER:
      const newCharacters = state.allCharacters.filter(character => character._id !== action.characterId);
      return {...state, allCharacters: newCharacters}

    case RECEIVE_UPDATED_CHARACTER:
      if(state.allCharacters === null) return { ...state, activeCharacter: action.character }
      const updatedCharacters = state.allCharacters.map(character => {
        if (character._id === action.character._id){
          return action.character
        } else {
          return character
        }
      });

      if (state.allCharacters !== null) {
          // We have characters loaded.
        return { ...state, activeCharacter: action.character, allCharacters: updatedCharacters}
      } else {
        return { ...state, activeCharacter: action.character };
      }

    case SELECT_CHARACTER:
      return { ...state, activeCharacter: action.character };

    case RECEIVE_USER_LOGOUT:
      return initialCharacterState();

    default:
      return state;
  }
};

export default characterReducer;