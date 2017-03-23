import { combineReducers } from 'redux';
import application from './application';
import company from './company';
import demo from './demo';

export default combineReducers({
  application,
  company,
  demo,
});
