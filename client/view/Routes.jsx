import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, Dashboard, AddApplication } from './containers/index';
import { getCompanies } from '../redux/company';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="/dashboard/:userId" component={Dashboard}>
      <Route path="addApplication" onEnter={getCompanies} component={AddApplication} />
    </Route>
  </Route>
);
