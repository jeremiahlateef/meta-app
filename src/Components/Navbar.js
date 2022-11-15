import React from "react";
import { Link } from "react-router-dom";
import NavLogo from "../Assets/metabnb.svg";
import MenuButton from "../Assets/icon-menu.svg";
import { useGlobalContext } from "../context";

export const Navbar = () => {
  const { openModal, openSidebar } = useGlobalContext();
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
            <button className="navbutton" onClick={openSidebar}>
              <img src={MenuButton} className="menu" alt="menu button" />
            </button>
            <button
              className="btn connect"
              id="btn-connect"
              onClick={openModal}
            >
              Connect wallet
            </button>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
