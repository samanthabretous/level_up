import axios from 'axios';
import _ from 'lodash';
import store from './store';

// -------------------
// types
// -------------------
const GET_ALL_COMPANIES = 'get_all_companies';
const SELECT_COMPANY = 'select_company';
const NEW_COMPANY = 'new_company';

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

const addCompanyToCompanies = newestCompany => ({
  type: NEW_COMPANY,
  newestCompanyId: JSON.parse(newestCompany.id),
  newestCompany,
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

export const addCompany = name => (dispatch) => {
  axios.post('/api/company', { name })
  .then(({ data }) => {
    dispatch(addCompanyToCompanies(data));
  });
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
    case NEW_COMPANY:
      return _.assign({}, state, {
        pickedCompanyId: action.newestCompanyId,
        companies: [...state.companies, action.newestCompany],
      });
    default:
      return state;
  }
};
