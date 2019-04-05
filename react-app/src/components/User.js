import React from 'react';

const User = props => {
  return props.user ? (
    <div className="user">
      <h3>{props.user.username}</h3>
      <>
        {/* {props.user.departments.map(department => (
          <p className="department">{department}</p>
        ))} */}
      </>
    </div>
  ) : null;
};

export default User;
