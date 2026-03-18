import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const scrollToContact = () => {
    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return;
    }

    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navItems = [
    { link: "Home", path: "home" },
    { link: "About", path: "about" },
    { link: "Service", path: "service" },
    { link: "Testimonial", path: "testimonial" },
    { link: "Portfolio", path: "portfolio" },
    { link: "Contact Us", path: "contact" },
  ];

  const desktopLinkClass =
    "relative flex items-center justify-center cursor-pointer text-[17px] font-semibold tracking-wide text-gray-300 hover:text-white transition duration-300";

  // FIXED mobile class (centered)
  const mobileLinkClass =
    "w-full flex items-center justify-center text-center px-4 py-3 rounded-xl text-[16px] font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition";

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 duration-300
      ${isHomePage
          ? isSticky
            ? "bg-[#050b23]/80 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.35)] border-b border-white/10"
            : "bg-transparent"
          : isSticky
            ? "bg-[#050b23]/90 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.35)] border-b border-white/10"
            : "bg-[#050b23]"
        }`}
    >
      <nav className="px-4 py-4 lg:px-14">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <RouterLink
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={logo}
              alt="logo"
              className="h-10 w-10 rounded-md object-cover"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00B8FF] to-[#00FFD5] bg-clip-text text-transparent">
              NEXTOEX
            </span>
          </RouterLink>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center justify-center gap-12">
            {navItems.map(({ link, path }) => (
              <li key={path}>
                {path === "home" ? (
                  <RouterLink
                    to="/"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className={desktopLinkClass}
                  >
                    {link}
                  </RouterLink>
                ) : path === "portfolio" ? (
                  <RouterLink to="/portfolio" className={desktopLinkClass}>
                    {link}
                  </RouterLink>
                ) : path === "contact" ? (
                  <button
                    onClick={scrollToContact}
                    className={desktopLinkClass}
                  >
                    {link}
                  </button>
                ) : isHomePage ? (
                  <Link
                    to={path}
                    smooth
                    offset={-100}
                    className={desktopLinkClass}
                  >
                    {link}
                  </Link>
                ) : (
                  <RouterLink
                    to="/"
                    onClick={() =>
                      setTimeout(() => {
                        const el = document.getElementById(path);
                        if (el)
                          el.scrollIntoView({ behavior: "smooth" });
                      }, 200)
                    }
                    className={desktopLinkClass}
                  >
                    {link}
                  </RouterLink>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-gray-200 p-2"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden bg-[#050b23]
        ${isMenuOpen ? "max-h-[520px]" : "max-h-0"}`}
      >
        <ul className="px-4 py-6 space-y-3 flex flex-col items-center">
          {navItems.map(({ link, path }) => (
            <li key={path} className="w-full">
              {path === "home" ? (
                <RouterLink
                  to="/"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={mobileLinkClass}
                >
                  {link}
                </RouterLink>
              ) : path === "portfolio" ? (
                <RouterLink
                  to="/portfolio"
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileLinkClass}
                >
                  {link}
                </RouterLink>
              ) : path === "contact" ? (
                <button
                  onClick={scrollToContact}
                  className={mobileLinkClass}
                >
                  {link}
                </button>
              ) : isHomePage ? (
                <Link
                  to={path}
                  smooth
                  offset={-100}
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileLinkClass}
                >
                  {link}
                </Link>
              ) : (
                <RouterLink
                  to="/"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById(path);
                      if (el)
                        el.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }}
                  className={mobileLinkClass}
                >
                  {link}
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
