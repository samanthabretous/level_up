import axios from 'axios';
import _ from 'lodash';

// -------------------
// types
// -------------------
const GET_DEMO = 'get_demo';

// -------------------
// actions
// -------------------

export const allDemo = demo => ({
  type: GET_DEMO,
  demo,
});

// thunk action
// getState can also be pass thru as an argument after dispatch
export const getDemoAsync = () => (dispatch) => {
  axios.get('/api/demo')
  .then(({ data }) => {
    dispatch(allDemo(data));
  })
  .catch(err => err);
};

// -------------------
// reducer
// -------------------
export const initialState = {
  demo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DEMO:
      return _.assign({}, state, { demo: action.demo });
    default:
      return state;
  }
};
