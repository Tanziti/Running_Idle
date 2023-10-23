import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAllRuns } from "../../store/runs"
import "./Leaderboard.css";


const formatTime = (millisec) => {
    const minutes = Math.floor((millisec / (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((millisec % (1000 * 60)) / 1000);

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`
}


const Leaderboard = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const runs = useSelector(state => state.runs.all);



    useEffect(() => {
        dispatch(fetchAllRuns())
    }, [dispatch]);




if (Object.keys(runs).length === 0) return null
return (

    <div id="all-runs-index-container">

        <button id='runs-index-home-button' className="charShowButtons" onClick={(e) => (history.push('/'))}>Home Page</button>
    
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

    </div>

);

}

export default Leaderboard;
