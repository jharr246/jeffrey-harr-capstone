import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import CreateMeet from "./Pages/CreateMeet/CreateMeet";
import CreateUser from "./Pages/CreateUser/CreateUser";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ViewProfile from "./Pages/ViewProfile/ViewProfile";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/createUser" component={CreateUser} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/profile/:id" component={ViewProfile} />
          <ProtectedRoute exact path="/meet/:id" component={CreateMeet} />
        </Switch>
      </BrowserRouter>
    );
  }
}
