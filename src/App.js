import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Places from "./Pages/Places";
import Listing from "./Pages/Listing";
import Nfts from "./Pages/Nfts";
import Community from "./Pages/Community";
import Accessibility from "./Pages/Accessibility";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/place" element={<Places />} />
          <Route path="/place/:id" element={<Listing />} />
          <Route path="/nfts" element={<Nfts />} />
          <Route path="/community" element={<Community />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
