import axios from 'axios';
import store from './store';
import _ from 'lodash';

// -------------------
// types
// -------------------
const GET_ALL_SOURCES = 'get_all_sources';
const SELECT_SOURCE = 'select_source';

// -------------------
// actions
// -------------------

export const allSources = sources => ({
  type: GET_ALL_SOURCES,
  sources,
});

export const selectSource = pickedSourceId => ({
  type: SELECT_SOURCE,
  pickedSourceId,
});
// thunk action
// getState can also be pass thru as an argument after dispatch
export const getSourcesAsync = () => (dispatch) => {
  axios.get('/api/source')
  .then(({ data }) => {
    dispatch(allSources(data));
  })
  .catch(err => err);
};
export const getSources = () => {
  store.dispatch(getSourcesAsync());
};
// -------------------
// reducer
// -------------------
export const initialState = {
  sources: null,
  pickedSourceId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SOURCES:
      return _.assign({}, state, { sources: action.sources });
    case SELECT_SOURCE:
      return _.assign({}, state, { pickedSourceId: action.pickedSourceId });
    default:
      return state;
  }
};
