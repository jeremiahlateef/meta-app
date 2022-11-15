import React from "react";
import Close from "../Assets/close-wallet.svg";
import Arrow from "../Assets/arrow.svg";
import Fox from "../Assets/metamaskfox.svg";
import Wallet from "../Assets/walletconnect.svg";
import { useGlobalContext } from "../context";

export const Modal = () => {
  const { isModalOpen, closeModal } = useGlobalContext();
  return (
    <div className={`${isModalOpen ? "overlay show-modal" : "overlay"}`}>
      <div className="modal ">
        <div className="modal-cont">
          <div className="mode">
            <h3 className="modal-title">Connect Wallet</h3>
            <button className="modal-btn" onClick={closeModal}>
              <img src={Close} alt="" className="wall close-btn" />
            </button>
          </div>
          <div className="wallet-options">
            <h6 className="wallet-title">Choose your preferred wallet:</h6>
            <div className="wallet-coins grey-wall">
              <div className="wall-cont">
                <img
                  src={Fox}
                  alt="metamask fox icon"
                  className="wallet-icons"
                />

                <h6>Metamask</h6>
              </div>
              <img src={Arrow} alt="" className="arrow-icon" />
            </div>
            <div className="wallet-coins ">
              <div className="wall-cont">
                <img
                  src={Wallet}
                  alt="WalletConnect icon"
                  className="wallet-icons"
                />
                <h6>Metamask</h6>
              </div>
              <img src={Arrow} alt="" className="arrow-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
