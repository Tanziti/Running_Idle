import React, { useEffect, useState } from 'react';
import './RunsPage.css'
import { useDispatch } from 'react-redux';
import * as runActions from '../../store/runs'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { fetchCharacter, getCharacter } from '../../store/characters'
import { Map, GoogleApiWrapper } from 'google-maps-react';
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const RunsPage = (props) => {
  const dispatch = useDispatch();
  const {characterId} = useParams();
  const [currentLat, setCurrentLat] = useState(40.73);
  const [currentLng, setCurrentLng] = useState(-73.99);
  const [endLat, setEndLat] = useState(10);
  const [endLng, setEndLng] = useState(11); 
  const [runStarted, setRunStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [endTime, setEndTime] = useState();
  // const [runId, setRunId] = useState(null);
  // const [runs, setRuns] = useState([]);

  // const [locationClicked, setLocationClicked] = useState(false);


  const getStartLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          debugger
          const { latitude, longitude } = position.coords;
          setCurrentLat(latitude);
          setCurrentLng(longitude);
          debugger
          resolve();
        }, reject);
      } else {
        reject(new Error("Geolocation is not supported."));
      }
    });
  };


  const getEndLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setEndLat(latitude);
          setEndLng(longitude);
          resolve();
        }, reject);
      } else {
        reject(new Error("Geolocation is not supported."));
      }
    });
  };

  const startRun = async () => {
    await getStartLocation();
    setRunStarted(true);
    setCurrentTime(new Date().getTime());
    debugger
  };
  const endRun = async () => {
    await getEndLocation();
    setRunStarted(false);
    setEndTime(new Date().getTime());
    debugger
    try {
      if (
        characterId &&
        currentTime &&
        currentLat !== undefined &&
        currentLng !== undefined &&
        endTime &&
        endLat !== undefined &&
        endLng !== undefined
      ) {
        return dispatch(runActions.composeRun({
          character: characterId,
          startTime: currentTime,
          startPosition: [currentLat, currentLng],
          endTime: endTime,
          endPosition: [endLat, endLng],
          duration: endTime - currentTime,
          distance: 3.2345,
          caption: "testing runs"
        }));
      } else {
        console.error("Missing values for create run.");
      }
    } catch (error) {
      console.error("Error in endRun:", error);
    }
  };


  useEffect(() => {
    dispatch(fetchCharacter(characterId))
    dispatch(runActions.fetchCharacterRuns(characterId))
  }, [characterId,dispatch])

    const character = useSelector(getCharacter(characterId))
    
    const runs = useSelector(runActions.getRuns(characterId))
  


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
                    <div id='characterrunspage-header'>{character?.name}'s Runs</div>
                    <div>Current Lat: {currentLat} Current Long: {currentLng}</div>
                    {toggleRunStart}
                  </div>
                  <div id='runsdata-container'>
                      <div id='characterrunspage-map'>
                        <Map
                          google={props.google}
                          zoom={15}
                          initialCenter={{ lat: currentLat, lng: currentLng }}
                          style={{ width: '1000px', height: '800px'}}
                        >
                        </Map>
                      </div>
                      <div id='characterrunspage-startandindex'>
                          <div id='characterrunspage-togglebutton'>
                              Button
                          </div> 
                          <div id='characterrunspage-runindex'>
                            {character?.name}'s Runs Index
                            <div id='runsindex'>
                                {runs.map((run) => {
                                  <div id='eachrun'> Starting Position: {run?.startPosition}</div>
                                })}
                            </div>
                          </div>     
                      </div>
                  </div>
              </div>
          </>
  );
}

export default GoogleApiWrapper({
  apiKey: apiKey,
})(RunsPage);