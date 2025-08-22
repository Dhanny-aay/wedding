"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "./assets/logo.webp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#fff] text-white py-5 sticky top-0 z-50 relative">
      <div className="mx-auto flex items-center justify-between w-full px-4 md:px-12 lg:px-40">
        <div className="flex items-center">
          <img src={logo.src} className="w-12 h-12" alt="" />
          <div className="text-[32px] leading-[45px] font-normal font-alexBrush text-primary ml-3">
            Hikmat & Noah
          </div>
        </div>

        <div className="hidden md:flex space-x-6 text-[#1B1B1B] font-didact text-base leading-[28px]">
          <button
            onClick={() => handleNavClick("couple")}
            className="hover:text-primary transition-colors"
          >
            Couple
          </button>
          <button
            onClick={() => handleNavClick("events")}
            className="hover:text-primary transition-colors"
          >
            Events
          </button>
          <button
            onClick={() => handleNavClick("when-where")}
            className="hover:text-primary transition-colors"
          >
            When & Where
          </button>
          <button
            onClick={() => handleNavClick("gallery")}
            className="hover:text-primary transition-colors"
          >
            Gallery
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <X size={24} className="text-[#1B1B1B]" />
            ) : (
              <Menu size={24} className="text-[#1B1B1B]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu - Absolute positioned */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out transform z-40 ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        }`}
      >
        <div className="flex flex-col space-y-4 py-4 px-6 text-[#1B1B1B] font-didact text-base leading-[28px]">
          <button
            onClick={() => handleNavClick("couple")}
            className="block text-left hover:text-primary transition-colors"
          >
            Couple
          </button>
          <button
            onClick={() => handleNavClick("events")}
            className="block text-left hover:text-primary transition-colors"
          >
            Events
          </button>
          <button
            onClick={() => handleNavClick("when-where")}
            className="block text-left hover:text-primary transition-colors"
          >
            When & Where
          </button>
          <button
            onClick={() => handleNavClick("gallery")}
            className="block text-left hover:text-primary transition-colors"
          >
            Gallery
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
