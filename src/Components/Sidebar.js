import React from "react";
import { Link } from "react-router-dom";
import Icon from "../Assets/icon-close-menu.svg";
import { useGlobalContext } from "../context";

export const Sidebar = () => {
  const { isSidebarOpen, openModal, closeSidebar } = useGlobalContext();
  return (
    <div
      className={`${
        isSidebarOpen ? ` modal-overlay` : `modal-overlay close-modal`
      }`}
    >
      <aside
        className={`${isSidebarOpen ? ` sidebar` : `sidebar close-sidebar`}`}
      >
        <button className="close-btn" onClick={closeSidebar}>
          <img src={Icon} alt="close menu icon" className="close-menu" />
        </button>
        <div className="sidebar-lists">
          <Link to="/" className="links" onClick={closeSidebar}>
            Home
          </Link>
          <Link to="/place" className="links" onClick={closeSidebar}>
            Place to stay
          </Link>
          <Link to="#" className="links">
            NFTs
          </Link>
          <Link to="#" className="links">
            Community
          </Link>
          <button
            className="btn connect sidebar-button"
            id="btn-connect"
            onClick={() => {
              closeSidebar();
              openModal();
            }}
          >
            Connect wallet
          </button>
        </div>
      </aside>
    </div>
  );
};
export default Sidebar;
