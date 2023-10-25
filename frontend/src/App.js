import { useEffect, useState, createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { AuthRoute } from "./components/Routes/Routes";
import MainPage from "./components/MainPage/MainPage";
import Profile from "./components/Profile/Profile.js"
// import Map from "./components/Map/Map";
import { getCurrentUser } from "./store/session";
import CharacterShow from "./components/Characters/CharacterShow";
import RunsPage from './components/RunsPage/RunsPage';
import Theme from './components/Sounds/Theme.js';
import Leaderboard from './components/Leaderboard/Leaderboard'
import Modal from "./components/MainPage/Modal";


function App() {
 
  const [loaded, setLoaded] = useState(false);
  const [showInitialModal, setShowInitialModal] = useState(true); // Control the initial modal
  const [showSubsequentComponent, setShowSubsequentComponent] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  const closeModal = () => {
    setShowInitialModal(false);
    setShowSubsequentComponent(true);
  };
  return (
    loaded && (
      <>
         {/* {showInitialModal && (
        <Modal onClose={closeModal} />
      )}  */}
     
     {showSubsequentComponent && (
        <Theme /> // Render the subsequent component
      )}
      
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path='/user/characters' component={Profile} />
          <Route exact path='/character/:characterId' component={CharacterShow } />
          <Route exact path='/runs/' component={Leaderboard} />
          <Route exact path='/runs/character/:characterId' component={RunsPage} />
        </Switch>
      
      </>
    )
  );
}

export default App;