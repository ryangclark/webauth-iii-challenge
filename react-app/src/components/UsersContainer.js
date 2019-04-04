import React, { useEffect, useState } from 'react';
import axios from 'axios';

import User from './User';

const UsersContainer = props => {
  const [serverError, setServerError] = useState({
    status: false,
    error: null
  });
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/users', {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(response => {
        if (response.status === 200) {
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
      .catch(error => {
        console.error(error);
        setServerError({
          status: true,
          error: error
        });
      });
  }, []);

  return (
    <div className="users-container">
      {serverError.status ? (
        <>
          <h2>Server Error!</h2>
          {/* <p>{serverError.error}</p> */}
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
