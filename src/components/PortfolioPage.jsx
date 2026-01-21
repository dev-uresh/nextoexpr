import React from "react";
import { Link } from "react-router-dom";

export default function PortfolioPage() {

  return (
    <section className="min-h-screen bg-[#050b23] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-14 pt-28 pb-16">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-5">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#00B8FF]">
              OUR WORK
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-[#00B8FF] via-[#007BFF] to-[#00FFD5] bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>

            <p className="text-gray-300 leading-7 max-w-xl">
              Explore our latest projects and case studies. At{" "}
              <span className="text-white font-semibold">NEXTOEX</span>, we build
              modern web applications, AI-driven solutions, and premium user
              experiences that help businesses grow.
            </p>
            </div>
        </div>
        </div>
    </section>
  );
}
