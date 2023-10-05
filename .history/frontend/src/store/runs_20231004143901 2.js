import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';


const RECEIVE_USER_CHARACTERS = "characters/RECEIVE_USER_CHARACTERS";
const RECEIVE_NEW_CHARACTER = "characters/RECEIVE_NEW_CHARACTER";
// const RECEIVE_UPDATED_CHARACTER = "characters/RECEIVE_UPDATED_CHARACTER";
const RECEIVE_CHARACTER_ERRORS = "characters/RECEIVE_CHARACTER_ERRORS";
const CLEAR_CHARACTER_ERRORS = "characters/CLEAR_CHARACTER_ERRORS";


const receiveUserCharacter = characters => ({
  type: RECEIVE_USER_CHARACTERS,
  characters
});


const receiveNewCharacter = character => ({
  type: RECEIVE_NEW_CHARACTER,
  character
});

// const receiveUpdatedCharacter = character => ({
//   type: RECEIVE_NEW_CHARACTER,
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


export const fetchUserCharacter = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/characters/user/${id}`);
    const characters = await res.json();
    dispatch(receiveUserCharacter(characters));
  } catch(err) {
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


const runreducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch(action.type) {
    case RECEIVE_USER_CHARACTERS:
      return { ...state, user: action.characters, new: undefined};
    case RECEIVE_NEW_CHARACTER:
      return { ...state, new: action.character};
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined }
    default:
      return state;
  }
};

export default characterReducer;