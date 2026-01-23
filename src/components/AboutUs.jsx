import React, { useEffect, useRef, useState } from "react";
import aboutimg1 from "../assets/aboutimg1.png";
import aboutimg2 from "../assets/aboutimg2.png";
import aboutimg3 from "../assets/aboutimg3.png";
import happyClients from "../assets/icons/happy-clients.png";
import projects from "../assets/icons/projects.png";
import hoursSupport from "../assets/icons/hours-support.png";
import hardWorkers from "../assets/icons/hard-workers.png";

const stats = [
  { icon: happyClients, value: 20, label: "Happy Clients" },
  { icon: projects, value: 20, label: "Projects" },
  { icon: hoursSupport, value: 100, label: "Hours Of Support" },
  { icon: hardWorkers, value: 50, label: "Hard Workers" },
];

/*  CountUp (runs once when visible, stops at final value) */
function Counter({ end, duration = 900 }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const elRef = useRef(null);

  useEffect(() => {
    const startCount = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      let current = 0;
      const stepTime = 20;
      const steps = Math.ceil(duration / stepTime);
      const increment = end / steps;

      const timer = setInterval(() => {
        current += increment;

        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) startCount();
      },
      { threshold: 0.35 }
    );

    if (elRef.current) observer.observe(elRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={elRef}>{count}</span>;
}

// FadeUp component for scroll animations
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

export default function AboutUs() {
  return (
    <section id="about" className="w-full bg-[#050b23] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-14 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* LEFT SIDE IMAGES */}
          <FadeUp
            delay={100}
            className="relative w-full max-w-[520px] mx-auto lg:mx-0"
          >
            {/* small image left */}
           <div className="absolute left-0 
                top-44 
                sm:-left-2 sm:top-56 
                md:top-48 
                lg:-left-2 lg:top-48
                w-[150px] sm:w-[170px] md:w-[190px] lg:w-[190px]
                h-[200px] sm:h-[240px] md:h-[280px] lg:h-[280px]
                overflow-hidden border border-white/10 shadow-lg"
            >
              <img
                src={aboutimg2}
                alt="about img 1"
                className="w-full h-full object-cover"
              />
            </div>

            {/* big image top right */}
            <div
              className="ml-auto
              w-[220px] sm:w-[260px] md:w-[300px] lg:w-[300px]
              h-[260px] sm:h-[310px] md:h-[350px] lg:h-[350px]
              overflow-hidden border border-white/10 shadow-xl
              -translate-x-2 sm:-translate-x-3 md:-translate-x-5 lg:-translate-x-5"
            >
              <img
                src={aboutimg1}
                alt="about img 2"
                className="w-full h-full object-cover"
              />
            </div>

            {/* small image bottom right */}
            <div
              className="ml-auto
              mr-12 sm:mr-12 md:mr-20 lg:mr-20
              mt-3 sm:mt-4
              w-[180px] sm:w-[210px] md:w-[240px] lg:w-[240px]
              h-[140px] sm:h-[170px] md:h-[200px] lg:h-[200px]
              overflow-hidden border border-white/10 shadow-lg "
            >
              <img
                src={aboutimg3}
                alt="about img 3"
                className="w-full h-full object-cover"
              />
            </div>
            {/* spacing for absolute image */}
            <div className="h-[60px]" />
          </FadeUp>


          {/* RIGHT SIDE CONTENT */}
          <div className="space-y-6">
            <FadeUp delay={200}>
              <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#00B8FF]">
                WHO WE ARE
              </p>
            </FadeUp>

            <FadeUp delay={300}>
              <h2 className="mb-3 text-3xl sm:text-4xl lg:text-4xl md:text-5xl font-semibold text-white md:whitespace-nowrap">
                Web Development & <br />
                UX/UI Design Services
              </h2>
            </FadeUp>

            <FadeUp delay={400}>
              <div className="space-y-6 text-[16px] md:text-[17px] leading-8 text-gray-200">
                <p>
                  At{" "}
                  <span className="font-semibold text-white">
                    Nextoex Pvt Ltd
                  </span>
                  , we are passionate about leveraging technology to help
                  businesses thrive. As experts in IT solutions, web software
                  development, UX/UI design, and social media marketing, we focus
                  on building custom applications and services that are both
                  functional and user-friendly.
                </p>

                <p>
                  Our talented team creates seamless user experiences through
                  thoughtful design, ensuring that each project aligns with your
                  business goals and user needs. Whether you need a dynamic
                  website, web app, innovative software, or a powerful social
                  media marketing strategy, we are committed to delivering
                  solutions that drive growth and efficiency.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* STATS TEXT + CARDS */}
        <div className="mt-16 lg:mt-20">
          {/* Center Title */}
          <FadeUp delay={100} className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Explore how we brought value to our clients
            </h3>

            <p className="mt-3 text-gray-200 text-base md:text-lg">
              We reached here with our hard work and dedication.
            </p>
          </FadeUp>

          {/* Cards */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto px-6 lg:px-10">
            {stats.map((item, idx) => (
              <FadeUp
                key={idx}
                delay={200 + idx * 100}
                className="max-w-[240px] w-full mx-auto"
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
                  className="group relative rounded-3xl p-[1.5px]
                  bg-gradient-to-r from-transparent via-white/15 to-transparent
                  hover:from-[#00B8FF] hover:via-[#007BFF] hover:to-[#00FFD5]
                  transition-all duration-700"
                >
                  <div
                    className="relative rounded-3xl bg-[#070a22] px-4 py-5 md:px-5 md:py-6 border border-white/10
                    flex flex-col items-center gap-2 overflow-hidden text-center
                    transition-all duration-500
                    group-hover:-translate-y-2
                    group-hover:shadow-[0_0_45px_rgba(0,184,255,0.25)]"
                    style={{
                      backgroundImage:
                        "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(0,184,255,0.18), transparent 45%)",
                    }}
                  >
                    {/* Icon */}
                    <div className="relative z-10 transition-transform duration-700 group-hover:scale-110">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-11 h-11 md:w-14 md:h-14 object-contain
                        drop-shadow-[0_0_25px_rgba(0,184,255,0.35)]"
                      />
                    </div>

                    {/* Number */}
                    <div className="relative z-10 text-2xl md:text-3xl font-extrabold
                    text-transparent bg-clip-text
                    bg-gradient-to-r from-[#00B8FF] to-[#00FFD5]">
                      +<Counter end={item.value} />
                    </div>

                    {/* Label */}
                    <p className="relative z-10 text-slate-300 tracking-wide text-sm font-medium">
                      {item.label}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
