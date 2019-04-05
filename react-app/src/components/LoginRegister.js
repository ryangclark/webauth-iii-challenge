import React, { useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import './LoginRegister.css';

const LoginRegister = props => {
  let loginFormElement;
  let loginUsernameInput;
  let loginPasswordInput;
  let registerFormElement;
  let registerUsernameInput;
  let registerPasswordInput;
  let registerDepartmentsInput;

  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  // let { from } = props.location.state || { from: { pathname: '/' } };

  // props.login(CREDENTIALS).then(setRedirectToReferrer(true));

  // useEffect(() => {
  //   if (redirectToReferrer) return <Redirect to={from} />;
  // }, [redirectToReferrer]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.history.push('/users');
    }
  }, []);

  useEffect(() => {
    if (props.currentUser && props.currentUser.username) {
      loginFormElement.reset();
      // console.log('username', props.currentUser.username);
      props.history.push('/users');
    }
  }, [props.currentUser]);

  return (
    <div className="register-login">
      <div className="login">
        <h2>Login</h2>
        <form
          className="login-form"
          onSubmit={event => {
            event.preventDefault();
            props.login({
              username: loginUsernameInput.value,
              password: loginPasswordInput.value
            });
          }}
          ref={node => (loginFormElement = node)}
        >
          <label>
            Username:
            <br />
            <input
              name="username"
              ref={node => (loginUsernameInput = node)}
              required
              type="text"
            />
            <br />
          </label>
          <label>
            Password:
            <br />
            <input
              name="password"
              ref={node => (loginPasswordInput = node)}
              required
              type="password"
            />
            <br />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="register">
        <h2>Register</h2>
        <form
          className="register-form"
          onSubmit={event => {
            event.preventDefault();
            props
              .register({
                username: registerUsernameInput.value,
                password: registerPasswordInput.value,
                departments: registerDepartmentsInput.value
                  .split(',')
                  .forEach(item => item.trim())
              })
          }}
          ref={node => (registerFormElement = node)}
        >
          <label>
            Username:
            <br />
            <input
              name="username"
              ref={node => (registerUsernameInput = node)}
              required
              type="text"
            />
            <br />
          </label>
          <label>
            Password:
            <br />
            <input
              name="password"
              ref={node => (registerPasswordInput = node)}
              required
              type="password"
            />
            <br />
          </label>
          <label>
            Departments:
            <br />
            <span className="label-caption">
              (Separate multiple departments by commas)
            </span>
            <br />
            <input
              name="departments"
              ref={node => (registerDepartmentsInput = node)}
              required
              type="text"
            />
            <br />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
