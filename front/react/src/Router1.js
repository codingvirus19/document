import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Join from "./User/Join";
import Login from "./User/Login";
import Container from "./Container";
import NotFound from "./NotFound";

export default class Router1 extends React.Component {
  render() {
    return (
      <Router>
<<<<<<< HEAD
        <Switch>
          <Route exact path="http://localhost:8080/codingvirus19/" render={props => (
            <Login />
          )} />
          <Route exact path="/login" render={props => (
            <Login />
          )} />
        </Switch>
=======
        <Login />
>>>>>>> branch 'master' of https://github.com/codingvirus19/document.git
      </Router>
    );
  }
}
