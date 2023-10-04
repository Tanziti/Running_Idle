import './RunsPage.css'
import MapContainer from '../Map/Map.js'
import * as runActions from '../../store/runs.js'


const RunsPage = ({character}) => {



    const startRun = () => {
        return dispatch(runActions.fetchCharacterRuns(character._id))
    }

    return (
        <>
            <div id="characterrunspage-containre">
                <div id='characterrunspage-header'>{character}'s Run Page</div>
                <div id='runsdata-container'>
                    <div id='characterrunspage-map'>
                    </div>
                    <div id='characterrunspage-startandindex'>
                  
                        <div id='characterrunspage-runindex'>

                        </div>     
                    </div>
                </div>

            </div>
        </>
    )

}

export default RunsPage;