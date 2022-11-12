import React from "react";
import { Link } from "react-router-dom";
import NavLogo from "../Assets/metabnb.svg";
import MenuButton from "../Assets/icon-menu.svg";

export const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="nav-center">
          <div className="navlogo">
            <img src={NavLogo} alt="logo of Metabnb" className="nav-icon" />
          </div>
          <div className="navlinks">
            <Link to="/" className="links">
              Home
            </Link>
            <Link to="/place" className="links">
              Place to stay
            </Link>
            <Link to="#" className="links">
              NFTs
            </Link>
            <Link to="#" className="links">
              Community
            </Link>
          </div>
          <div className="nav-buttons">
            <div className="navbutton">
              <img src={MenuButton} className="menu" alt="menu button" />
            </div>
            <button className="btn connect" id="btn-connect">
              Connect wallet
            </button>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
