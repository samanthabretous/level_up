import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.css';
import store from '../redux/store';
import routes from './Routes';

const renderApp = (CurrentRoute) => {
  render(
    <Provider store={store}>
      <Router history={browserHistory} routes={CurrentRoute} />
    </Provider>,
    document.getElementById('root'));
};

renderApp(routes);

if (module.hot) {
  module.hot.accept('./Routes', () => {
    const nextRoutes = require('./Routes').default;
    renderApp(nextRoutes);
  });
}
