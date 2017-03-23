import axios from 'axios';
import store from './store';
import _ from 'lodash';

// -------------------
// types
// -------------------
const GET_ALL_POSITIONS = 'get_all_positions';
const SELECT_POSITION = 'select_positon';

// -------------------
// actions
// -------------------

export const allPositions = positions => ({
  type: GET_ALL_POSITIONS,
  positions,
});

export const selectPosition = pickedPositionId => ({
  type: SELECT_POSITION,
  pickedPositionId,
});
// thunk action
// getState can also be pass thru as an argument after dispatch
export const getPositionsAsync = () => (dispatch) => {
  axios.get('/api/position')
  .then(({ data }) => {
    dispatch(allPositions(data));
  })
  .catch(err => err);
};
export const getPositions = () => {
  store.dispatch(getPositionsAsync());
};
// -------------------
// reducer
// -------------------
export const initialState = {
  positions: null,
  pickedPositionId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSITIONS:
      return _.assign({}, state, { positions: action.positions });
    case SELECT_POSITION:
      return _.assign({}, state, { pickedPositionId: action.pickedPositionId });
    default:
      return state;
  }
};
