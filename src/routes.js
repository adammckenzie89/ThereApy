import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Favorites from "./components/favorites/Favorites";
import Profile from "./components/Profile/Profile";
import Search from "./components/search/Search";

export default (
  <Switch>
    <Route path="/search" component={Search} />
    <Route path="/profile" component={Profile} />
    <Route path="/favorites" component={Favorites} />
    <Route exact path="/" component={Login} />
  </Switch>
);
