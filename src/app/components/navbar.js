"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "./assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu open and closed
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#fff] text-white py-5 placeholder-zinc-400  sticky top-0 z-50 ">
      <div className="mx-auto flex items-center justify-between w-full px-4 md:px-12 lg:px-40">
        <div className=" flex items-center">
          <img src={logo.src} className=" w-12 h-12" alt="" />
          <div className="text-[32px] leading-[45px] font-normal font-alexBrush text-primary ml-3">
            Hikmat & Noah
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-[#1B1B1B] font-didact text-base leading-[28px]">
          <a href="#" className="hover:text-primary transition-colors">
            Couple
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Events
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            When & Where
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Gallery
          </a>
        </div>

        {/* Mobile menu button */}
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

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-primary ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-4 py-4 px-2 text-[#1B1B1B] font-didact text-base leading-[28px]">
          <a href="#" className="block hover:text-primary transition-colors">
            Couple
          </a>
          <a href="#" className="block hover:text-primary transition-colors">
            Events
          </a>
          <a href="#" className="block hover:text-primary transition-colors">
            When & Where
          </a>
          <a href="#" className="block hover:text-primary transition-colors">
            Gallery
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
