import React, { useContext } from "react";
import "./App.css";
import SignMethod, { AuthContext } from "./components/SignMethod";
import Login from "./components/Login";
import Register from "./components/Register";
import Anime from "./components/Anime";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AnimeNewPage from "./components/AnimeNewPage";
function App() {
  return (
    <Router>
      <SignMethod>
        <Switch>
          <Route exact path="/" component={Anime}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/animeDesc" component={AnimeNewPage}></Route>
        </Switch>
      </SignMethod>
    </Router>
  );
}

export default App;
