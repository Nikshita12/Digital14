import { createStore, applyMiddleware } from 'redux'; // applymw bcoz we're gonna use thunk
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'; // thunk is our middle ware
import rootReducer from './reducers'; 
// ./ because we.re calling it inside from from index.js from reducer folder

const initialState ={};

const middleware = [thunk];

const store = createStore(

    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))  
);
export default store;
// in order to use this file , we have to go to app.js, and refer //redux section there