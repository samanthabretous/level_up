import axios from 'axios';
import store from './store';
import _ from 'lodash';

// -------------------
// types
// -------------------
const GET_ALL_APPLICATIONS = 'get_all_applications';

// -------------------
// actions
// -------------------

export const allApplications = applications => ({
  type: GET_ALL_APPLICATIONS,
  applications,
});


// thunk action
// getState can also be pass thru as an argument after dispatch
export const getApplicationsAsync = userId => (dispatch) => {
  axios.get(`/api/application/user/${userId}`)
  .then(({ data }) => {
    dispatch(allApplications(data));
  })
  .catch(err => err);
};

export const getApplications = (nextState) => {
  store.dispatch(getApplicationsAsync(nextState.params.userId));
};

export const updateRankStatusOrRejected = (appId, userId, rank, status, rejected) => (dispatch) => (
  axios.put(`/api/application/update/${appId}/user/${userId}`, { rank, status, rejected })
  .then(({ data }) => {
    dispatch(allApplications(data));
  })
  .catch(err => err)
);

// -------------------
// reducer
// -------------------
export const initialState = {
  applications: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_APPLICATIONS:
      return _.assign({}, state, { applications: action.applications });
    default:
      return state;
  }
};
