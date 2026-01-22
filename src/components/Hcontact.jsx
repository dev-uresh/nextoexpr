import React from "react";
import { Link } from "react-router-dom";

function Hcontact() {
  return (
    <section
      className="w-full bg-[#050b23] px-4 py-16 mx-auto lg:px-14 max-w-screen-2xl"
      id="contact"
    >
      <div className="text-center section-title">
        <h2 className="mb-3 text-4xl font-semibold text-[#00B8FF]">
          Contact us
        </h2>

        <p className="text-gray-300">
          Feel free to get in touch with us. We'd love to hear from you!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <Link
            to="/contact"
            className="w-48 py-3 text-white font-semibold rounded-xl
            bg-gradient-to-r from-[#00B8FF] via-[#007BFF] to-[#00FFD5]
            hover:opacity-90 transition"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hcontact;
