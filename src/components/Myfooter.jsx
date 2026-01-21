import React from "react";
import logo from "../assets/logo.jpg";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

export default function MyFooter() {
  return (
    <footer className="w-full bg-[#050b23] text-gray-300">
      <div className="relative mx-auto max-w-7xl xl:max-w-screen-2xl px-8 sm:px-10 lg:px-14 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Left */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo" className="h-10 w-10 rounded-md object-cover" />
              <h2 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-[#00B8FF] via-[#007BFF] to-[#00FFD5] bg-clip-text text-transparent">
                NEXTOEX
              </h2>
            </div>
            <p className="max-w-md leading-7 text-gray-400">
              We deliver AI-powered software, cloud solutions, and modern web experiences to help businesses grow faster and smarter.
            </p>
            <div className="flex items-center gap-5 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition text-lg" aria-label="Facebook">
                <BsFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-lg" aria-label="Instagram">
                <BsInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-lg" aria-label="Twitter">
                <BsTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:pl-6 lg:pl-10">
            <h3 className="mb-6 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition">About</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">Services</a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition">Work</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-5 text-gray-400">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="mt-1 text-xl text-[#00B8FF]" />
                <span>Malabe, Sri Lanka</span>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlineMail className="mt-1 text-xl text-[#00B8FF]" />
                <a href="mailto:work.nextoex@gmail.com" className="hover:text-white transition">
                  work.nextoex@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlinePhone className="mt-1 text-xl text-[#00B8FF]" />
                <a href="tel:+94713311593" className="hover:text-white transition">
                  +94 71 331 1593
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="max-w-md leading-7 text-gray-400">
              Subscribe to our newsletter to stay updated with the latest IT trends and offerings.
            </p>
            <div className="flex items-center gap-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3
                text-gray-200 placeholder:text-gray-500 outline-none"
              />
              <button
                className="h-[48px] w-[60px] rounded-xl flex items-center justify-center
               bg-gradient-to-r from-[#00B8FF] via-[#007BFF] to-[#00FFD5]
               shadow-[0_0_25px_rgba(0,184,255,0.25)]
               hover:shadow-[0_0_35px_rgba(0,184,255,0.45)]
               transition"
                aria-label="Subscribe"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-14 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          © 2026 NEXTOEX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
