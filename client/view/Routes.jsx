import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, Login } from './containers/index';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="/login" component={Login} />
  </Route>
);
