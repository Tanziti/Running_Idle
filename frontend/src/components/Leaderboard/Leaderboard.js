import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAllRuns } from "../../store/runs"


const formatTime = (millisec) => {
    const minutes = Math.floor((millisec / (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((millisec % (1000 * 60)) / 1000);

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`
}


const Leaderboard = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const runs = useSelector(state => state.runs);



    useEffect(() => {
        dispatch(fetchAllRuns())
    }, [dispatch]);




console.log(runs)
if (!runs) return null

return (

    <div id="all-runs-index-container">

        <button onClick={(e) => (history.push('/'))}>Home Page</button>
{/*     
        <ul id="all-runs">
            {runs.map((run) => (
            <li id='runindexitem'>
            <div id='eachrun'> Time: {formatTime(run.duration)}</div>
            <div id='eachrun'> Distance: {(run.distance).toFixed(4)} mi</div>
            <div id='eachrun'> Pace: {formatTime((run.duration)/(run.distance))} time/mile</div>
            <div id='eachrun'> Points: {(run.distance).toFixed(4) * 15} pts</div>
            </li>
            ))}
        </ul> */}

    </div>

);

}

export default Leaderboard;
