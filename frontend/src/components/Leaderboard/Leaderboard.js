import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAllRuns } from "../../store/runs"
import "./Leaderboard.css";
import React, { useState } from 'react';


const formatTime = (millisec) => {
    const minutes = Math.floor((millisec / (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((millisec % (1000 * 60)) / 1000);

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`
}


const Leaderboard = () => {
    const [showInfoModal, setShowInfoModal] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const runs = useSelector(state => state.runs.all);



    useEffect(() => {
        dispatch(fetchAllRuns())
    }, [dispatch]);

    const toggleInfoModal  = () => {
        setShowInfoModal(!showInfoModal);
    }


if (Object.keys(runs).length === 0) return null
return (

    <div id="all-runs-index-container">

        <button id='runs-index-home-button' className="charShowButtons" onClick={(e) => (history.push('/'))}>Home Page</button>
        <button id='info-button' onClick={toggleInfoModal}>
            <i class="fas fa-circle-info"></i>
        </button>
        <div id="all-runs" className='leaderboard-title'>LeaderBoard!</div>
        <ul id="all-runs"> 
            {runs.map((run, index) => (
            <li id='runindexitem'>
                <div>Place #{index+1}</div>
                <div id='eachrun'> Time: {formatTime(run.duration)}</div>
                <div id='eachrun'> Distance: {(run.distance).toFixed(4)} mi</div>
                <div id='eachrun'> Pace: {formatTime((run.duration)/(run.distance))} time/mile</div>
                <div id='eachrun'> Points: {(run.distance).toFixed(4) * 15} pts</div>
            </li>
            ))}
        </ul>
                    {showInfoModal && (
                <div id="info-modal">
                <div id="info-modal-content">
                    {/* Your modal content here */}
                    <button onClick={toggleInfoModal}>X</button>
                    <p className='modal-text'>
                    Leaderboard Page<br/><br/>
                    -- This is where you can see the top runs in teh database
                    <br/><br/><br/><br/>
                    Placements<br/><br/>
                    -- The top runs are determined by distance ran<br/><br/>
                    -- Runs are sorted in descending order<br/><br/>
                    -- Each run is placed between 1st and 10th longest run<br/><br/>
                    -- Place, Time, Distance, Pace, and Points earned are displayed<br/><br/>

                    </p>
                </div>
                </div>
            )}
    </div>

);

}

export default Leaderboard;
