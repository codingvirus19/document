import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Join from './user/Join';
import Login from './user/Login';
import Container from './Container';
import NotFound from './NotFound';

export default class Router1 extends React.Component {
  
  render() {
    return (
      <Router>
        <Route path="/codingvirus19/" exact  component={Login }/>
        <Route path="/codingvirus19/main" exact component={Container}/>
      </Router>
    );
  }
}
