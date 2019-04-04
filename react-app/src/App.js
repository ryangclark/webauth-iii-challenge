import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import LoginRegister from './components/LoginRegister';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import UsersContainer from './components/UsersContainer';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { isAuthenticated: false, username: '' },
      serverError: { status: false, error: null }
    };
  }

  login = credentials => {
    axios
      .post('http://localhost:4000/api/encantado/login', credentials)
      .then(response => {
        if (response.status === 201) {
          this.setState(() => ({
            currentUser: {
              isAuthenticated: true,
              username: credentials.username
            },
            serverError: { status: false, error: null }
          }));
          localStorage.setItem('token', response.data.token);
          return;
        } else {
          console.error(response.status, response.statusText);
          this.setState(() => ({
            serverError: { status: true, error: response.statusText }
          }));
        }
      })
      .catch(error => {
        console.error(error);
        this.setState(() => ({ serverError: { status: true, error: error } }));
      });
  };

  logout = () => {
    this.setState(() => ({
      currentUser: {},
      isAuthenticated: false,
      serverError: { status: false, error: null }
    }));
    localStorage.removeItem('token');
    return;
  };

  register = credentials => {
    axios
      .post('http://localhost:4000/api/register', credentials)
      .then(response => {
        if (response.status === 201) {
          this.login({
            username: credentials.username,
            password: credentials.password
          });
        } else {
          console.error(response.status, response.statusText);
          this.setState(() => ({
            serverError: { status: true, error: response.statusText }
          }));
        }
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar
            isAuthenticated={this.currentUser.isAuthenticated}
            logout={this.logout}
          />
        </header>
        <Route
          exact
          path="/"
          render={() => (
            <LoginRegister login={this.login} register={this.register} />
          )}
        />
        <PrivateRoute path="/users" component={UsersContainer} />
      </div>
    );
  }
}

export default App;
