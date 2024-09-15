import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.orangelogo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            inventore necessitatibus recusandae eos est. Natus dolor suscipit,
            velit architecto dolore odit, a aut, perspiciatis doloremque non
            nesciunt commodi quod consequuntur!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delevery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-234-567-890</li>
            <li>contact@orange.in</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footrer-copy-right">
        Copyright 2024 &copy; orage.com -All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
