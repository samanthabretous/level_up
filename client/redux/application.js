import axios from 'axios';
import store from './store';

// -------------------
// types
// -------------------
const GET_ALL_APPLICATIONS = 'get_all_applications';
const GET_ONE_APPLICATION = 'get_one_application';

// -------------------
// actions
// -------------------

export const allApplications = applications => ({
  type: GET_ALL_APPLICATIONS,
  applications,
});

export const oneApplication = application => ({
  type: GET_ONE_APPLICATION,
  application,
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

export const getApplicationByIdAsync = appId => (dispatch) => {
  axios.get(`/api/application/id/${appId}`)
  .then(({ data }) => {
    dispatch(oneApplication(data));
  })
  .catch(err => err);
};

export const getApplicationById = (nextState) => {
  if (nextState) {
    store.dispatch(getApplicationByIdAsync(nextState.params.appId));
  }
};

export const updateRankStatusOrRejected = (appId, userId, rank, status, rejected) => dispatch => (
  axios.put(`/api/application/update/${appId}/user/${userId}`, { rank, status, rejected })
  .then(({ data }) => {
    dispatch(allApplications(data));
  })
  .catch(err => err)
);

export const postInterview = interviewData => dispatch => (
  axios.post(`/api/application/id/${interviewData.appId}/interview`, interviewData)
  .then(({ data }) => {
    dispatch(oneApplication(data));
  })
  .catch(err => err)
);

export const addContact = contactData => (dispatch) => {
  console.log(contactData)
  axios.post('/api/contact', contactData)
  .then(({ data }) => {
    console.log(data)
    // dispatch(addContact(data));
  })
  .catch(err => err)
};

// -------------------
// reducer
// -------------------
export const initialState = {
  applications: null,
  application: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_APPLICATIONS:
      return _.assign({}, state, { applications: action.applications });
    case GET_ONE_APPLICATION:
      return _.assign({}, state, { application: action.application });
    default:
      return state;
  }
};
