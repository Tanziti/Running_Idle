import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { AuthRoute } from "./components/Routes/Routes";
import MainPage from "./components/MainPage/MainPage";
// import NavBar from "./components/NavBar/NavBar.js"

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
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
        </Switch>
      </>
    )
  );
}

export default App;
