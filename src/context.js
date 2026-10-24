import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useStoredState } from "./hooks";

const AppContext = React.createContext(null);

const DEMO_ADDRESS = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
export const shortAddress = (a) => `${a.slice(0, 6)}…${a.slice(-4)}`;

export const AppProvider = ({ children }) => {
  /* ---- live announcements (WCAG 4.1.3) ---- */
  const [message, setMessage] = useState("");
  const timer = useRef(null);
  const announce = useCallback((text) => {
    window.clearTimeout(timer.current);
    setMessage("");
    // A short gap makes screen readers read the same text twice if asked to.
    timer.current = window.setTimeout(() => setMessage(text), 60);
  }, []);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  /* ---- saved places ---- */
  const [favorites, setFavorites] = useStoredState("metabnb.favorites.v1", []);
  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);
  const toggleFavorite = useCallback(
    (id, name) => {
      const saved = favorites.includes(id);
      setFavorites(saved ? favorites.filter((f) => f !== id) : [...favorites, id]);
      announce(saved ? `${name} removed from your saved places.` : `${name} saved to your places.`);
    },
    [favorites, setFavorites, announce]
  );

  /* ---- demo wallet: nothing real is contacted ---- */
  const [wallet, setWallet] = useState({ status: "idle", name: "", address: "" });
  const connectTimer = useRef(null);
  const connectWallet = useCallback((name) => {
    setWallet({ status: "connecting", name, address: "" });
    window.clearTimeout(connectTimer.current);
    connectTimer.current = window.setTimeout(() => {
      setWallet({ status: "connected", name, address: DEMO_ADDRESS });
    }, 700);
  }, []);
  const disconnectWallet = useCallback(() => {
    setWallet({ status: "idle", name: "", address: "" });
    announce("Wallet disconnected.");
  }, [announce]);
  useEffect(() => () => window.clearTimeout(connectTimer.current), []);

  /* ---- dialogs ---- */
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openWallet = useCallback(() => setWalletOpen(true), []);
  const closeWallet = useCallback(() => setWalletOpen(false), []);

  const value = useMemo(
    () => ({
      message, announce,
      favorites, isFavorite, toggleFavorite,
      wallet, connectWallet, disconnectWallet,
      menuOpen, openMenu, closeMenu,
      walletOpen, openWallet, closeWallet,
    }),
    [message, announce, favorites, isFavorite, toggleFavorite, wallet, connectWallet, disconnectWallet, menuOpen, openMenu, closeMenu, walletOpen, openWallet, closeWallet]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => useContext(AppContext);
export { AppContext };
