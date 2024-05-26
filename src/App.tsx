import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import HomePage from "./pages/HomePage";
import Topbar from "components/Topbar";
import Footer from "components/Footer";
import NFT from "pages/NFT";
import PersonalData from "pages/PersonalCenter/PersonalData";
import PersonalNFTs from "pages/PersonalCenter/PersonalNFTs";
import CreateCollection from "pages/CreateCollection";
import CreateNFT from "pages/CreateNFT";

import Inscription from "pages/Inscription";
import InscriptionDetail from "pages/Inscription/InscriptionDetail";
import ListForSale from "pages/Inscription/InscriptionDetail/ListForSale";
import Inscribing from "pages/Inscription/Inscribing";

import "react-loading-skeleton/dist/skeleton.css";
import { useUserData } from "hooks/useUserData";
import { useMarketData } from "hooks/useMarketData";

function GlobalHooks() {
  return null;
}

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <BrowserRouter>
      {mounted && <GlobalHooks />}
      <Topbar />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={`/nft/:chainId/:address/:tokenId`} element={<NFT />} />
        <Route path={"/personaldata"} element={<PersonalData />} />
        <Route path={"/personalnfts/:type"} element={<PersonalNFTs />} />
        <Route path={"/createcollection"} element={<CreateCollection />} />
        <Route path={"/createnft"} element={<CreateNFT />} />

        <Route path={"/inscription"} element={<Inscription />} />
        <Route path={"/inscriptionDetail"} element={<InscriptionDetail />} />
        <Route path={"/listForSale"} element={<ListForSale />} />
        <Route path={"createInscription"} element={<Inscribing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
