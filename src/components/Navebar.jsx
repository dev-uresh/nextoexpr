import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const location = useLocation();
  const isHomePage = location.pathname === "/";


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When route changes, close mobile menu
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { link: "Home", path: "home" },
    { link: "About", path: "about" },
    { link: "Service", path: "service" },
    { link: "Testimonial", path: "testimonial" },
    { link: "Portfolio", path: "portfolio" }, 
    { link: "Contact Us", path: "contact" },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 duration-300 ${isSticky
          ? "bg-[#050b23]/90 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.35)] border-b border-white/10"
          : "bg-[#050b23]"
        }`}
    >
      <nav className="px-4 py-4 lg:px-14">
        <div className="flex items-center justify-between">
          {/* Logo + Company Name */}
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-100}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src={logo}
              alt="logo"
              className="h-10 w-10 rounded-md object-cover shadow-[0_0_20px_rgba(0,184,255,0.25)] group-hover:shadow-[0_0_30px_rgba(0,184,255,0.45)] transition"
            />
            <span className="text-2xl font-bold tracking-wide bg-gradient-to-r from-[#00B8FF] via-[#007BFF] to-[#00FFD5] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,184,255,0.25)]">
              NEXTOEX
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <ul className="hidden lg:flex items-center gap-10">
            {navItems.map(({ link, path }) => (
              <li key={path} className="relative">
                {/*  Portfolio = route */}
                {path === "portfolio" ? (
                  <RouterLink
                    to="/portfolio"
                    className="relative cursor-pointer text-sm font-medium tracking-wide transition duration-300 group text-gray-300 hover:text-white">
                    <span>{link}</span>
                    <span className="absolute left-0 -bottom-2 h-[2px] w-full rounded-full bg-gradient-to-r from-[#00B8FF] via-[#007BFF] to-[#00FFD5]
                     transition-all duration-300 origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100" />
                  </RouterLink>
                ) : isHomePage ? (
                  /* Home page = scroll */
                  <Link
                    to={path}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    onSetActive={() => setActiveSection(path)}
                    className="relative cursor-pointer text-sm font-medium tracking-wide transition duration-300 group text-gray-300 hover:text-white"
                  >
                    <span>{link}</span>
                    <span className="absolute left-0 -bottom-2 h-[2px] w-full rounded-full bg-gradient-to-r from-[#00B8FF] via-[#007BFF] to-[#00FFD5]
                    transition-all duration-300 origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100" />
                  </Link>
                ) : (
                  /* Other pages = go home + section */
                  <RouterLink
                    to={`/#${path}`}
                    className="relative cursor-pointer text-sm font-medium tracking-wide transition duration-300 group text-gray-300 hover:text-white"
                  >
                    <span>{link}</span>
                    <span className="absolute left-0 -bottom-2 h-[2px] w-full rounded-full bg-gradient-to-r from-[#00B8FF] via-[#007BFF] to-[#00FFD5]
                     transition-all duration-300 origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100" />
                  </RouterLink>
                )}
              </li>
            ))}
          </ul>


          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-gray-200 focus:outline-none p-2 rounded-md hover:bg-white/10 transition"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#050b23] border-t border-white/10 ${isMenuOpen ? "max-h-[520px]" : "max-h-0"
          }`}
      >
        <ul className="px-4 py-4 space-y-2">
          {navItems.map(({ link, path }) => (
            <li key={path}>
              {path === "portfolio" ? (
                <RouterLink
                  to="/portfolio"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  <span className="font-medium">{link}</span>
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#00B8FF] via-[#007BFF] to-[#00FFD5] opacity-40" />
                </RouterLink>
              ) : isHomePage ? (
                <Link
                  to={path}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  <span className="font-medium">{link}</span>
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#00B8FF] via-[#007BFF] to-[#00FFD5] opacity-40" />
                </Link>
              ) : (
                <RouterLink
                  to={`/#${path}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  <span className="font-medium">{link}</span>
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#00B8FF] via-[#007BFF] to-[#00FFD5] opacity-40" />
                </RouterLink>
              )}
            </li>
          ))}

        </ul>
      </div>
    </header>
  );
};

export default Navbar;
