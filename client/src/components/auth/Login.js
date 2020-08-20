import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

//import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
//import {login} from '../../actions/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  //destructuring it
  const { name, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "admin" && password === "admin1") {
      console.log("admin logged in");
    } else {
      console.log("only admin can log in to this page");
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>

        <div className='buttons'>
          <Link to='/afterlogin' className='btn btn-primary'>
            Login
          </Link>
        </div>
      </form>
      <p className='my-1'>
        Dont have an account? <Link to='/register'>Register</Link>
      </p>
    </Fragment>
  );
};
export default Login;

//Login.propTypes = {
//login: PropTypes.func.isRequired,
//}
//export default connect(null, {login})(Login);
