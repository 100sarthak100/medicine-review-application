import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import decode from "jwt-decode";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const logout = () => {
    const action = {
      type: "LOGOUT",
    };
    dispatch(action);
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    // JWT
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [location, logout, user?.token]);

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            Medicine Review System
          </Link>
        </div>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>

          {user && user.result.isAdmin && (
            <>
              <li className="nav-link">
                <Link to="/admin/listProducts">Manage Products</Link>
              </li>
              <li className="nav-link">
                <Link to="/admin/listUsers">Manage Users</Link>
              </li>
            </>
          )}

          {user ? (
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                Welcome, {user.result.firstName}
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                Welcome, Guest
              </Link>
            </li>
          )}

          <li className="nav-item">
            {user ? (
              <Link className="nav-link" onClick={logout}>
                Logout
              </Link>
            ) : (
              <Link className="nav-link" to="/auth">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
