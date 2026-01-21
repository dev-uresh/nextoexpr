import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navebar";
import Myfooter from "./Myfooter";
import ScrollToTop from "./ScrollToTop";

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Myfooter />
    </>
  );
}
