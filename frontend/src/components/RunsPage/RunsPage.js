import React, { useEffect, useState } from 'react';
import './RunsPage.css'
import { useDispatch } from 'react-redux';
import * as runActions from '../../store/runs'
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { fetchActiveCharacter } from '../../store/characters'
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import lofipixel from './LoFi-Pixel.png'
import * as characterActions from '../../store/characters'
import charimage from './green_Outfit_green_Shoes1.png'


const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const RunsPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {characterId} = useParams();
  const [startLat, setStartLat] = useState();
  const [startLng, setStartLng] = useState();
  const [endLat, setEndLat] = useState();
  const [endLng, setEndLng] = useState(); 
  const [runStarted, setRunStarted] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [currLat, setCurrLat] = useState(40.73);
  const [currLng, setCurrLng] = useState(-73.99);
  const [currLat2, setCurrLat2] = useState();
  const [currLng2, setCurrLng2] = useState();
  const character = useSelector(state => state.characters.activeCharacter)
  const [showInfoModal, setShowInfoModal] = useState(false);
  // const [myRuns, setMyRuns] = useState([]);


  // const [runId, setRunId] = useState(null);
  // const [runs, setRuns] = useState([]);

  // const [locationClicked, setLocationClicked] = useState(false);
  const runs = useSelector(state => state.runs.character)


  const getStartLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setStartLat(latitude);
          setStartLng(longitude);
          setCurrLat(latitude);
          setCurrLng(longitude);
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
            setCurrLat2(latitude);
            setCurrLng2(longitude);
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
    addPoints();
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
        distance: calculateDistance(startLat, startLng, endLat, endLng),
        caption: "testing runs"
      }));
    }
  }

  const formatTime = (millisec) => {
    const totalSeconds = Math.floor(millisec / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
    return `${minutes}:${formattedSeconds}`;
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

  const viewRun = (startPosition, endPosition) => {
    setCurrLat(startPosition[0]);
    setCurrLng(startPosition[1]);
    setCurrLat2(endPosition[0]);
    setCurrLng2(endPosition[1]);
  }

  const demoRun = () => {

    let demoDuration = Math.random() * (2.4e6 - 1.2e6) + 1.2e6;

    setCurrLat(40.7128);
    setCurrLng(-74.0137);
    setCurrLat2(40.7641);
    setCurrLng2(-73.9782);
    
    setStartTime(1);
    setStartLat(40.7128);
    setStartLng(-74.0137);
    setEndTime(demoDuration);
    setEndLat(40.7641);
    setEndLng(-73.9782);

    dispatch(fetchActiveCharacter(characterId))
    dispatch(runActions.fetchCharacterRuns(characterId))
  }

  const charIcon = {
    url: charimage,
    scaledSize: new props.google.maps.Size(50, 50),
  };

  useEffect(() => {
   createRun();
   dispatch(fetchActiveCharacter(characterId))
   dispatch(runActions.fetchCharacterRuns(characterId))
  }, [endLng, dispatch]);

  useEffect(() => {
    dispatch(fetchActiveCharacter(characterId))
    dispatch(runActions.fetchCharacterRuns(characterId))
    
    // setMyRuns(runs)
  }, [characterId, dispatch])


  const toggleInfoModal  = () => {
    setShowInfoModal(!showInfoModal);
  }



  const runsIndex = runs.length > 0 ? (
    <div>
      {runs.map((run) => (
        <div id='runindexitem' onClick={() => viewRun(run.startPosition, run.endPosition)}>
          <div id='eachrun'> Time: {formatTime(run.duration)}</div>
          <div id='eachrun'> Distance: {(run.distance).toFixed(4)} mi</div>
          <div id='eachrun'> Pace: {run.distance > 0 ? formatTime((run.duration)/(run.distance)) : '00:00'} time/mile</div>
          <div id='eachrun'> Points: {(run.distance).toFixed(4) * 15} pts</div>
        </div>
      ))}
    </div>
  ) : (
    <div>No runs yet!</div>
  );

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
                    <button id='info-button' onClick={toggleInfoModal}>
                      <i class="fas fa-circle-info"></i>
                    </button>
                    <div id='runspage-charpagebutton'>
                      <button onClick={() => (history.push(`/character/${characterId}`))} className='charShowButtons' id='charShowNavButtons'>Back</button>
                      
                    </div>
                    <div id='characterrunspage-header'>
                      <div>Running Hub</div>
                    </div>
                    <div id='characterrunspage-characterheader'>
                      <div>Character: {character?.name}</div>
                    </div>
                  </div>
                  
                  <div id='runsdata-container'>
                      <div id='characterrunspage-map'>
                        <Map
                          google={props.google}
                          zoom={15}
                          initialCenter={{ lat: currLat, lng: currLng }}
                          style={{ width: '800px', height: '800px'}}
                          center={{ lat: currLat, lng: currLng }}
                          >
                          <Marker position={{
                              lat: currLat, 
                              lng: currLng}} icon={charIcon}/>
                          <Marker position={{
                              lat: currLat2, 
                              lng: currLng2}} icon={charIcon}/>
                          <Polyline
                            path={[
                              { lat: currLat, lng: currLng },
                              { lat: currLat2, lng: currLng2 },
                            ]}
                            options={{ strokeColor: '#800080', strokeWeight: 3 }}
                          />
                          </Map>
                      </div>
                      <div id='characterrunspage-currentrunandindex'>
                        <div id='characterrunspage-currentruncontainer'>
                          <div id='characterrunspage-togglebutton'>
                            {toggleRunStart}
                            <div id='characterrunspage-demorun'>
                              <button type="submit" className='runstartstoptoggle' onClick={demoRun}>Demo Run</button>
                            </div>
                          </div>
                          <div id='currentrun-data'>
                            <div>Start Position: {startLng ? `[${Number(startLat.toFixed(4))}, ${Number(startLng.toFixed(4))}]` : ''}</div>
                            <div>End Position: {endLng ? `[${Number(endLat.toFixed(4))}, ${Number(endLng.toFixed(4))}]` : ''}</div>
                            <div>Time: {endTime ? formatTime(endTime - startTime) : ''}</div>
                            <div>Distance: {endLng ? calculateDistance(startLat, startLng, endLat, endLng).toFixed(3) : ''} mi</div>
                            <div>Pace: {calculateDistance(startLat, startLng, endLat, endLng) > 0 ? formatTime(Math.floor((endTime - startTime)/calculateDistance(startLat, startLng, endLat, endLng))) : ''} time/mile</div>
                            <div>Points: {endLng ? Number((15 * calculateDistance(startLat, startLng, endLat, endLng)).toFixed(3)) : ''} pts</div>
                          </div>

                        
                        </div>
                        <div id='characterrunspage-runindexcontainer'>
                            <div id='runsindexheader'>{character?.name}'s Past Runs</div>
                            <div id='runsindex'>
                              {runsIndex}
                            </div>      
                        </div> 
                      </div>
                      
                  </div>
              </div>
              {showInfoModal && (
                <div id="info-modal">
                  <div id="info-modal-content">
                      <button onClick={toggleInfoModal}>X</button>
                      <p className='modal-text'>
                      Character Runs Page<br/><br/>
                      -- This is where you can create a run for character points
                      <br/><br/><br/><br/>
                      Runs<br/><br/>
                      -- You can start a run, logging your current position<br/><br/>
                      -- The end button completes your run logging finale position<br/><br/>
                      -- Your rewarded points based distance traveled<br/><br/>
                      -- The character is updated with the new points<br/><br/>
                      -- A log of all runs are displayed for this character<br/><br/>
                      <br/><br/><br/><br/>
                      Google Maps Information<br/><br/>
                      -- When starting a run your position is shown on the map<br/><br/>
                      -- When ending a run your new position is shown<br/><br/>
                      -- Completing a run logs and displays the details of that run<br/><br/>
                      </p>
                  </div>
                </div>
              )}
          </>
  );
}

export default GoogleApiWrapper({
  apiKey: apiKey,
})(RunsPage);