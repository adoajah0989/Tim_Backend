// Footer.js

import React from "react";

const Footer = () => {
  return (
    <div className="d-grid">
    <footer style={footerStyle}>
      <div id="footer" className="container text-center">
        <p>&copy; Guard Management System </p>
        <a className="text-link" href="/bantuan.pdf" download="bantuan.pdf">
          Bantuan
        </a>
      </div>
    </footer>
    </div>
  );
};

const footerStyle = {
  backgroundColor: "#007BA7",
  color: "#fff",
  padding: "3px",
  position: "fixed",
  bottom: "0",
  width: "100%",
};


export default Footer;
