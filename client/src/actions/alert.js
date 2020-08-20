import { SET_ALERT } from './types';
import {v4 as uuidv4} from 'uuid';
// or import {v4 as uuid} from 'uuid';


// setAlert is going to dispatch an alert of type set_alert to the reducer and that will add the alert to ythe state

export const setAlert = (msg, alertType) => dispatch => {

    const id = uuidv4();
    // or const id = uuid.v4;
   
    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType, id }
    });

    //setTimeout(()=> dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}