import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_ALL_RUNS = "runs/RECEIVE_ALL_RUNS"
const RECEIVE_CHARACTER_RUNS = "runs/RECEIVE_CHARACTER_RUNS";
const RECEIVE_CHARACTER_RUN = "runs/RECEIVE_CHARACTER_RUN";
const RECEIVE_RUN_ERRORS = "run/RECEIVE_RUN_ERRORS";
const CLEAR_RUN_ERRORS = "runs/CLEAR_RUN_ERRORS";


export const getRun = runId => state => {
    return state.runs ? state.runs[runId] : null;
}
export const getRuns = characterId => state => {
    return state.runs ? Object.values(state.runs) : [];
}



const receiveCharacterRun = run => ({
  type: RECEIVE_CHARACTER_RUN,
  run
});

const receiveCharacterRuns = (runs, character) => ({
  type: RECEIVE_CHARACTER_RUNS,
  runs,
  character
});


const receiveAllRuns = (runs) => ({
  type: RECEIVE_ALL_RUNS,
  runs
});





// const receiveUpdatedCharacter = character => ({
//   type: RECEIVE_UPDATED_CHARACTER,
//   character
// });



const receiveErrors = errors => ({
  type: RECEIVE_RUN_ERRORS,
  errors
});

export const clearRunErrors = errors => ({
    type: CLEAR_RUN_ERRORS,
    errors
})


export const fetchCharacterRun = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/runs/${id}`);
    const run = await res.json();
    dispatch(receiveCharacterRun(run));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};


export const fetchCharacterRuns = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/runs/character/${id}`);
    const runs = await res.json();
    dispatch(receiveCharacterRuns(runs));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};


export const fetchAllRuns = () => async dispatch => {
  try {
    const res = await jwtFetch(`/api/runs/`);
    const runs = await res.json();
    dispatch(receiveAllRuns(runs));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};



export const composeRun = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/runs/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const run = await res.json();
    dispatch(receiveCharacterRun(run));
    // console.log(run);
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const updateRun = run => async dispatch => {
  try {
    const res = await jwtFetch(`/api/runs/${run.id}`, {
      method: 'PATCH',
      body: JSON.stringify(run)
    });
    const updateRun = await res.json();
    dispatch(receiveCharacterRun(updateRun));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
}



const nullErrors = null;

export const runErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_RUN_ERRORS:
      return action.errors;
    case CLEAR_RUN_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};


const runReducer = (state = { all: {}, character: {}, new: undefined }, action) => {
  switch(action.type) {
    case RECEIVE_CHARACTER_RUNS:
      return { ...state, character: action.runs, new: undefined};
    case RECEIVE_CHARACTER_RUN:
        return {...state, character: action.run, new: undefined}
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined }
    case RECEIVE_ALL_RUNS:
      return { ...state, all: action.runs, new: undefined};
    default:
      return state;
  }
};

export default runReducer;