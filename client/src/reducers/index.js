// this is our root reducer file
import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

export default combineReducers({
alert,
auth
}); 