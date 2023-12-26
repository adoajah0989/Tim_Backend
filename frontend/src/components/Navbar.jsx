import React, { useState } from "react";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import "../css/style.css";

export const Navbar = () => {
  const [name, setName] = useState("");
  const history = useHistory();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const text ={
    color:"grey",
  };

  return (
    <nav
      id="navbar"
      className="navbar is-fixed-top has-shadow px-5"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <NavLink to="/dashboard" className="ml-5">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/dusk/64/shield.png"
            alt="shield"
          />
        </NavLink>

      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="field mt-2 font-monospace">
          <label className="label has-text-justified has-text-white is-size-4">
            Guard Management System
          </label>
        </div>
        

        <div className="navbar-end font-monospace has-text-weight-bold">
          <div className="navbar-item">
            <div className="navbar-start">
              <a href="/dashboard" className="navbar-item">
                Home
              </a>  
            </div>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link is-arrowless">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item" style={text}>About</a>

                <hr className="navbar-divider" />
                <a className="navbar-item" style={text}>User</a>
              </div>
            </div>
            <div className="buttons">
              <button onClick={Logout} className="button">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
