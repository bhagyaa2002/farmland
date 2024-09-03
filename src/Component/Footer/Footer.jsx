import React from "react";
import { Link } from "react-router-dom";
import insta from "../../assets/instagram.png";
import whatsapp from "../../assets/whatsapp.png";
import twitter from "../../assets/twitter.png";
import mail from "../../assets/mail.png";
import address from "../../assets/location.png";
import call from "../../assets/call.png";
import "./Footer.scss";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer-section">
        <div className="footer-icons">
          <img src={address} alt="Address" />
          <p className="footer-section-address">Address</p>
        </div>
        <p>FarmLand PVT LTD</p>
        <p>2-1/24, Hustle Hub</p>
        <p>3rd cross, 8th main</p>
        <p>Basavanagudi</p>
        <p>Bengaluru-560001</p>
      </div>

      <div className="footer-section">
        <p className="footer-section-links">Links</p>
        <p onClick={() => navigate("/")}>Home</p>
        <p onClick={() => navigate("/menu/659406f93b93bd0168a36af6")}>Menu</p>
        <p onClick={() => navigate("/about")}>About</p>
        <p onClick={() => navigate("/contact")}>Contact</p>
        <p onClick={() => navigate("/orders")}>Order</p>
      </div>

      <div className="footer-section">
        <p className="footer-section-support1">Support</p>
        <div className="footer-icons">
          <img src={mail} alt="Mail" />
          <p>FarmLand.com</p>
        </div>
        <div className="footer-icons">
          <img src={call} alt="Call" />
          <p>123-456-7890</p>
        </div>
      </div>

      <div className="footer-section">
        <p className="footer-section-connect">Connect With Us</p>
        <div className="footer-icons">
          <img src={insta} alt="Instagram" />
          <img src={whatsapp} alt="WhatsApp" />
          <img src={twitter} alt="Twitter" />
          <img src={mail} alt="Mail" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
