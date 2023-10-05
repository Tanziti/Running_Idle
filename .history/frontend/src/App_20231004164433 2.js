import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { AuthRoute } from "./components/Routes/Routes";
import MainPage from "./components/MainPage/MainPage";
import Profile from "./components/Profile/Profile.js"
import Map from "./components/Map/Map";
import { getCurrentUser } from "./store/session";

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
      {<Map/>}
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <Route exact path='/user/characters' component={Profile} />
          <Route exact path='/runs/character/:character' component={Profile} />
        </Switch>
      </>
    )
  );
}

export default App;