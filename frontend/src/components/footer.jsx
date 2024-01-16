// Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div id="footer" className="container text-center">
        <p>&copy; Guard Management System </p>
        <a className="text-link" href="/bantuan.pdf" download="bantuan.pdf">
          Bantuan
        </a>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "#007BA7",
  color: "#fff",
  padding: "10px",
  position: "fixed",
  bottom: "0",
  width: "100%",
};


export default Footer;
