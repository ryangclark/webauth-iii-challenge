import './NavBar.css';
import { React } from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
  return (
    <nav>
      <h2>React App Thing</h2>
      <div className="nav-links">
        {props.userAuthenticated ? (
          <>
            <p className="greeting">Hello, {props.currentUser.username}!</p>
            <Link to={"/users"}>Users List</Link>
            <a onClick={props.logout()}>Log Out</a>
          </>
        ) : (
          <>
            <a>Register</a>
            <a>Log In</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
