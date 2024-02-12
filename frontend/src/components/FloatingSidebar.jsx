// FloatingSidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const FloatingSidebar = () => {
  return (
    <div className="sb">
      <Sidebar>
        <Menu>
          <MenuItem component={<Link to="/inout" />}> in-OUT</MenuItem>
          <MenuItem component={<Link to="/tamu" />}> tamu</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
          <MenuItem> Examples</MenuItem>
          <MenuItem> Examples</MenuItem>
          <MenuItem> Examples</MenuItem>
          <MenuItem> Examples</MenuItem>
          <MenuItem> Examples</MenuItem>
          <MenuItem> Examples</MenuItem>
          <MenuItem> Examples</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default FloatingSidebar;
