import React from "react";
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-logo with-gif"></div>
        <div className="footer-social"></div>
      </div>
      <div className="footer-middle">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/aritrichatterjee9/"
               target="_blank" // This attribute opens the link in a new tab
               rel="noopener noreferrer">About Us</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/aritrichatterjee9/"
               target="_blank" // This attribute opens the link in a new tab
               rel="noopener noreferrer">Contact</a>
            </li>
          </ul>
        </div>
        {/* Add more footer sections as needed */}
      </div>
      <a
        href="https://www.linkedin.com/in/aritrichatterjee9/" // Replace with the actual link URL
        className="glowing-link"
        target="_blank" // This attribute opens the link in a new tab
        rel="noopener noreferrer"
      >
        &copy; 2023 Designed by Aritri Chatterjee_TheNothingStudio. All rights reserved.
      </a>
    </footer>
  );
};

export default Footer;
