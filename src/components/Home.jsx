import React, { useRef, useEffect, useState } from "react";

function Home() {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  const [visible, setVisible] = useState({
    l1: false,
    l2: false,
    l3: false,
    subtitle: false,
    btn1: false,
    btn2: false,
  });

  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;

    if (video) {
      video.playbackRate = 0.8;

      const handleTimeUpdate = () => {
        if (video.duration - video.currentTime < 0.7) {
          overlay.style.opacity = "1";
        }
      };

      const handleEnded = () => {
        overlay.style.opacity = "0";
        video.currentTime = 0;
        video.play();
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("ended", handleEnded);

      // cleanup
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  useEffect(() => {
    const timings = [
      ["l1", 0],
      ["l2", 120],
      ["l3", 260],
      ["subtitle", 420],
      ["btn1", 580],
      ["btn2", 700],
    ];

    const timers = timings.map(([key, delay]) =>
      setTimeout(() => {
        setVisible((v) => ({ ...v, [key]: true }));
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // reusable animation classes
  const anim = (show) =>
    `transition-all duration-700 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  return (
    <div className="relative h-screen overflow-hidden isolate">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="metadata"
        poster="/hero-poster.png"
        className="absolute inset-0 w-full h-full object-cover -z-30"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#050b23]/55 -z-20" />

      {/* Smooth loop fade */}
      <div
        ref={overlayRef}
        className="absolute inset-0 transition-opacity duration-700 bg-[#050b23] opacity-0 -z-10"
      />

      {/* CONTENT */}
      <div className="relative h-full max-w-7xl px-6 mx-auto flex items-center">
        <div className="max-w-3xl text-left text-white space-y-6">

          {/* TITLE */}
          <h1 className="font-extrabold tracking-tight leading-[1.1]">
            <span
              className={`block text-white text-[48px] sm:text-[64px] lg:text-[90px] ${anim(
                visible.l1
              )}`}
            >
              Empowering
            </span>

            <span
              className={`block text-white text-[48px] sm:text-[64px] lg:text-[90px] ${anim(
                visible.l2
              )}`}
            >
              AI-Driven
            </span>

            <span
              className={`block pb-2 text-[42px] sm:text-[56px] lg:text-[78px]
                bg-gradient-to-r from-[#00E5FF] via-[#00B4FF] to-[#007BFF]
                bg-clip-text text-transparent ${anim(visible.l3)}`}
            >
              Digital Growth
            </span>
          </h1>

          {/*  SUBTITLE */}
          <p
            className={`text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl ${anim(
              visible.subtitle
            )}`}
          >
            Transform your ideas into reality with
            <span className="text-cyan-300 font-medium"> AI-powered </span>
            software development, intelligent cloud services, and smart IT
            consulting.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex gap-x-6 pt-4">
            <button
              className={`rounded-full px-8 py-3 text-sm sm:text-base font-semibold
                text-white bg-gradient-to-r from-[#00C2FF] to-[#00F5D4]
                shadow-lg shadow-cyan-500/30 hover:scale-105
                transition-all duration-300 ${anim(visible.btn1)}`}
            >
              Get Started
            </button>

            <button
              className={`rounded-full px-8 py-3 text-sm sm:text-base font-semibold
                text-cyan-300 border border-cyan-400/40 backdrop-blur-sm
                hover:bg-cyan-400/10 hover:text-white
                transition-all duration-300 ${anim(visible.btn2)}`}
            >
              Learn More →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
