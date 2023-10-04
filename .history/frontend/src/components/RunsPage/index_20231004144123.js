import './RunsPage.css'
import MapContainer from '../Map/Map.js'


const RunsPage = ({character}) => {

    return (
        <>
            <div id="characterrunspage-containre">
                <div id='characterrunspage-header'>{character}'s Run Page</div>
                <div id='runsdata-container'>
                    <div id='characterrunspage-map'>
                        <MapContainer/>
                    </div>
                    <div id='characterrunspage-startandindex'>
                        <div id='characterrunspage-startrun'>
                            <input type></input>
                        </div>
                        <div id='characterrunspage-runindex'>

                        </div>     
                    </div>
                </div>

            </div>
        </>
    )

}

export default RunsPage;