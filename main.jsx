import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contato from "./pages/contato.jsx";
import Fhemig from "./pages/fhemig.jsx";
import Jabber from "./pages/jabber.jsx";
import Outlook from "./pages/outlook.jsx";
import Siga_me from "./pages/siga_me.jsx";
import VPN from "./pages/vpn.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/fhemig" element={<Fhemig />} />
      <Route path="/jabber" element={<Jabber />} />
      <Route path="/outlook" element={<Outlook />} />
      <Route path="/siga_me" element={<Siga_me />} />
      <Route path="/vpn" element={<VPN />} />
    </Routes>
  </BrowserRouter>
);
