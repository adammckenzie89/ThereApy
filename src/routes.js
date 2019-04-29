import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/login/Login";
import Favorites from "./components/favorites/Favorites";
import Places from "./components/Places/Places";
import Search from "./components/search/Search";

export default (
  <Switch>
    {/* <Route path="/" component={}/>
    <Route path="/" component={}/>
    <Route path="/" component={}/> */}
    <Route path="/" component={Login} />
  </Switch>
);
