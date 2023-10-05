import React, { useEffect, useState } from 'react';
import './RunsPage.css'
import { useDispatch } from 'react-redux';
import * as runActions from '../../store/runs'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { fetchCharacter, getCharacter } from '../../store/characters'
import { Map, GoogleApiWrapper } from 'google-maps-react';

export const RunsPage = (props) => {
  const dispatch = useDispatch();
  const {characterId} = useParams();
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
    getCurrentLocation();
    setRunStarted(true);
    return dispatch(runActions.composeRun({
      character: characterId,
      startTime: currentTime,
      startPosition: [currentLat, currentLng] 
    }))
  }

  const endRun = () => {
    getCurrentLocation();
    setRunStarted(false);
    return dispatch(runActions.updateRun({
      character: characterId,
      endTime: currentTime,
      endPosition: [currentLat, currentLng],
      duration: 10399429,
      distance: 3.2345,
      caption: "testing runs"
    }))
  }


  useEffect(() => {
    dispatch(fetchCharacter(characterId))
    
  }, [characterId,dispatch])

    const character = useSelector(getCharacter(characterId))


  // console.log(character, "   ", characterId)



  const toggleRunStart = !runStarted ?
      (<div id='characterrunspage-startrun'>
        <button type="submit" onClick={startRun}>Start Run</button>
      </div>) :
     (<div id='characterrunspage-endrun'>
        <button type="submit" onClick={endRun}>End Run</button>
      </div>)
  

  if (!character || !character.name) return null
  
  return (
          <>
              <div id="characterrunspage-containre">
                  <div id='characterrunspage-headercontainer'>
                    <div id='characterrunspage-header'>{character?.name}'s Run Page</div>
                    <div>Current Latitude: {currentLat} Current Longitude: {currentLng}</div>
                  </div>
                  <div id='runsdata-container'>
                      <div id='characterrunspage-map'>
                        <Map
                          google={props.google}
                          zoom={15}
                          initialCenter={{ lat: currentLat, lng: currentLng }}
                          style={width: 800px, }
                        >
                        </Map>
                      </div>
                      <div id='characterrunspage-startandindex'>
                          <div id='characterrunspage-togglebutton'>
                              {toggleRunStart}
                          </div> 
                          <div id='characterrunspage-runindex'>
                                Runs Index
                          </div>     
                      </div>
                  </div>
              </div>
          </>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD2GkzAfzUY-yjdhS9jXuOJZWCr1m-IgRM',
})(RunsPage);