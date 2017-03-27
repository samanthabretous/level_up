import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { AddApplication, App, Home, Dashboard, DisplayApplication, ListUserApplication } from './containers/index';
import { getCompanies } from '../redux/company';
import { getPositions } from '../redux/position';
import { getSources } from '../redux/source';
import { getApplications, getApplicationById } from '../redux/application';

const getCompaniesPositionsAndSources = () => {
  getCompanies();
  getPositions();
  getSources();
};
console.log(getApplicationById());
export default (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="/dashboard/:userId/" component={Dashboard}>
      <IndexRoute
        onEnter={getApplications}
        component={ListUserApplication}
      />
      <Route
        path="addApplication"
        onEnter={getCompaniesPositionsAndSources}
        component={AddApplication}
      />
      <Route
        path="application/:appId"
        onEnter={getApplicationById}
        component={DisplayApplication}
      />
    </Route>
  </Route>
);
