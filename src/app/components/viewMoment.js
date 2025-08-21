"use client";
import { X } from "lucide-react";
import React, { useRef, useEffect } from "react";

const ViewMoment = ({ isOpen, onClose, moment }) => {
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target)
      ) {
        if (event.target.classList.contains("bg-[#00000079]")) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !moment) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[#00000079] flex items-center justify-center z-[999] p-4">
      <div
        ref={modalContentRef}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col border-2 border-[#F6F6F6] relative shadow-lg"
      >
        <div className="w-full flex-shrink-0 h-[500px] md:h-[600px] bg-[#FDF6F8] relative overflow-hidden rounded-t-lg">
          <button
            onClick={onClose}
            className="bg-white absolute top-4 right-4 w-10 h-10 rounded-full border-2 border-[#D9ECE7] flex items-center justify-center cursor-pointer z-10 hover:bg-[#FDF6F8] transition-colors"
          >
            <X className="text-primary w-5 h-5" />
          </button>
          <img
            src={moment.src}
            className="w-full h-full object-contain"
            alt={moment.desc || "Moment Image"}
          />
        </div>

        <div className="w-full bg-white p-6 font-normal text-sm md:text-lg text-[#1b1b1b] flex-1 overflow-y-auto rounded-b-lg">
          <p className="text-primary font-normal text-xs md:text-sm leading-1 tracking-[3px] uppercase mb-2">
            Our Memory
          </p>
          <div className="text-[#1b1b1b] leading-relaxed">
            {moment.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMoment;
