import React from "react";
import Dialog from "./Dialog";
import { useGlobalContext, shortAddress } from "../context";
import { CloseIcon, ArrowIcon } from "./Icons";
import Fox from "../Assets/metamaskfox.svg";
import WalletConnect from "../Assets/walletconnect.svg";

const WALLETS = [
  { name: "MetaMask", icon: Fox },
  { name: "WalletConnect", icon: WalletConnect },
];

/* Demo only. No wallet is contacted. The status message lives INSIDE the
   dialog, because everything outside a modal dialog is inert and screen
   readers may ignore live regions there. */
export default function WalletDialog() {
  const { walletOpen, closeWallet, wallet, connectWallet, disconnectWallet } = useGlobalContext();
  const connecting = wallet.status === "connecting";
  const connected = wallet.status === "connected";

  let status = "";
  if (connecting) status = `Connecting to ${wallet.name}…`;
  if (connected) status = `Connected to ${wallet.name} as ${shortAddress(wallet.address)}.`;

  return (
    <Dialog open={walletOpen} onClose={closeWallet} labelledBy="wallet-title" className="wallet">
      <div className="drawer-head">
        <h2 id="wallet-title">{connected ? "Your wallet" : "Connect wallet"}</h2>
        <button type="button" className="icon-btn" onClick={closeWallet} aria-label="Close wallet window">
          <CloseIcon className="icon" />
        </button>
      </div>
      <p className="notice">
        <strong>Demo only.</strong> No real wallet is contacted and no tokens move.
      </p>
      <p className="status" role="status">
        {status}
      </p>
      {connected ? (
        <div className="wallet-connected">
          <p>
            Address: <code>{wallet.address}</code>
          </p>
          <div className="btn-row">
            <button type="button" className="btn" onClick={closeWallet}>
              Done
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                disconnectWallet();
                closeWallet();
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <>
          <p id="wallet-choose">Choose your preferred wallet:</p>
          <ul className="wallet-list" aria-labelledby="wallet-choose">
            {WALLETS.map((w) => (
              <li key={w.name}>
                <button
                  type="button"
                  className="wallet-option"
                  disabled={connecting}
                  onClick={() => connectWallet(w.name)}
                >
                  <img src={w.icon} alt="" width="32" height="32" />
                  <span>{w.name}</span>
                  <ArrowIcon className="icon arrow" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </Dialog>
  );
}
