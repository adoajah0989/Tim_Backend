import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import "../css/style.css";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

const NavBar = () => {
  const [name, setName] = useState("");
  const history = useHistory();
  const whiteText = { color: "white" };
  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar bg="007BA7" variant="" sticky="top" expand="lg" className="p-3">
      <Navbar.Brand as={NavLink} to="/dashboard">
        <img
          width="40"
          height="40"
          src="https://img.icons8.com/dusk/64/shield.png"
          alt="shield"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/dashboard" className="nav-link" style={whiteText}>
            Home
          </NavLink>
          <div className="text-white">
            <NavDropdown
              title={<span className="text-white">More</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>About</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/bantuan.pdf" download="bantuan.pdf">
                Bantuan
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Nav>
        <Button variant="danger" onClick={Logout}>
          Log Out
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
