import React, { useEffect, useRef } from "react";
import FadeUp from "../components/FadeUp";

import img1 from "../assets/techstack/1.png";
import img2 from "../assets/techstack/2.png";
import img3 from "../assets/techstack/3.png";
import img4 from "../assets/techstack/4.png";
import img5 from "../assets/techstack/5.png";
import img6 from "../assets/techstack/6.png";
import img7 from "../assets/techstack/7.png";
import img8 from "../assets/techstack/8.png";
import img9 from "../assets/techstack/9.png";
import img10 from "../assets/techstack/10.png";
import img11 from "../assets/techstack/11.png";
import img12 from "../assets/techstack/12.png";
import img13 from "../assets/techstack/13.png";
import img14 from "../assets/techstack/14.png";
import img15 from "../assets/techstack/15.png";

const logos = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
];

const Product = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const mouseRef = useRef({ x: 9999, y: 9999 });

  const runningRef = useRef(false);

  const positions = [
    { top: "10%", left: "6%" },
    { top: "12%", left: "18%" },
    { top: "6%", left: "35%" },
    { top: "8%", left: "52%" },
    { top: "6%", left: "70%" },
    { top: "14%", left: "86%" },

    { top: "38%", left: "10%" },
    { top: "32%", left: "28%" },
    { top: "34%", left: "48%" },
    { top: "36%", left: "70%" },
    { top: "40%", left: "88%" },

    { top: "72%", left: "8%" },
    { top: "68%", left: "30%" },
    { top: "72%", left: "62%" },
    { top: "74%", left: "86%" },
  ];

  // Particle Network Background Animation 
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const canvas = canvasRef.current;

    if (!sectionEl || !canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const particleCount = 60;
    const connectionDistance = 150;
    const mouseInfluenceRadius = 200;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update(mouse) {
        this.x += this.vx;
        this.y += this.vy;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseInfluenceRadius) {
          const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
          this.x += (dx / dist) * force * 0.5;
          this.y += (dy / dist) * force * 0.5;
        }

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 184, 255, 0.28)";
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 184, 255, ${opacity * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const renderFrame = () => {
      if (!runningRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(5, 11, 35, 0.98)");
      gradient.addColorStop(1, "rgba(10, 14, 58, 0.96)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // subtle grid
      ctx.strokeStyle = "rgba(0, 184, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 80;

      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.update(mouseRef.current);
        p.draw();
      });
      drawLines();

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    const start = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      resize();
      init();
      renderFrame();
    };

    const stop = () => {
      runningRef.current = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };

    // run only when visible
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.12 }
    );

    sectionObserver.observe(sectionEl);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleResize = () => resize();

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      stop();
      sectionObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#050b23] flex flex-col items-center px-4 py-16 sm:px-6 relative overflow-hidden"
    >
      {/* Particle Network Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00B8FF]/10 blur-[120px] rounded-full animate-drift-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00FFD5]/5 blur-[150px] rounded-full animate-drift-reverse pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
        {/* Heading */}
        <FadeUp delay={80} className="mx-auto text-center max-w-2xl md:max-w-4xl mb-14">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#00B8FF]">
            TECH STACK
          </p>

          <h2 className="mb-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-white md:whitespace-nowrap">
            Technologies That Power Your Growth
          </h2>

          <p className="text-gray-300">
            Harnessing the power of the latest technologies, we build scalable,
            high-performance solutions that deliver exceptional results.
          </p>
        </FadeUp>

        {/* Floating Logo Area */}
        <FadeUp delay={220}>
          <div className="relative w-full max-w-6xl mx-auto h-[420px] sm:h-[480px] lg:h-[520px]">
            {logos.map((img, idx) => {
              const pos = positions[idx % positions.length];

              return (
                <img
                  key={idx}
                  src={img}
                  alt={`Tech logo ${idx}`}
                  loading="lazy"
                  className={`absolute object-contain w-12 sm:w-14 md:w-16 lg:w-20
                  opacity-90 hover:opacity-100 transition-all duration-300
                  drop-shadow-[0_0_25px_rgba(0,184,255,0.25)]
                  animate-float-${(idx % 3) + 1}`}
                  style={{
                    top: pos.top,
                    left: pos.left,
                  }}
                />
              );
            })}
          </div>
        </FadeUp>
      </div>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes drift-slow {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10%, 10%) scale(1.1); }
          66% { transform: translate(-5%, 15%) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes drift-reverse {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-15%, -10%) scale(0.95); }
          66% { transform: translate(10%, -20%) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }

        .animate-drift-slow {
          animation: drift-slow 20s ease-in-out infinite;
        }

        .animate-drift-reverse {
          animation: drift-reverse 25s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-16px) translateX(6px); }
        }

        @keyframes float3 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }

        .animate-float-1 { animation: float1 5s ease-in-out infinite; }
        .animate-float-2 { animation: float2 6s ease-in-out infinite; }
        .animate-float-3 { animation: float3 7s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Product;
