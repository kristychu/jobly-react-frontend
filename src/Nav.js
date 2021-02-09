import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import CurrentUserContext from './CurrentUserContext';
import './Nav.css'

function Nav({logout}) {
  const currUser = useContext(CurrentUserContext);
  if(currUser){
    //got function below from https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library#:~:text=you%20can%20use%20pure%20javascript,')%5B1%5D)%3B
    const decoded = JSON.parse(atob(currUser.split('.')[1]));
    const username = decoded.username
    return (
      <nav className="NavBar">
      <NavLink exact to="/companies">
        Companies
      </NavLink>
      <NavLink exact to="/jobs">
        Jobs
      </NavLink>
      <NavLink exact to="/profile">
        Profile
      </NavLink>
      <NavLink exact to="/logout" onClick={logout}>
        Logout {username}
      </NavLink>
    </nav>
    )
  }
  return (
    <nav className="NavBar">
      <NavLink exact to="/login">
        Login
      </NavLink>
      <NavLink exact to="/signup">
        Signup
      </NavLink>
    </nav>
  );
}

export default Nav;
