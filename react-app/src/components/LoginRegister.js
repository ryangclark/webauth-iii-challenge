import React, { useState } from 'react';

const LoginRegister = props => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  let { from } = props.location.state || { from: { pathname: '/' } };

  // props.login(CREDENTIALS).then(setRedirectToReferrer(true));

  if (redirectToReferrer) return <Redirect to={from} />;

  let loginFormElement;
  let loginUsernameInput;
  let loginPasswordInput;
  let registerFormElement;
  let registerUsernameInput;
  let registerPasswordInput;
  let registerDepartmentsInput;

  return (
    <div className="register-login">
      <div className="login">
        <form
          className="login-form"
          onSubmit={event => {
            event.preventDefault();
            props
              .login({
                username: loginUsernameInput.value,
                password: loginPasswordInput.value
              })
              .then(() => setRedirectToReferrer(true))
              .then(() => loginFormElement.reset());
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
        <form
          className="register-form"
          onSubmit={event => {
            event.preventDefault();
            props
              .register({
                username: registerUsernameInput.value,
                password: registerPasswordInput.value,
                departments: registerDepartmentsInput
                  .split(',')
                  .forEach(item => item.trim())
              })
              .then(() => setRedirectToReferrer(true))
              .then(() => registerFormElement.reset());
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
