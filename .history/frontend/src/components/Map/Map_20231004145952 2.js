import React, { useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

function MapContainer(props) {
    const [currentLat, setCurrentLat] = useState(null);
    const [currentLng, setCurrentLng] = useState(null);
    const [runStarted, setRunStarted] = useState(false);
    // const [locationClicked, setLocationClicked] = useState(false);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLat(latitude);
        setCurrentLng(longitude);
        // setLocationClicked(true);
      });
    }
  };

  const startRun = () => {
    getCurrentLocation;
    return dispatch(runActions.fetchCharacterRuns(character._id))
  }


  const toggleRunStart = if (!runStarted) {
    return (
      <div id='characterrunspage-startrun'>
        <input type="submit" onClick={startRun}>Start Run</input>

  } else {
      <div id='characterrunspage-endrun'>
        <input type="submit" onClick={endRun}>Start Run</input>
      </div>
  }

  return (
    <div>
          <div id='characterrunspage-startrun'>
                            <input type="submit" onClick={startRun}>Start Run</input>
          </div>
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