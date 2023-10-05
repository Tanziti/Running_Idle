import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';


const RECEIVE_USER_CHARACTERS = "characters/RECEIVE_USER_CHARACTERS";
const RECEIVE_USER_CHARACTER = "characters/RECEIVE_USER_CHARACTER";
const RECEIVE_NEW_CHARACTER = "characters/RECEIVE_NEW_CHARACTER";
const RECEIVE_DELETE_CHARACTER = 'DELETE_CHARACTER';
// const RECEIVE_UPDATED_CHARACTER = "characters/RECEIVE_UPDATED_CHARACTER";
const RECEIVE_CHARACTER_ERRORS = "characters/RECEIVE_CHARACTER_ERRORS";
const CLEAR_CHARACTER_ERRORS = "characters/CLEAR_CHARACTER_ERRORS";


export const getCharacter = characterId => state => {
    return state.characters ? state.characters[characterId] : null;
}
export const getCharacters = state => {
    return state.characters ? Object.values(state.characters) : [];
}


const receiveUserCharacters = characters => ({
  type: RECEIVE_USER_CHARACTERS,
  characters
});




const receiveNewCharacter = character => ({
  type: RECEIVE_NEW_CHARACTER,
  character
});

const receiveDeletedCharacter = (characterId) => ({
  type: RECEIVE_DELETE_CHARACTER,
  characterId,
});

// const receiveUpdatedCharacter = character => ({
//   type: RECEIVE_UPDATED_CHARACTER,
//   character
// });


const receiveErrors = errors => ({
  type: RECEIVE_CHARACTER_ERRORS,
  errors
});

export const clearCharacterErrors = errors => ({
    type: CLEAR_CHARACTER_ERRORS,
    errors
})



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


export const fetchCharacter = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/characters/${id}`);
    const character = await res.json();
    //debugger
    dispatch(receiveNewCharacter(character));
  } catch(err) {
    console.log(err)
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
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

const characterReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  const newState = {...state}

  switch(action.type) {
    case RECEIVE_USER_CHARACTERS:
      return { ...newState, user: action.characters, new: undefined};
    case RECEIVE_NEW_CHARACTER:
      return { ...newState, [action.character._id]: action.character};
    case RECEIVE_DELETE_CHARACTER:
      // const newState = { ...newState };
      // console.log("***********reducer",newState)
      delete newState.user[action.characterId];
      // console.log("***********",state)
      return newState;
    case RECEIVE_USER_LOGOUT:
      return { ...newState, user: {}, new: undefined }
    default:
      return newState;
  }
};

export default characterReducer;