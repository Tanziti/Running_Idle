import React, { useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

function Runs(props, character) {
    const [currentLat, setCurrentLat] = useState(40.7357);
    const [currentLng, setCurrentLng] = useState(-73.9929);
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
      distance: 3.2345,
      caption: "testing runs"
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
    <>
      <div>
          
      
        
        
  
      </div>
              <div id="characterrunspage-containre">
                  <div id='characterrunspage-header'>{character}'s Run Page</div>
                    <p>
                      Current Latitude: {currentLat} Current Longitude: {currentLng}
                    </p>
                  <div id='runsdata-container'>
                      <div id='characterrunspage-map'>
                        <Map
                          google={props.google}
                          zoom={15}
                          initialCenter={{ lat: currentLat, lng: currentLng }}
                        >
                          {/* Add map components, markers, or other elements here */}
                        </Map>
                      </div>
                      <div id='characterrunspage-startandindex'>
                          <div id='characterrunspage-togglebutton'>
                              
                          </div> 
                          <div id='characterrunspage-runindex'>

                          </div>     
                      </div>
                  </div>

              </div>
            </>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD2GkzAfzUY-yjdhS9jXuOJZWCr1m-IgRM',
})(MapContainer);