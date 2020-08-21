import React, {Fragment} from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from "./components/auth/Dashboard";


//Redux
import { Provider } from 'react-redux';
import store from './store';


//frgament is just like a div element, it doesnt show up in the DOM 
// With provider we can use any components from anywhere
  const App = () =>
  <Provider store = {store}>
  <Router>
    <Fragment> 
      <Navbar />
      <Route exact path = "/" component = {Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path ="/register" component={ Register} />
          <Route exact path = "/login"  component={ Login} />
          <Route exact path='/dashboard' component={Dashboard} /> 
        </Switch>
      </section>
    </Fragment> 
    </Router>
    </Provider>

export default App;
