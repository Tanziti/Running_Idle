import React, { useEffect, useState } from 'react';
import './RunsPage.css'
import { useDispatch } from 'react-redux';
import * as runActions from '../../store/runs'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { fetchActiveCharacter } from '../../store/characters'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import lofipixel from './LoFi-Pixel.png'

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


export const RunsPage = (props) => {
  const dispatch = useDispatch();
  const {characterId} = useParams();
  const [startLat, setStartLat] = useState(40.73);
  const [startLng, setStartLng] = useState(-73.99);
  const [endLat, setEndLat] = useState();
  const [endLng, setEndLng] = useState(); 
  const [runStarted, setRunStarted] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  // const [runId, setRunId] = useState(null);
  // const [runs, setRuns] = useState([]);

  // const [locationClicked, setLocationClicked] = useState(false);


  const getStartLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setStartLat(latitude);
          setStartLng(longitude);
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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setEndLat(latitude);
          setEndLng(longitude);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported."));
    }
  });
};


  const startRun = async () => {
    setRunStarted(true);
    setStartTime(new Date().getTime());
    await getStartLocation();
  };

  


  const endRun = async () => {
    setRunStarted(false);
    setEndTime(new Date().getTime());
    await getEndLocation();
  };

  const createRun = () => {
    setEndLat(endLat);
    setEndLng(endLng);
    if (endLat !== undefined && endLng !== undefined && endTime !== undefined) {
      return dispatch(runActions.composeRun({
        character: characterId,
        startTime: startTime,
        startPosition: [startLat, startLng],
        endTime: endTime,
        endPosition: [endLat, endLng],
        duration: endTime - startTime,
        distance: 3.2345,
        caption: "testing runs"
      }));
    }
  }

  useEffect(() => {
   createRun();
  }, [endLng]);

  useEffect(() => {
    dispatch(fetchActiveCharacter(characterId))
    dispatch(runActions.fetchCharacterRuns(characterId))
  }, [characterId,dispatch])

    const character = useSelector(state => state.characters.activeCharacter)
    
    // const runs = useSelector(runActions.getRuns(characterId))
  


  // console.log(character, "   ", characterId)



  const toggleRunStart = !runStarted ?
      (<div id='characterrunspage-startrun'>
        <button type="submit" className='runstartstoptoggle' onClick={startRun}>Start Run</button>
      </div>) :
     (<div id='characterrunspage-endrun'>
        <button type="submit" className='runstartstoptoggle' onClick={endRun}>End Run</button>
      </div>)
  

  if (!character || !character.name) return null
  
  return (
          <>
              <div id="characterrunspage-container">
              <img className="lofipixel" src={lofipixel} alt="lofi-pixel" />
                  <div id='characterrunspage-headercontainer'>
                    <div id='characterrunspage-header'>{character?.name}'s Runs</div>
                  </div>
                  <div id='runsdata-container'>
                      <div id='characterrunspage-map'>
                        <Map
                          google={props.google}
                          zoom={15}
                          initialCenter={{ lat: startLat, lng: startLng }}
                          style={{ width: '1000px', height: '800px'}}
                          center={{ lat: endLat, lng: endLng }}
                        >
                        </Map>
                      </div>
                      <div id='characterrunspage-currentrunandindex'>
                        <div id='characterrunspage-currentruncontainer'>
                        {/* <div id=''></div>
                        <div id=''></div> */}
                          <div id='characterrunspage-togglebutton'>
                            {toggleRunStart}
                          </div>
                          <div id='currentrun-data'>
                            <div>Start Lat: {startLat} Start Lng: {startLng}</div>
                            <div>End Lat: {endLat} End Lng: {endLng}</div>
                          </div>

                        
                        </div>
                        <div id='characterrunspage-runindexcontainer'>
                            {character?.name}'s Runs Index
                            <div id='runsindex'>
                                {/* {runs.map((run) => {
                                  <div id='eachrun'> Starting Position: {run?.startPosition}</div>
                                })} */}
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