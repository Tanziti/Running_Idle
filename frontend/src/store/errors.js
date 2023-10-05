// src/store/errors.js

import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { characterErrorsReducer } from './characters'
import { runErrorsReducer } from './runs';

export default combineReducers({
  session: sessionErrorsReducer,
  character: characterErrorsReducer,
  run: runErrorsReducer
});