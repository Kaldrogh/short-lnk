import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

import SignupWithRouter from '../ui/Signup';
import Links from '../ui/Link';
import NotFound from '../ui/NotFound';
import LoginWithRouter from '../ui/Login';

const loggedIn = !!Meteor.userId();
const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LoginWithRouter}/>
      <Route path="/signup" component={SignupWithRouter}/>
      <Route path="/links" component={Links}/>
      <Route component={NotFound} location={location}/>
    </Switch>
  </Router>
);

export default Routes;
