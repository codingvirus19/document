import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Join from './User/Join';
import Login from './User/Login';
import Container from './Container';
import { signIn } from './User/auth';
import NotFound from './NotFound';


function Router1() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ email, password }) => setUser(signIn({ email, password }));


  return (
    <Router>
      <Switch>
        <Route exact path="/" render={props => (
          <Login authenticated={authenticated} login={login} {...props} />
        )} />
        <Route exact path="/login" render={props => (
          <Login authenticated={authenticated} login={login} {...props} />
        )} />
        <Route exact path="/join" component={Join} />
        <Route path="/main" component={Container} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default Router1;