import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
      id="main-navigation-bar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - Designed strictly like the Professional Polish theme */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group text-slate-900"
            id="brand-logo-link"
          >
            <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center group-hover:bg-red-700 transition-colors shrink-0">
              <div className="w-4 h-4 border-2 border-white rotate-45"></div>
            </div>
            <span className="font-display font-black text-xl tracking-tight uppercase flex items-center">
              MG <span className="text-red-600">EV</span> GALLERY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-sans font-semibold text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-all duration-200 tracking-wide py-2 ${
                  isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-slate-500 hover:text-slate-900"
                }`
              }
              id="nav-link-home"
            >
              Showroom
            </NavLink>
            <NavLink
              to="/vehicles"
              className={({ isActive }) =>
                `transition-all duration-200 tracking-wide py-2 ${
                  isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-slate-500 hover:text-slate-900"
                }`
              }
              id="nav-link-vehicles"
            >
              Explore Vehicles
            </NavLink>
            <NavLink
              to="/test-drive"
              className={({ isActive }) =>
                `transition-all duration-200 tracking-wide py-2 ${
                  isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-slate-500 hover:text-slate-900"
                }`
              }
              id="nav-link-testdrive"
            >
              Book Test Drive
            </NavLink>
          </div>

          {/* Nav Right CTA Button */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://wa.me/628131422804"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold text-slate-500 hover:text-red-600 transition-colors"
            >
              HOTLINE: +62 813-1422-804
            </a>
            <Link
              to="/test-drive"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold text-xs tracking-wider transition-all uppercase flex items-center gap-1.5 group cursor-pointer shadow-lg shadow-red-100"
              id="nav-cta-testdrive"
            >
              BOOK TEST DRIVE
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-900 p-2 focus:outline-none"
              aria-label="Toggle Menu"
              id="btn-mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2]" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden"
            id="mobile-navigation-panel"
          >
            <div className="px-4 pt-3 pb-6 flex flex-col gap-4 font-sans font-semibold text-base">
              <Link
                to="/"
                className="py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-900 transition-colors"
              >
                Home Showroom
              </Link>
              <Link
                to="/vehicles"
                className="py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-900 transition-colors"
              >
                Explore Vehicles
              </Link>
              <Link
                to="/test-drive"
                className="py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-900 transition-colors"
              >
                Book Test Drive
              </Link>

              <hr className="border-slate-100 my-1" />

              <div className="px-3 flex flex-col gap-3">
                <p className="text-xs font-mono text-slate-400">HOTLINE CALL CENTER</p>
                <a
                  href="https://wa.me/628131422804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-emerald-600 font-bold"
                >
                  +62 813-1422-804 (WhatsApp 24h)
                </a>
                
                <Link
                  to="/test-drive"
                  className="bg-red-600 hover:bg-red-700 text-white w-full py-3.5 rounded-full font-bold text-xs tracking-wider uppercase text-center transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-red-100"
                >
                  BOOK TEST DRIVE
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
