import "./index.css";
import "animate.css";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import Menu from "./components/Menu";
import DashboardPage from "./components/Dashboard/DashboardPage";
import FileUploadPage from "./components/FileUpload/FileUploadPage";
import PeerPage from "./components/PeerPage/PeerPage";
import SettingPage from "./components/Setting/SettingPage";
import MarketPage from "./components/Market/MarketPage";
import HelpPage from "./components/HelpPage/HelpPage";
import WalletPage from "./components/Wallet/WalletPage";

function LocationProvider({ children }: { children: React.ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<FileUploadPage />} />
      <Route path="/peer" element={<PeerPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/Wallet" element={<WalletPage />} />
      <Route path="/setting" element={<SettingPage />} />
      <Route path="/market" element={<MarketPage />} />
      <Route path="/help" element={<HelpPage />} />
    </Routes>
  );
}

function App() {
  
  const [path, setPath]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState(window.location.pathname);

  let layout: string = "grid grid-cols-2",
    style: React.CSSProperties = {
      gridTemplateColumns: "185px 1fr",
    };

  if (path === "/peer") {
    layout = "flex flex-col";
    style = {};
  }

  return (
    <div className={`${layout} font-sans h-full w-full m-0 p-0`} style={style}>
      <BrowserRouter>
        <Menu active={path} setActive={(path: string) => setPath(path)} />
        <LocationProvider>
          <AnimatedRoutes />
        </LocationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
