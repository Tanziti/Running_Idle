
const SET_SOURCE = 'UI/SET_SOURCE'
const PLAY_AUDIO = 'UI/PLAY_AUDIO'
const PAUSE_AUDIO = 'UI/PAUSE_AUDIO'
const SET_AUDIO_MUTE = 'UI/SET_AUDIO_MUTE'

export const setAudioSource = (source) => ({
    type: SET_SOURCE,
    payload: source,
  });
  
  // Play the audio
  export const playAudio = () => ({
    type: PLAY_AUDIO,
  });
  
  // Pause the audio
  export const pauseAudio = () => ({
    type: PAUSE_AUDIO,
  });
  
  // Stop the audio
  export const muteAudio = () => ({
    type: SET_AUDIO_MUTE,
  });

  const initialState = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    currentSource: null,
  };
  
  const audioReducer = (state = initialState, action) => {
    switch (action.type) {
      case PLAY_AUDIO:
        return {
          ...state,
          isPlaying: true,
        };
  
      case PAUSE_AUDIO:
        return {
          ...state,
          isPlaying: false,
        };
  
      case SET_AUDIO_MUTE:
        return {
          ...state,
          isPlaying: false,
          currentTime: 0,  // Resetting the current time
        };
  
      // ... other cases ...
  
      default:
        return state;
    }
  };

  export default audioReducer;