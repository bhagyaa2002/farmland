import React from "react";
import { useNavigate } from "react-router-dom";
import call from "../../assets/call.png";
import insta from "../../assets/instagram.png";
import address from "../../assets/location.png";
import mail from "../../assets/mail.png";
import twitter from "../../assets/twitter.png";
import whatsapp from "../../assets/whatsapp.png";
import "./Footer.scss";

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer-section">
        <div className="footer-icons">
          <img className="footerImage" src={address} alt="Address" />
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
        <p className="footerClick" onClick={() => navigate("/cropinfo")}>Home</p>
        <p className="footerClick" onClick={() => navigate("/cropmarket")}>Crop Market</p>
        <p className="footerClick" onClick={() => navigate("/fertilizermarket")}>Fertilizer Market</p>
        <p className="footerClick" onClick={() => navigate("/scheme")}>Schemes</p>
        <p className="footerClick" onClick={() => navigate("/news")}>Article</p>
        <p className="footerClick" onClick={() => navigate("/orders")}>Order</p>
      </div>

      <div className="footer-section">
        <p className="footer-section-support1">Support</p>
        <div className="footer-icons">
          <img className="footerImage" src={mail} alt="Mail" />
          <p>FarmLand.com</p>
        </div>
        <div className="footer-icons">
          <img className="footerImage" src={call} alt="Call" />
          <p>123-456-7890</p>
        </div>
      </div>

      <div className="footer-section">
        <p className="footer-section-connect">Connect With Us</p>
        <div className="footer-icons">
        <a href="https://www.instagram.com/farm_land_agri/" target="_blank" rel="noopener noreferrer">
      <img className="footerImage" src={insta} alt="Instagram" />
    </a>
    <a href="https://wa.me/8281045212?text=Hello,%20I%20have%20a%20query%20regarding%20your%20services" target="_blank" rel="noopener noreferrer">
  <img className="footerImage" src={whatsapp} alt="WhatsApp" />
</a>

    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
      <img className="footerImage" src={twitter} alt="Twitter" />
    </a>
    <a href="mailto:bhagyaammenadka@gmail.com" target="_blank" rel="noopener noreferrer">
      <img className="footerImage" src={mail} alt="Mail" />
    </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
