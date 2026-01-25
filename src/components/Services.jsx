import React from "react";
import FadeUp from "../components/FadeUp";
import AIdev from "../assets/icons/AIdevImg.png";
import Webdev from "../assets/icons/WebdevImg.png";
import Productdev from "../assets/icons/ProductdevImg.png";
import UIUX from "../assets/icons/UiImg.png";
import SMmarketing from "../assets/icons/SocialMediaMarketingImg.png";
import ContentCreation from "../assets/icons/ContentCreationImg.png";
import ProductDesign from "../assets/icons/ProductDesignImg.png";

const services = [
  {
    id: 1,
    title: "AI Development",
    description:
      "Build intelligent AI solutions with machine learning, NLP, and computer vision technologies.",
    image: AIdev,
  },
  {
    id: 2,
    title: "Web Development",
    description:
      "Create responsive, high-performance websites and web applications using modern frameworks.",
    image: Webdev,
  },
  {
    id: 3,
    title: "Product Development",
    description:
      "End-to-end product development from ideation to launch, ensuring market-fit and scalability.",
    image: Productdev,
  },
  {
    id: 4,
    title: "UI/UX Design",
    description:
      "Design user-friendly and visually engaging interfaces with seamless experiences.",
    image: UIUX,
  },
  {
    id: 5,
    title: "Social Media Marketing",
    description:
      "Boost brand visibility with strategic social media campaigns and targeted engagement.",
    image: SMmarketing,
  },
  {
    id: 6,
    title: "Content Creation",
    description:
      "Craft compelling content that resonates with audiences and drives conversions.",
    image: ContentCreation,
  },
  {
    id: 7,
    title: "Product Design",
    description:
      "Design innovative products that solve real problems with beautiful functionality.",
    image: ProductDesign,
  },
];

export default function Services() {
  return (
    <section id="service" className="w-full bg-[#050b23] overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-14 py-16">
        {/* Heading */}
        <FadeUp delay={80} className="mx-auto text-center max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#00B8FF]">
            OUR SERVICES
          </p>

          <h2 className="mb-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
            What We Do Best
          </h2>

          <p className="text-gray-300">
            We deliver cutting-edge digital solutions designed to elevate
            businesses through innovation, performance, and experience.
          </p>
        </FadeUp>

        {/* Cards */}
        <div className="mt-14 flex flex-wrap justify-center gap-8">
          {services.map((service, index) => (
            <FadeUp
              key={service.id}
              delay={200 + index * 90}
              className="w-full sm:w-[280px] lg:w-[260px] xl:w-[270px]"
            >
              <div
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty(
                    "--x",
                    `${e.clientX - rect.left}px`
                  );
                  e.currentTarget.style.setProperty(
                    "--y",
                    `${e.clientY - rect.top}px`
                  );
                }}
                className="group relative h-[340px]
                px-7 py-10 text-center rounded-2xl 
                border border-white/10 bg-white/5 backdrop-blur-xl
                cursor-pointer overflow-hidden
                transition-all duration-300
                hover:-translate-y-2 hover:border-[#00B8FF]/40
                hover:shadow-[0_0_45px_rgba(0,184,255,0.18)]
                flex flex-col items-center justify-center"
              >
                {/* Spotlight glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                  style={{
                    background:
                      "radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), rgba(0,184,255,0.18), transparent 55%)",
                  }}
                />

                {/* Top accent line (hover only) */}
                <div
                  className="absolute top-0 left-8 right-8 h-[3px] z-30
                  bg-gradient-to-r from-transparent via-[#00B8FF] to-transparent
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  shadow-[0_0_20px_rgba(0,184,255,0.9)]"
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="relative mb-6 p-5 rounded-2xl mx-auto w-fit
                    bg-gradient-to-br from-[#0b1b3a] via-[#08142c] to-[#050b23]
                    border border-[#00B8FF]/20
                    shadow-[0_0_35px_rgba(0,184,255,0.18)]
                    transition-all duration-500
                    group-hover:scale-105"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="absolute -inset-1 rounded-2xl bg-[#00B8FF]/10 blur-2xl" />

                    <img
                      src={service.image}
                      alt={service.title}
                      className="relative w-16 h-16 object-contain
                      drop-shadow-[0_0_20px_rgba(0,184,255,0.25)]"
                      loading="lazy"
                    />
                  </div>

                  {/* Title */}
                  <h4
                    className="mb-3 text-xl font-semibold text-center whitespace-nowrap
                    bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent
                    drop-shadow-[0_0_18px_rgba(0,184,255,0.25)]"
                  >
                    {service.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-gray-300 leading-6">
                    {service.description}
                  </p>
                </div>

                {/* Ambient glow blob */}
                <div className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 bg-[#00B8FF]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
