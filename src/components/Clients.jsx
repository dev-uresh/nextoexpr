import React from "react";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/company2.png";
import logo3 from "../assets/logo.jpg";

function Clients() {
  const logos = [
    { id: 1, img: logo1, name: "Client 1" },
    { id: 2, img: logo2, name: "Client 2" },
    { id: 3, img: logo3, name: "Client 3" },
  ];

  const marqueeLogos = [...logos, ...logos, ...logos];

  return (
    <section className="w-full bg-[#01002F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-14 py-14 lg:py-16">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#00B8FF]">
            OUR CLIENTS
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-white">
            Trusted by Brands & Businesses
          </h2>

          <p className="mt-3 text-gray-300">
            We’ve successfully delivered{" "}
            <span className="font-semibold text-white">100+</span> projects with
            dedication and quality.
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="mt-12 relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#01002F] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#01002F] to-transparent z-10" />

          {/* Track */}
          <div className="group w-full overflow-hidden">
            <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
              {marqueeLogos.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="rounded-3xl p-[1.5px]
                  bg-gradient-to-r from-transparent via-white/15 to-transparent
                  hover:from-[#00B8FF] hover:via-[#007BFF] hover:to-[#00FFD5]
                  transition-all duration-700"
                >
                  <div
                    className="rounded-3xl bg-[#070a22] border border-white/10
                    w-[220px] h-[110px]
                    flex items-center justify-center
                    hover:shadow-[0_0_45px_rgba(0,184,255,0.20)]
                    transition-all duration-500"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="max-w-[160px] max-h-[70px] object-contain opacity-90
                      hover:opacity-100 transition"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .animate-marquee {
            animation: marquee 18s linear infinite;
          }
        `}
      </style>
    </section>
  );
}

export default Clients;
