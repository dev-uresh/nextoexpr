import React, { useEffect, useRef, useState } from "react";

import AIdev from "../assets/icons/AIdevImg.png";
import Webdev from "../assets/icons/WebdevImg.png";
import Productdev from "../assets/icons/ProductdevImg.png";
import UIUX from "../assets/icons/UiImg.png";
import SMmarketing from "../assets/icons/SocialMediaMarketingImg.png";
import ContentCreation from "../assets/icons/ContentCreationImg.png";
import ProductDesign from "../assets/icons/ProductDesignImg.png";

function FadeUp({ children, delay = 0, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Services() {
  const services = [
    {
      id: 1,
      title: "AI Development",
      description:
        "Build intelligent AI solutions with machine learning, natural language processing, and computer vision technologies.",
      image: AIdev,
    },
    {
      id: 2,
      title: "Web Development",
      description:
        "Create responsive, high-performance websites and web applications using modern frameworks and technologies.",
      image: Webdev,
    },
    {
      id: 3,
      title: "Product Development",
      description:
        "End-to-end product development from ideation to launch, ensuring market-fit and user satisfaction.",
      image: Productdev,
    },
    {
      id: 4,
      title: "UI/UX Design",
      description:
        "We design user-friendly and attractive interfaces that are easy to use and provide a smooth experience.",
      image: UIUX,
    },
    {
      id: 5,
      title: "Social Media Marketing",
      description:
        "Boost your brand presence with strategic social media campaigns and targeted audience engagement.",
      image: SMmarketing,
    },
    {
      id: 6,
      title: "Content Creation",
      description:
        "Create compelling content that resonates with your audience and drives engagement across platforms.",
      image: ContentCreation,
    },
    {
      id: 7,
      title: "Product Design",
      description:
        "Design innovative products that solve real problems with beautiful, functional, and user-friendly interfaces.",
      image: ProductDesign,
    },
  ];

  return (
    <section id="service" className="w-full bg-[#050b23] overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-14 py-16">
        {/* Heading */}
        <FadeUp delay={100} className="mx-auto text-center max-w-2xl md:max-w-4xl">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#00B8FF]">
            OUR SERVICES
          </p>
          <h2 className="mb-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-white md:whitespace-nowrap">
            Check our Services
          </h2>
          <p className="text-gray-300">
            We offer a diverse range of IT products and services to elevate your
            business
          </p>
        </FadeUp>

        {/* Cards */}
        <div className="mt-14 flex flex-wrap justify-center gap-8">
          {services.map((service, index) => (
            <FadeUp
              key={service.id}
              delay={200 + index * 100}
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
                shadow-sm cursor-pointer overflow-hidden
                transition-all duration-300 flex flex-col items-center justify-center
                hover:-translate-y-2 hover:border-[#00B8FF]/40
                hover:shadow-[0_0_45px_rgba(0,184,255,0.18)]"
              >
                {/* Spotlight glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                  style={{
                    background:
                      "radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), rgba(0,184,255,0.18), transparent 55%)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-24 h-24 mx-auto mb-5 object-contain drop-shadow-[0_0_20px_rgba(0,184,255,0.25)]"
                  />
                  <h4 className="mb-3 text-xl font-semibold text-white">
                    {service.title}
                  </h4>
                  <p className="text-sm text-gray-300 leading-6">
                    {service.description}
                  </p>
                </div>

                {/* Glow blob */}
                <div className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 bg-[#00B8FF]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
