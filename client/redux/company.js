import axios from 'axios';
import store from './store';
import _ from 'lodash';

// -------------------
// types
// -------------------
const GET_ALL_COMPANIES = 'get_all_companies';
const SELECT_COMPANY = 'select_company';

// -------------------
// actions
// -------------------

export const allCompanies = companies => ({
  type: GET_ALL_COMPANIES,
  companies,
});
export const selectCompany = pickedCompanyId => ({
  type: SELECT_COMPANY,
  pickedCompanyId,
});
// thunk action
// getState can also be pass thru as an argument after dispatch
export const getCompaniesAsync = () => (dispatch) => {
  axios.get('/api/company')
  .then(({ data }) => {
    dispatch(allCompanies(data));
  })
  .catch(err => err);
};
export const getCompanies = () => {
  store.dispatch(getCompaniesAsync());
};
// -------------------
// reducer
// -------------------
export const initialState = {
  companies: null,
  pickedCompanyId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMPANIES:
      return _.assign({}, state, { companies: action.companies });
    case SELECT_COMPANY:
      return _.assign({}, state, { pickedCompanyId: action.pickedCompanyId });
    default:
      return state;
  }
};
