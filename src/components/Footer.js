import React from "react";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
    return (
      <div className="footer" style={footerStyle}>
        <img
          src="https://assets.jobsforher.com/uploads/v3/companies/employer/3117/geektrust-in-logo-1505202311.png"
          alt="logo"
          className="logo"
          style={logoStyle}
        />
        <ul className="footer-links" style={listStyle}>
          <li>Company</li>
          <li>About us</li>
          <li>Careers</li>
          <li>Hire from us</li>
          <li>Resources</li>
          <li>How it works</li>
          <li>Blog</li>
          <li>Coding help</li>
          <li>Support</li>
          <li>Give us feedback</li>
          <li>Privacy policy</li>
          <li>Terms & conditions</li>
        </ul>
        <div className="social-icons" style={socialIconsStyle}>
          <FacebookIcon style={iconStyle} />
          <InstagramIcon style={iconStyle} />
          <TwitterIcon style={iconStyle} />
          <LinkedInIcon style={iconStyle} />
        </div>
        <Divider />
      </div>
    );
  };
  
  const footerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px",
    background: "#333",
    color: "#fff",
    position: "absolute",
    bottom: "0",
    width: "100%",
    overflow: "hidden",
    
  };
  
  const logoStyle = {
    width: "100px", 
    padding: "0 0 0 20px"
  };
  
  const listStyle = {
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginRight: "auto",
  };
  
  const socialIconsStyle = {
    display: "flex",
    gap: "10px",
    padding: "0 30px 0 0"
  };
  
  const iconStyle = {
    color: "#fff",
  };
  
  export default Footer;
