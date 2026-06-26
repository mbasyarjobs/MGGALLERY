/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Home from "./pages/Home";
import VehicleList from "./pages/VehicleList";
import VehicleDetail from "./pages/VehicleDetail";
import TestDrive from "./pages/TestDrive";

// Scroll To Top helper on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#FAFAFA]" id="global-application-layout">
        {/* Helper to reset window scroll position */}
        <ScrollToTop />

        {/* Global Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/test-drive" element={<TestDrive />} />
            
            {/* Fallback route back to Showroom Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Floating WhatsApp Action Widget */}
        <FloatingWhatsApp />

        {/* Room Footer Block */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
