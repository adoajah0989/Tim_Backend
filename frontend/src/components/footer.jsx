// Footer.js

import React from 'react';
import "../css/style.css";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div id="footer" className="container text-center">
        <p>&copy; Guard Management System</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#007BA7',
  color: '#fff',
  padding: '10px',
  position : 'fixed',
  bottom: '0',
  width: '100%',
};

export default Footer;
