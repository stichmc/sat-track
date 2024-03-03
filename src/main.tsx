import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar.tsx";
import World from "./components/World.tsx";

// Pages
import Home from "./pages/Home.tsx";

// API Data
import MappingData from "./components/MappingData.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={`/home`} />} />
        <Route path="*" element={<Navigate to={`$/home`} />} />
        <Route path="/home" element={<Home></Home>}> </Route>
      </Routes>
      <World></World>
    </BrowserRouter>
  </React.StrictMode>
);
