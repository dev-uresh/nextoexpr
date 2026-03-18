import React, { useRef, useEffect, useState } from "react";

function Home() {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  const [videoReady, setVideoReady] = useState(false);

  const [visible, setVisible] = useState({
    l1: false,
    l2: false,
    l3: false,
    subtitle: false,
    btn1: false,
    btn2: false,
  });

  // VIDEO LOGIC
  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;

    if (!video) return;

    video.playbackRate = 0.8;

    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime < 0.7) {
        overlay.style.opacity = "1";
      }
    };

    const handleEnded = () => {
      overlay.style.opacity = "1";

      setTimeout(() => {
        video.currentTime = 0;
        video.play();

        setTimeout(() => {
          overlay.style.opacity = "0";
        }, 200);
      }, 600);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // TEXT ANIMATION TIMING
  useEffect(() => {
    const timings = [
      ["l1", 0],
      ["l2", 180],
      ["l3", 360],
      ["subtitle", 600],
      ["btn1", 850],
      ["btn2", 1000],
    ];

    const timers = timings.map(([key, delay]) =>
      setTimeout(() => {
        setVisible((v) => ({ ...v, [key]: true }));
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const anim = (show) =>
    `transition-all duration-1000 ease-out transform
    ${
      show
        ? "opacity-100 translate-y-0 blur-0"
        : "opacity-0 translate-y-10 blur-sm"
    }`;

  // button special animation
  const btnAnim = (show) =>
    `transition-all duration-700 ease-out transform
    ${
      show
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-8 scale-95"
    }`;

  return (
    <div className="relative h-screen overflow-hidden isolate">

      {/* POSTER IMAGE */}
      <img
        src="/hero-poster.png"
        alt="hero poster"
        className={`absolute inset-0 w-full h-full object-cover -z-40
          transition-opacity duration-1200
          ${videoReady ? "opacity-0" : "opacity-100"}`}
      />

      {/* VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onCanPlay={() => {
          setTimeout(() => setVideoReady(true), 150);
        }}
        className={`absolute inset-0 w-full h-full object-cover -z-30
          transition-all duration-1200 ease-out
          ${
            videoReady
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#050b23]/85 -z-20" />

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
            <span className={`block text-[48px] sm:text-[64px] lg:text-[90px] ${anim(visible.l1)}`}>
              Empowering
            </span>

            <span className={`block text-[48px] sm:text-[64px] lg:text-[90px] ${anim(visible.l2)}`}>
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

          {/* SUBTITLE */}
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

          {/* BUTTONS */}
          <div className="flex gap-x-6 pt-4">
            <button
              className={`rounded-full px-8 py-3 font-semibold
                bg-gradient-to-r from-[#00C2FF] to-[#00F5D4]
                shadow-lg shadow-cyan-500/30 hover:scale-105
                transition-all duration-300 ${btnAnim(visible.btn1)}`}
            >
              Get Started
            </button>

            <button
              className={`rounded-full px-8 py-3 font-semibold
                text-cyan-300 border border-cyan-400/40 backdrop-blur-sm
                hover:bg-cyan-400/10 hover:text-white
                transition-all duration-300 ${btnAnim(visible.btn2)}`}
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
