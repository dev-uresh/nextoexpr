import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // Track active section

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "home", type: "scroll" },
    { link: "Service", path: "service", type: "scroll" },
    { link: "About", path: "about", type: "scroll" },
    { link: "Testimonial", path: "testimonial", type: "scroll" },
    { link: "Projects", path: "/projects", type: "router" }, // Changed to router link
    { link: "Contact Us", path: "contact", type: "scroll" },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 duration-300 ${
        isSticky ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="px-4 py-4 lg:px-14">
        <div className="flex items-center justify-between">
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-100}
            className="flex items-center space-x-2 text-2xl font-semibold cursor-pointer"
          >
            <img src={logo} alt="logo" className="w-10" />
            <span className="text-naturalPrimary">NEXTOEX</span>
          </Link>
          {/* Desktop Nav Items */}
          <ul className="space-x-12 lg:flex" hidden>
            {navItems.map(({ link, path, type }) => (
              <li
                key={path}
                className={`hover:text-naturalPrimary ${
                  activeSection === path ? "text-naturalPrimary font-bold" : ""
                }`}
              >
                {type === "scroll" ? (
                  <Link
                    to={path}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    onSetActive={() => setActiveSection(path)}
                  >
                    {link}
                  </Link>
                ) : (
                  <RouterLink to={path}>{link}</RouterLink>
                )}
              </li>
            ))}

            {/* GET STARTED Button */}
            <RouterLink to="/contact">
              <button className="px-4 py-2 text-white rounded bg-naturalPrimary hover:bg-naturalDGrey">
                GET STARTED
              </button>
            </RouterLink>
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-neutralDGrey focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Nav Items */}
      <ul
        className={`lg:hidden transition-all duration-300 bg-brandPrimary absolute w-full left-0 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        {navItems.map(({ link, path, type }) => (
          <li
            key={path}
            className={`py-2 text-center hover:bg-gray-100 ${
              activeSection === path ? "bg-naturalPrimary text-white" : ""
            }`}
          >
            {type === "scroll" ? (
              <Link
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
                onSetActive={() => setActiveSection(path)}
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </Link>
            ) : (
              <RouterLink to={path} onClick={() => setIsMenuOpen(false)}>
                {link}
              </RouterLink>
            )}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Navbar;
