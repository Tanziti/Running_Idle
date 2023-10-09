import React, { useEffect, useState } from 'react';
import './RunsPage.css'
import { useDispatch } from 'react-redux';
import * as runActions from '../../store/runs'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { fetchActiveCharacter } from '../../store/characters'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import lofipixel from './LoFi-Pixel.png'
import * as characterActions from '../../store/characters'

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
  const character = useSelector(state => state.characters.activeCharacter)
  // const [myRuns, setMyRuns] = useState([]);


  // const [runId, setRunId] = useState(null);
  // const [runs, setRuns] = useState([]);

  // const [locationClicked, setLocationClicked] = useState(false);
  const runs = useSelector(state => state.runs.character)
  console.log(runs[0])


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
    addPoints();
    if (endLat !== undefined && endLng !== undefined && endTime !== undefined) {
      return dispatch(runActions.composeRun({
        character: characterId,
        startTime: startTime,
        startPosition: [startLat, startLng],
        endTime: endTime,
        endPosition: [endLat, endLng],
        duration: endTime - startTime,
        distance: calculateDistance(startLat, startLng, endLat, endLng),
        caption: "testing runs"
      }));
    }
  }

  const formatTime = (millisec) => {
    const minutes = Math.floor((millisec / (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((millisec % (1000 * 60)) / 1000);

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8;
  
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
  
    return distance;
  }
  
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  }

  const addPoints = () => {   
      // 15 * calculateDistance(startLat, startLng, endLat, endLng)
      if (character) {
        const updatedCharacter = { ...character, points: (5 + character.points)};
        dispatch(characterActions.updateCharacter(updatedCharacter))
      }
      
  };

  useEffect(() => {
   createRun();
  }, [endLng]);

  useEffect(() => {
    dispatch(fetchActiveCharacter(characterId))
    dispatch(runActions.fetchCharacterRuns(characterId))
    
    // setMyRuns(runs)
  }, [characterId, dispatch])


  


  // console.log(character, "   ", characterId)

  // const runsIndex = runs ? 
  // (
  //   {runs.map((run) => {      
  //             <div>
  //               <div id='eachrun'> Time: {run.duration}</div>
  //               <div id='eachrun'> Distance: {run.distance}</div>
  //               <div id='eachrun'> Pace: </div>
  //               <div id='eachrun'> Points: {run.distance * 15} pts</div>
  //             </div>
  //           })}
  // ) : (<div>No runs yet!</div>)

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
                          style={{ width: '800px', height: '800px'}}
                          center={{ lat: endLat, lng: endLng }}
                        >
                        </Map>
                      </div>
                      <div id='characterrunspage-currentrunandindex'>
                        <div id='characterrunspage-currentruncontainer'>
                          <div id='characterrunspage-togglebutton'>
                            {toggleRunStart}
                          </div>
                          <div id='currentrun-data'>
                            <div>Start Position: {startLng ? `[${Number(startLat.toFixed(4))}, ${Number(startLng.toFixed(4))}]` : ''}</div>
                            <div>End Position: {endLng ? `[${Number(endLat.toFixed(4))}, ${Number(endLng.toFixed(4))}]` : ''}</div>
                            <div>Time: {endTime ? formatTime(endTime - startTime) : ''}</div>
                            <div>Distance: {endLng ? calculateDistance(startLat, startLng, endLat, endLng) : ''}mi</div>
                            <div>Pace: {endLng ? formatTime(Math.floor((endTime - startTime)/calculateDistance(startLat, startLng, endLat, endLng))) : ''} time/mile</div>
                            <div>Points: {endLng ? Number((15 * calculateDistance(startLat, startLng, endLat, endLng)).toFixed(3)) : ''} pts</div>
                          </div>

                        
                        </div>
                        <div id='characterrunspage-runindexcontainer'>
                            <div id='runsindexheader'>{character?.name}'s Runs</div>
                            <div id='runsindex'>
                              {/* {runsIndex} */}
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