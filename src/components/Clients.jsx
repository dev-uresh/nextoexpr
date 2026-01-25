import React, { useEffect, useMemo, useRef } from "react";
import FadeUp from "../components/FadeUp";

import logo1 from "../assets/clients/logo1.png";
import logo2 from "../assets/clients/logo2.png";
import logo3 from "../assets/clients/logo3.png";
import Ella from "../assets/clients/Ella.png";

function Clients() {
  const row1 = useMemo(
    () => [
      { id: 1, img: logo1, name: "Client 1" },
      { id: 2, img: Ella, name: "Client 2" },
      { id: 3, img: logo3, name: "Client 3" },
      { id: 4, img: logo1, name: "Client 4" },
      { id: 5, img: logo2, name: "Client 5" },
      { id: 6, img: logo3, name: "Client 6" },
    ],
    []
  );

  const row2 = useMemo(
    () => [
      { id: 7, img: logo2, name: "Client 7" },
      { id: 8, img: logo1, name: "Client 8" },
      { id: 9, img: logo3, name: "Client 9" },
      { id: 10, img: logo2, name: "Client 10" },
      { id: 11, img: logo1, name: "Client 11" },
    ],
    []
  );

  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const mouseRef = useRef({ x: 9999, y: 9999 });
  const runningRef = useRef(false);

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

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(1, 0, 47, 0.98)");
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
    <section ref={sectionRef} className="w-full bg-[#01002F] overflow-hidden relative">
      {/* Particle Network Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00B8FF]/10 blur-[120px] rounded-full animate-drift-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00FFD5]/5 blur-[150px] rounded-full animate-drift-reverse pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-14 py-20 lg:py-24 relative z-10">
        {/* Heading */}
        <FadeUp delay={100} className="mx-auto text-center max-w-2xl md:max-w-4xl mb-16">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#00B8FF]">
            TRUSTED PARTNERS
          </p>

          <h2 className="mb-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-white md:whitespace-nowrap">
            Trusted by Leading Brands
          </h2>

          <p className="text-gray-300">
            We've proudly partnered with 100+ innovative companies worldwide,
            delivering exceptional results through cutting-edge solutions.
          </p>
        </FadeUp>

        <div className="space-y-10 lg:space-y-12">
          {/* Row 1 */}
          <FadeUp delay={250}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
              {row1.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Clean Premium Card */}
                  <div
                    className="relative rounded-3xl p-[1.5px]
                    bg-white/5 backdrop-blur-sm border border-white/10
                    transition-all duration-500 group-hover:scale-105
                    hover:shadow-[0_0_35px_rgba(0,184,255,0.15)]"
                  >
                    <div className="rounded-3xl bg-white h-[140px] flex items-center justify-center p-6">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="max-w-[160px] max-h-[80px] object-contain
                        opacity-90 group-hover:opacity-100
                        transition-all duration-500
                        group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/*Row 2 */}
          <FadeUp delay={350}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 lg:px-16">
              {row2.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Clean Premium Card */}
                  <div
                    className="relative rounded-3xl p-[1.5px]
                    bg-white/5 backdrop-blur-sm border border-white/10
                    transition-all duration-500 group-hover:scale-105
                    hover:shadow-[0_0_35px_rgba(0,255,213,0.12)]"
                  >
                    <div className="rounded-3xl bg-white h-[140px] flex items-center justify-center p-6">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="max-w-[160px] max-h-[80px] object-contain
                        opacity-90 group-hover:opacity-100
                        transition-all duration-500
                        group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Custom CSS */}
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
      `}</style>
    </section>
  );
}

export default Clients;
