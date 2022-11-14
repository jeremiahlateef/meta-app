import React from "react";
import FootLogo from "../Assets/metabnbwhitelogo.svg";
import Facebook from "../Assets/facebook.svg";
import Instagram from "../Assets/instagram.svg";
import Twitter from "../Assets/twitter.svg";

export const Footer = () => {
  return (
    <footer className="foot">
      <div className="section-center">
        <div className="footer-center">
          <div className="logos-cont desktop">
            <div className="logo-contain">
              <img src={FootLogo} alt="logo of metabnb" className="foot-logo" />
            </div>
            <div className="social-icons">
              <img src={Facebook} alt="facebook icon" className="social" />
              <img src={Instagram} alt="instagram icon" className="social" />
              <img src={Twitter} alt="twitter" className="social" />
            </div>
          </div>
          <div className="footer-links">
            <h5 className="foot-small-title">Community</h5>
            <h6 className="small-links">NFT</h6>
            <h6 className="small-links">Tokens</h6>
            <h6 className="small-links">Landlords</h6>
            <h6 className="small-links">Discord</h6>
          </div>
          <div className="footer-links">
            <h5 className="foot-small-title">Places</h5>
            <h6 className="small-links">Castle</h6>
            <h6 className="small-links">Farms</h6>
            <h6 className="small-links">Beach</h6>
            <h6 className="small-links">Learn more</h6>
          </div>
          <div className="footer-links">
            <h5 className="foot-small-title">About us</h5>
            <h6 className="small-links">Road map</h6>
            <h6 className="small-links">Creators</h6>
            <h6 className="small-links">Career</h6>
            <h6 className="small-links">Contact us</h6>
          </div>
        </div>
        <div className="logos-cont mobile">
          <div className="logo-contain">
            <img src={FootLogo} alt="logo of metabnb" className="foot-logo" />
          </div>
          <div className="social-icons">
            <img src={Facebook} alt="facebook icon" className="social" />
            <img src={Instagram} alt="instagram icon" className="social" />
            <img src={Twitter} alt="twitter" className="social" />
          </div>
        </div>
        <div className="copyright">
          <p className="copy"> &copy; 2022 Metabnb</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
