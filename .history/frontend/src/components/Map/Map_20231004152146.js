import React, { useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

function MapContainer(props, character) {
    const [currentLat, setCurrentLat] = useState(null);
    const [currentLng, setCurrentLng] = useState(null);
    const [runStarted, setRunStarted] = useState(false);
    const [currentTime, setCurrentTime] = useState();
    // const [locationClicked, setLocationClicked] = useState(false);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLat(latitude);
        setCurrentLng(longitude);
        setCurrentTime(new Date().getTime());
        // setLocationClicked(true);
      });
    }
  };

  const startRun = () => {
    getCurrentLocation;
    setRunStarted(true);
    return dispatch(runActions.composeRun({
      character: character.id,
      startTime: currentTime,
      startPosition: [currentLat, currentLng] 
    }))
  }

  const endRun = () => {
    getCurrentLocation;
    setRunStarted(false);
    return dispatch(runActions.updateRun({
      character: character.id,
      endTime: currentTime,
      endPosition: [currentLat, currentLng],
      duration: 10399429,
    }))
  }


  const toggleRunStart = !runStarted ?
      (<div id='characterrunspage-startrun'>
        <input type="submit" onClick={startRun}>Start Run</input>
      </div>) :
     (<div id='characterrunspage-endrun'>
      <input type="submit" onClick={endRun}>End Run</input>
    </div>)
  

  return (
    <div>
        {toggleRunStart}
      {(
        <p>
          Current Latitude: {currentLat} Current Longitude: {currentLng}
        </p>
      )}
      <Map
        google={props.google}
        zoom={15}
        initialCenter={{ lat: 40.734797, lng: -73.991039 }}
      >
        {/* Add map components, markers, or other elements here */}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD2GkzAfzUY-yjdhS9jXuOJZWCr1m-IgRM',
})(MapContainer);