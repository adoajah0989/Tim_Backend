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
  backgroundColor: '#68A3FC',
  color: '#fff',
  padding: '1rem',
  bottom: '0',
  width: '100%',
};

export default Footer;
