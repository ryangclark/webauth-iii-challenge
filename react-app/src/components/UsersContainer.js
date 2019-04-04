import { React, useEffect, useState } from 'react';
import axiosAuth from '../actions/axiosAuth';

import User from './User';

const UsersContainer = props => {
  const [serverError, setServerError] = useState({
    status: false,
    error: null
  });
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    axiosAuth
      .get('http://localhost:4000/api/users')
      .then(response => {
        if (response.status === 201) {
          setServerError({
            status: false,
            error: null
          });
          setUsersList(response.data);
        } else {
          setServerError({
            status: true,
            error: response.statusText
          });
        }
      })
      .catch(error =>
        setServerError({
          status: true,
          error: error
        })
      );
  }, []);

  return (
    <div className="users-container">
      {serverError.status ? (
        <>
          <h2>Server Error!</h2>
          <p>{serverError.error}</p>
        </>
      ) : (
        <div className="users-list">
          {usersList.length ? (
            usersList.map(user => <User key={user.id} user={user} />)
          ) : (
            <p>No Users!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersContainer;