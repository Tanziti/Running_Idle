import { useEffect, useState } from "react";
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
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
      {/* <NavBar /> */}
        <Theme/>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path='/user/characters' component={Profile} />
          <Route exact path='/character/:characterId' component={CharacterShow} />
          <Route exact path='/runs/character/:characterId' component={RunsPage} />
        </Switch>
      </>
    )
  );
}

export default App;