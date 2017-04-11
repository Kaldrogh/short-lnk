import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';

import Signup from '../ui/Signup';
import Links from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const loggedIn = !!Meteor.userId();
const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/links"/>
  ) : (
    <Login/>
  )
)}/>
      <Route path="/signup" render={() => (
  loggedIn ? (
    <Redirect to="/links"/>
  ) : (
    <Signup/>
  )
)}/>
      <Route path="/links" render={() => (
  loggedIn ? (
    <Links/>
  ) : (
    <Redirect to="/"/>
  )
)}/>
      <Route component={NotFound} location={location}/>
    </Switch>
  </Router>
);

export default Routes;
