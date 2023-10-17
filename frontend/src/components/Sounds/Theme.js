import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './Theme.css';
import { setAudioSource } from '../../store/UI';
import { playAudio } from '../../store/UI';
import { muteAudio } from '../../store/UI';

function Theme() {
  const [audioMuted, setAudioMuted] = useState(true);
  const audioRef = React.createRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const originalVolume = 0.05;

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audioMuted;
    setAudioMuted(!audioMuted);
    audio.volume = originalVolume;
    if (audio.muted){
       dispatch(muteAudio());
    } else {
      dispatch(playAudio())
    }
   
  };


  // Define a function to compute the audio source based on the current route
  const getAudioSource = () => {
    const { pathname } = location;
    if (pathname === '/' || pathname === '/users') {
      return '/assets/sounds/theme1.mp3'; // Play "theme1" for / and /users routes
    } else {
      return '/assets/sounds/runs_theme.mp3'; // Play "theme2" for all other routes
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = getAudioSource();
      audio.load();
    }
  }, [getAudioSource()]);

  return (
    <div id='audio-player-top-level-div'>
      <audio
        ref={audioRef}
        controls
        muted={audioMuted}
        autoPlay
        style={{ display: 'none' }}
        loop
      >
        Your browser does not support the audio element.
      </audio>

      <button onClick={toggleMute} className='audio-player-mute-button'>
        {audioMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}

export default Theme;
