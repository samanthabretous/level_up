import { combineReducers } from 'redux';
import application from './application';
import company from './company';
import demo from './demo';
import position from './position';
import source from './source';

export default combineReducers({
  application,
  company,
  demo,
  position,
  source,
});
