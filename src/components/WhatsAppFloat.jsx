import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/94713311593"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]
      w-12 h-12 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full
      flex items-center justify-center shadow-2xl transition-transform
      hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-2xl md:text-3xl" />
    </a>
  );
}
