import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar.tsx";

// Pages
import Home from "./pages/Home.tsx";
import Satellites from "./pages/Satellites.tsx";
// import { Satellite } from "lucide-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-black">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={`/home`} />} />
          <Route path="*" element={<Navigate to={`$/home`} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/satellites" element={<Satellites />} />
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);
