import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import "../styles.css";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#0f4c5c",
      opacity: "1",
      borderBottom: "2px solid #0f4c5c",
    };
  } else {
    return { color: "#0f4c5c" };
  }
};

const Menu = ({ history }) => {
  return (
    <nav className="navbar navbar-expand-lg static-top shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h1>Variety Vector</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto w-100 justify-content-end">
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className="nav-link"
                  to="/admin/dashboard"
                >
                  A.DashBoard
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/user/dashboard"
                  style={currentTab(history, "/user/dashboard")}
                >
                  U.DashBoard
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signup"
                    style={currentTab(history, "/signup")}
                  >
                    SIGN UP
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signin"
                    style={currentTab(history, "/signin")}
                  >
                    SIGN IN
                  </Link>
                </li>
              </Fragment>
            )}

            <li className="nav-item">
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/cart"
              >
                Cart
              </Link>
            </li>
            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  style={{
                    cursor: "pointer",
                    color: "#011627",
                  }}
                  className="nav-link"
                  onClick={() => {
                    signout(() => {
                      //  calling the signout function from auth/helper and pushing the user to home page
                      history.push("/");
                    });
                  }}
                >
                  Sign out
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Menu);
