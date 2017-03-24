import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { AddApplication, App, Home, Dashboard, ListUserApplication } from './containers/index';
import { getCompanies } from '../redux/company';
import { getPositions } from '../redux/position';
import { getSources } from '../redux/source';
import { getApplications } from '../redux/application';

const getCompaniesAndPositions = () => {
  getCompanies();
  getPositions();
  getSources();
};

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="/dashboard/:userId" component={Dashboard}>
      <IndexRoute
        onEnter={getApplications}
        component={ListUserApplication}
      />
      <Route
        path="addApplication"
        onEnter={getCompaniesAndPositions}
        component={AddApplication}
      />
    </Route>
  </Route>
);
